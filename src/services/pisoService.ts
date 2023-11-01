import { Service, Inject } from 'typedi';
import config from "../../config";
import IPisoDTO from '../dto/IPisoDTO';
import { Piso } from "../domain/piso";
import IPisoRepo from '../services/IRepos/IPisoRepo';
import IPisoService from './IServices/IPisoService';
import { Result } from "../core/logic/Result";
import { PisoMap } from "../mappers/PisoMap";
import IListPisosDTO from "../dto/IListPisosDTO"
import IEdificioRepo from './IRepos/IEdificioRepo';
import IListMinMaxDTO from '../dto/IListMinMaxDTO';
import IEdificioDTO from '../dto/IEdificioDTO';
import { EdificioMap } from '../mappers/EdificioMap';

@Service()
export default class PisoService implements IPisoService {
  constructor(
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo,
      @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo
  ) {}

  public async getPiso( pisoId: string): Promise<Result<IPisoDTO>> {
    try {
      const piso = await this.pisoRepo.findByDomainId(pisoId);

      if (piso === null) {
        return Result.fail<IPisoDTO>("Piso não encontrado");
      }
      else {
        const pisoDTOResult = PisoMap.toDTO( piso ) as IPisoDTO;
        return Result.ok<IPisoDTO>( pisoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
    try {

      const pisoDocument = await this.pisoRepo.findByDesignacao(pisoDTO.designacao);

      if(pisoDocument != null)
        return Result.fail<IPisoDTO>("Já existe um piso com a designação " + pisoDTO.designacao);

      const edificio = await this.edificioRepo.findByCodigo(pisoDTO.edificio);

      if(edificio == null)
        return Result.fail<IPisoDTO>("Não foi encontrado um edifício com o código " + pisoDTO.edificio);

      const pisoOrError = Piso.create({
        descricao: pisoDTO.descricao,
        designacao: pisoDTO.designacao,
        edificio: edificio
      });

      if (pisoOrError.isFailure) {
        return Result.fail<IPisoDTO>(pisoOrError.errorValue());
      }
      const pisoResult = pisoOrError.getValue();
      await this.pisoRepo.save(pisoResult);

      const pisoDTOResult = PisoMap.toDTO( pisoResult ) as IPisoDTO;
      return Result.ok<IPisoDTO>( pisoDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
    try {
      const piso = await this.pisoRepo.findByDesignacao(pisoDTO.designacao);

      if (piso === null) {
        return Result.fail<IPisoDTO>("Piso não encontrado");
      }else {

        const edificio = await this.edificioRepo.findByCodigo(pisoDTO.edificio);

        if(edificio == null)
          return Result.fail<IPisoDTO>("Não foi encontrado um edifício com o código " + pisoDTO.edificio);

        piso.descricao = pisoDTO.descricao;
        piso.designacao = pisoDTO.designacao;
        piso.edificio = edificio;
        await this.pisoRepo.save(piso);

        const pisoDTOResult = PisoMap.toDTO( piso ) as IPisoDTO;
        return Result.ok<IPisoDTO>( pisoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listPisos(listPisosDTO: IListPisosDTO): Promise<Result<IPisoDTO[]>> {
    try {
      
      const pisos = await this.pisoRepo.findByEdificio(listPisosDTO.codigoEdificio);

      if (pisos == null)
        return Result.fail<IPisoDTO[]>("O edifício com o código " + listPisosDTO.codigoEdificio + " não tem pisos.");

      // Query deve retornar todos os pisos que contenham este edificio.
    
      /*
      let pisosDTO: IPisoDTO[] = [];
      pisos.forEach(p => pisosDTO.push(PisoMap.toDTO(p)));
      */
     
     let pisosDTO = [];
     for (let i = 0; i < pisos.length; i++){
      pisosDTO[i] = PisoMap.toDTO(pisos[i]);
    }
  

      return Result.ok<IPisoDTO[]>( pisosDTO )
    } catch (e) {
      throw e;
    }
  }

  // Esta pode fazer a query direta ou utilizar a listPisos (acima) e filtrar em memória.
  public async listMinMax(minMax: IListMinMaxDTO): Promise<Result<IEdificioDTO[]>> {
    try {
      const edificios = await this.edificioRepo.findAll();
      if (!!edificios){
        return Result.fail<IEdificioDTO[]>("Não existem registos de edifícios");
      }
    
      let edificiosDTO : IEdificioDTO[];
      edificios.forEach(async (edificio) => {
        const pisos = await this.pisoRepo.findByEdificio(edificio.codigo);
        const numPisos = pisos.length;
        if (numPisos > minMax.min && numPisos < minMax.max) {
          edificiosDTO.push(EdificioMap.toDTO(edificio) as IEdificioDTO);
        }
      });
      return Result.ok<IEdificioDTO[]>( edificiosDTO )
    } catch (e) {
      throw e;
    }

  }

  public async listPisoPassagem(pisoDTO: IPisoDTO): Promise<Result<Array<IPisoDTO>>> {
    return null;
  }

}
