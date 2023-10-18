import { Service, Inject } from 'typedi';
import config from "../../config";
import ISalaDTO from '../dto/ISalaDTO';
import { Sala } from "../domain/sala";
import ISalaRepo from '../services/IRepos/ISalaRepo';
import ISalaService from './IServices/ISalaService';
import { Result } from "../core/logic/Result";
import { SalaMap } from "../mappers/SalaMap";

@Service()
export default class SalaService implements ISalaService {
  constructor(
      @Inject(config.repos.sala.name) private salaRepo : ISalaRepo
  ) {}

  public async getSala( salaId: string): Promise<Result<ISalaDTO>> {
    try {
      const sala = await this.salaRepo.findByDomainId(salaId);

      if (sala === null) {
        return Result.fail<ISalaDTO>("Sala not found");
      }
      else {
        const salaDTOResult = SalaMap.toDTO( sala ) as ISalaDTO;
        return Result.ok<ISalaDTO>( salaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {

      const salaOrError = await Sala.create( salaDTO );

      if (salaOrError.isFailure) {
        return Result.fail<ISalaDTO>(salaOrError.errorValue());
      }

      const salaResult = salaOrError.getValue();

      await this.salaRepo.save(salaResult);

      const roleDTOResult = SalaMap.toDTO( salaResult ) as ISalaDTO;
      return Result.ok<ISalaDTO>( roleDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {
      const sala = await this.salaRepo.findByDomainId(salaDTO.id);

      if (sala === null) {
        return Result.fail<ISalaDTO>("Sala not found");
      }
      else {
        sala.descricao = salaDTO.descricao;
        sala.categoria = salaDTO.categoria;
        sala.designacao = salaDTO.designacao;
        await this.salaRepo.save(sala);

        const salaDTOResult = SalaMap.toDTO( sala ) as ISalaDTO;
        return Result.ok<ISalaDTO>( salaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}