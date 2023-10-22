import { Service, Inject } from 'typedi';
import config from "../../config";
import IPassagemDTO from '../dto/IPassagemDTO';
import { Passagem } from "../domain/passagem";
import IPassagemRepo from '../services/IRepos/IPassagemRepo';
import IPassagemService from './IServices/IPassagemService';
import { Result } from "../core/logic/Result";
import { PassagemMap } from "../mappers/PassagemMap";
import IEdificioRepo from './IRepos/IEdificioRepo';
import { PassagemId } from '../domain/passagemId';


@Service()
export default class PassagemService implements IPassagemService {
  constructor(
      @Inject(config.repos.passagem.name) private passagemRepo : IPassagemRepo,
      @Inject(config.repos.edificio.name) private edificioRepo : IEdificioRepo
  ) {}

  public async getPassagem( passagemId: string): Promise<Result<IPassagemDTO>> {
    return null;
  }


  public async createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    return null;
  }

  public async updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    return null;
  }

  public async listPassagens(codigoEdificioA: string, codigoEdificioB: string): Promise<Result<IPassagemDTO[]>> {
    try {

        const edificioADoc = await this.edificioRepo.findByCodigo(codigoEdificioA);
        const edificioBDoc = await this.edificioRepo.findByCodigo(codigoEdificioB);
  
        if(!!edificioADoc || !!edificioBDoc)
          return Result.fail<IPassagemDTO[]>("Um dos códigos dos edifícios é inválido");
        
        const passagensResult = this.passagemRepo.listPassagensBetween(edificioADoc.id.toString(), edificioBDoc.id.toString());
  
        let passagensResultDTO : IPassagemDTO[];

        (await passagensResult).forEach(p => passagensResultDTO.push(PassagemMap.toDTO(p) as IPassagemDTO));

        return Result.ok<IPassagemDTO[]>( passagensResultDTO )
      } catch (e) {
        throw e;
      }
  }


}
