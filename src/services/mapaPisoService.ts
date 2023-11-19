import { Service, Inject } from 'typedi';
import config from "../../config";
import IMapaPisoRepo from './IRepos/IMapaPisoRepo';
import IPisoRepo from './IRepos/IPisoRepo';
import IMapaPisoService from './IServices/IMapaPisoService';
import { Result } from '../core/logic/Result';
import IMapaPisoDTO from '../dto/IMapaPisoDTO';
import { MapaPiso } from '../domain/mapaPiso';
import { MapaPisoMap } from '../mappers/MapaPisoMap';
import IDeleteMapaPisoDTO from '../dto/IDeleteMapaPisoDTO';
import IMazeDTO from '../dto/IMazeDTO';
import IMapaDTO from '../dto/IMapaDTO';
import ISolucaoCaminhoDTO from '../dto/ISolucaoCaminhoDTO';
import { CaminhoEntrePisosSolucao } from '../domain/caminhoEntrePisosSolucao';
import ICaminhoEntrePisosDTO from '../dto/ICaminhoEntrePisosDTO';
const http = require('http');

@Service()
export default class MapaPisoService implements IMapaPisoService {
  constructor(
    @Inject(config.repos.mapaPiso.name) private mapaPisoRepo: IMapaPisoRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) { }


  public async createMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {

      const mapaPiso = await this.mapaPisoRepo.findByPiso(mapaPisoDTO.piso);

      if (mapaPiso != null)
        return Result.fail<IMapaPisoDTO>("Já existe um piso com o mapa de piso " + mapaPisoDTO.id);

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      const mapaPisoOrError = MapaPiso.create({
        mapa: mapaPisoDTO.mapa,
        piso: piso
      });


      if (mapaPisoOrError.isFailure) {
        return Result.fail<IMapaPisoDTO>(mapaPisoOrError.errorValue());
      }
      const mapaPisoResult = mapaPisoOrError.getValue();
      await this.mapaPisoRepo.save(mapaPisoResult);

      const mapaPisoDTOResult = MapaPisoMap.toDTO(mapaPisoResult) as IMapaPisoDTO;
      return Result.ok<IMapaPisoDTO>(mapaPisoDTOResult)
    } catch (e) {
      throw e;
    }

  }

  public async loadMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {
      const mapaPiso = await this.mapaPisoRepo.findByDomainId(mapaPisoDTO.id);

      if (mapaPiso === null) {
        return Result.fail<IMapaPisoDTO>("Mapa de Piso não encontrado");
      }

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      if (piso == null) {
        return Result.fail<IMapaPisoDTO>("O mapa de piso" + mapaPisoDTO.id + "não tem nenhum piso associado.");

      } else {
        mapaPiso.mapa = mapaPisoDTO.mapa
        await this.mapaPisoRepo.save(mapaPiso);

        const mapaPisoDTOResult = MapaPisoMap.toDTO(mapaPiso) as IMapaPisoDTO;
        return Result.ok<IMapaPisoDTO>(mapaPisoDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async deleteMapaPiso(mapaPisoDTO: IDeleteMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {
      const mapaPiso = await this.mapaPisoRepo.findByPiso(mapaPisoDTO.piso);

      if (mapaPiso == null)
        return Result.fail<IMapaPisoDTO>("Não existe qualquer mapa piso com o piso " + mapaPisoDTO.piso);

      await this.mapaPisoRepo.delete(mapaPiso);

      return Result.ok<IMapaPisoDTO>(MapaPisoMap.toDTO(mapaPiso));
    } catch (err) {
      throw err;
    }
  }


  // Venâncio: Vou fazer uma listagem filtrada para o PROLOG, apenas com a info necessária.
  public async listMapasPiso(): Promise<Result<IMazeDTO[]>> {
    try {

      const mapasPiso = await this.mapaPisoRepo.findAll();

      if (mapasPiso == null) {
        return Result.fail<IMazeDTO[]>("Não existem registos de mapas de piso");
      }

      let mapaPisoDTO: IMazeDTO[] = [];

      for (const mapaPiso of mapasPiso) {

        let mapa: IMapaDTO = mapaPiso.mapa as unknown as IMapaDTO;

        const p = {
          piso: mapaPiso.piso.designacao,
          largura: mapa.maze.size.width,
          profundidade: mapa.maze.size.depth,
          mapa: mapa.maze.map,
          saidas: mapa.maze.exits,
          elevador: mapa.maze.elevators,
          saidaLocalizacao: mapa.maze.exitLocation
        } as IMazeDTO;

        mapaPisoDTO.push(p);
      }

      return Result.ok<IMazeDTO[]>(mapaPisoDTO)
    } catch (e) {
      throw e;
    }
  }

  public async caminhoEntrePisos(cep: ICaminhoEntrePisosDTO): Promise<Result<ISolucaoCaminhoDTO>> {

    let sol1: string[];
    let sol2: number[];

    const url = config.planningConnectionString + "/path_between_floors?origem=" + cep.origem + "&posOrigem=" +
    cep.posicaoOrigem + "&destino=" + cep.destino + "&posDestino=" +
    cep.posicaoDestino + "";

    /*const url = config.planningConnectionString + "/path_between_floors";

    // Prepare the JSON payload
    const payload = JSON.stringify({
      origem: cep.origem,
      posOrigem: cep.posicaoOrigem,
      destino: cep.destino,
      posDestino: cep.posicaoDestino
    });



    // Set the options for the HTTP request
    const options: http.RequestOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/path_between_floors',
      method: 'GET', // Use POST method for sending JSON payload
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };*/

    try {

      let solucao = new Promise((resolve) => {
        http.get(url, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            resolve(data);
            sol1 = JSON.parse(data).sol1;
            sol2 = JSON.parse(data).sol2;
          });
        }).on("error", (err) => {
          console.log("Error: " + err);
        }).end();
      });

      await solucao;

    } catch (err) {
      return Result.fail<ISolucaoCaminhoDTO>("Erro inesperado");
    }

    return CaminhoEntrePisosSolucao.create({
      caminhoEntrePisos: sol1,
      caminhoPorPiso: sol2
    } as ISolucaoCaminhoDTO);

  }
}
