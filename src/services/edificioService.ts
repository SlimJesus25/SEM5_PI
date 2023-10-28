import { Service, Inject } from 'typedi';
import config from "../../config";
import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from "../domain/edificio";
import { Piso } from "../domain/piso";
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IElevadorRepo from '../services/IRepos/IElevadorRepo';
import IPisoRepo from '../services/IRepos/IPisoRepo';
import IMapaEdificioRepo from '../services/IRepos/IMapaEdificioRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from "../core/logic/Result";
import { EdificioMap } from "../mappers/EdificioMap";
import { ElevadorMap } from "../mappers/ElevadorMap";
import { CodigoEdificio } from '../domain/codigoEdificio';
import { Elevador } from '../domain/elevador';
import { MapaEdificio } from '../domain/mapaEdificio';
import IListElevadoresDTO from '../dto/IListElevadoresDTO';
import IElevadorDTO from '../dto/IElevadorDTO';
import IPisoDTO from '../dto/IPisoDTO';
import IListPisosDTO from '../dto/IListPisosDTO';
import { PisoMap } from '../mappers/PisoMap';
import IListMinMaxDTO from '../dto/IListMinMaxDTO';

@Service()
export default class EdificioService implements IEdificioService {
  constructor(
      //@Inject(config.repos.role.name) private edificioRepo : IEdificioRepo, // joao :repos.edificio ?
      @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
      @Inject(config.repos.mapaEdificio.name) private mapaRepo: IMapaEdificioRepo // joao: alterado para mapaEdifico
  ) {}

  public async getEdificio( edificioId: string): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByDomainId(edificioId);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }
      else {
        const edificioDTOResult = EdificioMap.toDTO( edificio ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( edificioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {

      const edificioDocument = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

      let elevador: Elevador;

      const elevadorOrError = await this.elevadorRepo.findByNumeroIdentificativo(edificioDTO.elevador);
      if (elevadorOrError == null) {
        return Result.fail<IEdificioDTO>(elevadorOrError.numeroIdentificativo);
      }

      let pisoArr: Piso[] = [];

      edificioDTO.pisos.forEach(async p => pisoArr.push(await this.pisoRepo.findByDesignacao(p)));

      let mapa: MapaEdificio;

      // Venancio: Substituir isto por algo que o identifique para além do ID.
      this.mapaRepo.findByDomainId(edificioDTO.mapaEdificio);
      

      if(!!edificioDocument)
        return Result.fail<IEdificioDTO>("Edifício com o código " + edificioDTO.codigoEdificio + " já existe!");

      const edificioOrError = await Edificio.create({
        codigoEdificio: CodigoEdificio.create(edificioDTO.codigoEdificio).getValue(),
        descricaoEdificio: edificioDTO.descricao,
        dimensaoMaximaPiso: edificioDTO.dimensaoMaxima,
        nomeOpcionalEdificio: edificioDTO.nomeOpcional,
        elevadores: elevador,
        pisos: pisoArr,
        mapaEdificio: mapa
      });

      if (edificioOrError.isFailure) {
        return Result.fail<IEdificioDTO>(edificioOrError.errorValue());
      }

      const edificioResult = edificioOrError.getValue();

      await this.edificioRepo.save(edificioResult);

      const edificioDTOResult = EdificioMap.toDTO( edificioResult ) as IEdificioDTO;
      return Result.ok<IEdificioDTO>( edificioDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);
      const elevador = await this.elevadorRepo.findByNumeroIdentificativo(edificioDTO.elevador);
      const mapa = await this.mapaRepo.findByDomainId(edificioDTO.mapaEdificio); // Alterar esta pesquisa por algo que o identifique para além do ID.
      
      let pisos: Piso[];
      edificioDTO.pisos.forEach(async v => pisos.push(await this.pisoRepo.findByDomainId(v)))

      if (edificio === null) {
        return Result.fail<IEdificioDTO>("Edificio não encontrado");
      }
      else {
        edificio.codigo = edificioDTO.codigoEdificio;
        edificio.descricao = edificioDTO.descricao;
        edificio.dimensaoMaxima = edificioDTO.dimensaoMaxima;
        edificio.elevadores = elevador;
        edificio.pisos = pisos;
        edificio.mapa = mapa;
        await this.edificioRepo.save(edificio);

        const edificioDTOResult = EdificioMap.toDTO( edificio ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( edificioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listEdificios(): Promise<Result<IEdificioDTO[]>> {
    try {

        const edificios = await this.edificioRepo.findAll();

        if (!!edificios){
          return Result.fail<IEdificioDTO[]>("Não existem registos de edifícios");
        }
        
        let edificiosDTO : IEdificioDTO[];

        (await edificios).forEach(p => edificiosDTO.push(EdificioMap.toDTO(p) as IEdificioDTO));

        return Result.ok<IEdificioDTO[]>( edificiosDTO )
      } catch (e) {
        throw e;
      }
  }


}