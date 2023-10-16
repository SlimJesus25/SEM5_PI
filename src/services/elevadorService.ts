import { Service, Inject } from 'typedi';
import config from "../../config";
import IElevadorDTO from '../dto/IElevadorDTO';
import { Elevador } from "../domain/elevador";
import IElevadorRepo from '../services/IRepos/IElevadorRepo';
import IElevadorService from './IServices/IElevadorService';
import { Result } from "../core/logic/Result";
import { ElevadorMap } from "../mappers/ElevadorMap";

@Service()
export default class ElevadorService implements IElevadorService {
  constructor(
      @Inject(config.repos.elevador.designacao) private elevadorRepo : IElevadorRepo
  ) {}

  public async getElevador( elevadorId: string): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByDomainId(elevadorId);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador não encontrado");
      }
      else {
        const elevadorDTOResult = ElevadorMap.toDTO( elevador ) as IElevadorDTO;
        return Result.ok<IElevadorDTO>( elevadorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {

      const elevadorOrError = await Elevador.create( elevadorDTO );

      if (elevadorOrError.isFailure) {
        return Result.fail<IElevadorDTO>(elevadorOrError.errorValue());
      }

      const roleResult = elevadorOrError.getValue();

      await this.elevadorRepo.save(roleResult);

      const roleDTOResult = ElevadorMap.toDTO( roleResult ) as IElevadorDTO;
      return Result.ok<IElevadorDTO>( roleDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByDomainId(elevadorDTO.id);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador não encontrado");
      }
      else {
        elevador.designacao = elevadorDTO.designacao;
        await this.elevadorRepo.save(elevador);

        const elevadorDTOResult = ElevadorMap.toDTO( elevador ) as IElevadorDTO;
        return Result.ok<IElevadorDTO>( elevadorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
