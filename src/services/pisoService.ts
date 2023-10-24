import { Service, Inject } from 'typedi';
import config from "../../config";
import IPisoDTO from '../dto/IPisoDTO';
import { Piso } from "../domain/piso";
import IPisoRepo from '../services/IRepos/IPisoRepo';
import IPisoService from './IServices/IPisoService';
import { Result } from "../core/logic/Result";
import { PisoMap } from "../mappers/PisoMap";
import { Sala } from '../domain/sala';
import ISalaRepo from '../services/IRepos/ISalaRepo';

@Service()
export default class PisoService implements IPisoService {
  constructor(
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo,
      @Inject(config.repos.sala.name) private salaRepo: ISalaRepo
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

      if(!!pisoDocument)
        return Result.fail<IPisoDTO>("Já existe um piso com a designação " + pisoDTO.designacao);
      
        const salaOrError = await this.salaRepo.findByDesignacao(pisoDTO.designacao);

        let salas : Sala[];

        // Venancio: Adicionar forma de verificação de falha.
        pisoDTO.salas.forEach(async s => salas.push(await this.salaRepo.findByDesignacao(s)));

      const pisoOrError = await Piso.create({
        descricao: pisoDTO.descricao,
        designacao: pisoDTO.designacao,
        salas: salas
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

      let salas: Sala[];
      pisoDTO.salas.forEach(async v => salas.push(await this.salaRepo.findByDesignacao(v)))

      if (piso === null) {
        return Result.fail<IPisoDTO>("Piso não encontrado");
      }
      else {
        piso.descricao = pisoDTO.descricao;
        piso.designacao = pisoDTO.designacao;
        piso.sala = salas;
        await this.pisoRepo.save(piso);

        const pisoDTOResult = PisoMap.toDTO( piso ) as IPisoDTO;
        return Result.ok<IPisoDTO>( pisoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listPisoPassagem(pisoDTO: IPisoDTO): Promise<Result<Array<IPisoDTO>>> {
    return null;
  }

}
