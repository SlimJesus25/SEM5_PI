import { Service, Inject } from 'typedi';
import config from "../../config";
import IMapaPisoRepo from './IRepos/IMapaPisoRepo';
import IPisoRepo from './IRepos/IPisoRepo';
import IMapaPisoService from './IServices/IMapaPisoService';
import { Result } from '../core/logic/Result';
import IMapaPisoDTO from '../dto/IMapaPisoDTO';
import IPisoDTO from '../dto/IPisoDTO';
import { MapaPiso } from '../domain/mapaPiso';
import { MapaPisoMap } from '../mappers/MapaPisoMap';
import IDeleteMapaPisoDTO from '../dto/IDeleteMapaPisoDTO';

@Service()
export default class MapaPisoService implements IMapaPisoService {
  constructor(
      @Inject(config.repos.mapaPiso.name) private mapaPisoRepo : IMapaPisoRepo,
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo
  ) {}


 public async createMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {

      const mapaPiso = await this.mapaPisoRepo.findByPiso(mapaPisoDTO.piso);

      if (mapaPiso != null)
        return Result.fail<IMapaPisoDTO>("Já existe um piso com o mapa de piso " + mapaPisoDTO.id);

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      const mapaPisoOrError = MapaPiso.create({
        mapa: mapaPisoDTO.mapa,
        piso : piso
      });


      if (mapaPisoOrError.isFailure) {
        return Result.fail<IMapaPisoDTO>(mapaPisoOrError.errorValue());
      }
      const mapaPisoResult = mapaPisoOrError.getValue();
      await this.mapaPisoRepo.save(mapaPisoResult);

      const mapaPisoDTOResult = MapaPisoMap.toDTO( mapaPisoResult ) as IMapaPisoDTO;
      return Result.ok<IMapaPisoDTO>( mapaPisoDTOResult )
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

      if (piso == null){
        return Result.fail<IMapaPisoDTO>("O mapa de piso" + mapaPisoDTO.id + "não tem nenhum piso associado.");

      }else {
        mapaPiso.mapa = mapaPisoDTO.mapa
        await this.mapaPisoRepo.save(mapaPiso);

        const mapaPisoDTOResult = MapaPisoMap.toDTO( mapaPiso ) as IMapaPisoDTO;
        return Result.ok<IMapaPisoDTO>( mapaPisoDTOResult )
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
  public async listMapasPiso(): Promise<Result<IMapaPisoDTO[]>> {
    try {

        const mapasPiso = await this.mapaPisoRepo.findAll();

        if (mapasPiso == null){
          return Result.fail<IMapaPisoDTO[]>("Não existem registos de mapas de piso");
        }
        
        let mapaPisoDTO : IMapaPisoDTO[] = [];

        for(const mapaPiso of mapasPiso){
          const p = MapaPisoMap.toDTO(mapaPiso) as IMapaPisoDTO;
          mapaPisoDTO.push(p);
        }

        return Result.ok<IMapaPisoDTO[]>( mapaPisoDTO )
      } catch (e) {
        throw e;
      }
  }
}
