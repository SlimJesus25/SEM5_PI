import { Service, Inject } from 'typedi';
import config from "../../config";
import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from "../domain/edificio";
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from "../core/logic/Result";
import { EdificioMap } from "../mappers/EdificioMap";

@Service()
export default class EdificioService implements IEdificioService {
  constructor(
      @Inject(config.repos.role.name) private roleRepo : IEdificioRepo
  ) {}

  public async getEdificio( edificioId: string): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.roleRepo.findByDomainId(edificioId);

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

      const edificioOrError = await Edificio.create( edificioDTO );

      if (edificioOrError.isFailure) {
        return Result.fail<IEdificioDTO>(edificioOrError.errorValue());
      }

      const edificioResult = edificioOrError.getValue();

      await this.roleRepo.save(edificioResult);

      const edificioDTOResult = EdificioMap.toDTO( edificioResult ) as IEdificioDTO;
      return Result.ok<IEdificioDTO>( edificioDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateEdificio(roleDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleDTO.id);

      if (role === null) {
        return Result.fail<IEdificioDTO>("Role not found");
      }
      else {
        role.name = roleDTO.name;
        await this.roleRepo.save(role);

        const roleDTOResult = RoleMap.toDTO( role ) as IEdificioDTO;
        return Result.ok<IEdificioDTO>( roleDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listElevadores(edificioDTO: IEdificioDTO): Promise<Result<Array<IEdificioDTO>>> {
    return null;
  }

  public async listPassagens(edificioDTO: IEdificioDTO): Promise<Result<Array<IEdificioDTO>>> {
    return null;
  }


}
