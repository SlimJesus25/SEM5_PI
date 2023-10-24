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
      @Inject(config.repos.elevador.name) private elevadorRepo : IElevadorRepo
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

      const elevadorDocument = await this.elevadorRepo.findByNumeroIdentificativo(elevadorDTO.numeroIdentificativo);

      if(!!elevadorDocument)
        return Result.fail<IElevadorDTO>("Já existe um elevador com o código " + elevadorDTO.numeroIdentificativo);

      const elevadorOrError = Elevador.create({
        descricao: elevadorDTO.descricao,
        modelo: elevadorDTO.modelo,
        marca: elevadorDTO.marca,
        numeroIdentificativo: elevadorDTO.numeroIdentificativo,
        numeroSerie: elevadorDTO.numeroSerie,
        pisosServidos: elevadorDTO.pisosServidos
      })

      if (elevadorOrError.isFailure) {
        return Result.fail<IElevadorDTO>(elevadorOrError.errorValue());
      }

      const elevadorResult = elevadorOrError.getValue();
      await this.elevadorRepo.save(elevadorResult);

      const elevadorDTOResult = ElevadorMap.toDTO( elevadorResult ) as IElevadorDTO;
      return Result.ok<IElevadorDTO>( elevadorDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {
      const elevador = await this.elevadorRepo.findByNumeroIdentificativo(elevadorDTO.numeroIdentificativo);

      if (elevador === null) {
        return Result.fail<IElevadorDTO>("Elevador não encontrado");
      }
      else {
        elevador.descricao = elevadorDTO.descricao;
        elevador.marca = elevadorDTO.marca;
        elevador.modelo = elevadorDTO.modelo;
        elevador.pisosServidos = elevadorDTO.pisosServidos;
        elevador.numeroSerie = elevadorDTO.numeroSerie;
        elevador.numeroIdentificativo = elevadorDTO.numeroIdentificativo;
        await this.elevadorRepo.save(elevador);

        const elevadorDTOResult = ElevadorMap.toDTO( elevador ) as IElevadorDTO;
        return Result.ok<IElevadorDTO>( elevadorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
