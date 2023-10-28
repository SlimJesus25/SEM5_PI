import { Service, Inject } from 'typedi';
import config from "../../config";
import ITipoRoboDTO from '../dto/ITipoRoboDTO';
import { TipoRobo } from "../domain/tipoRobo";
import { Tarefa } from "../domain/tarefa";
import ITipoRoboRepo from '../services/IRepos/ITipoRoboRepo';
import ITarefaRepo from '../services/IRepos/ITarefaRepo';
import ITipoRoboService from './IServices/ITipoRoboService';
import { Result } from "../core/logic/Result";
import { TipoRoboMap } from "../mappers/TipoRoboMap";

@Service()
export default class TipoRoboService implements ITipoRoboService {
  constructor(
      @Inject(config.repos.tipoRobo.name) private tipoRoboRepo : ITipoRoboRepo,
      @Inject(config.repos.tarefa.name) private tarefaRepo : ITarefaRepo
  ) {}

  public async getTipoRobo(tipoRoboId: string): Promise<Result<ITipoRoboDTO>> {
    try {
      const tipoRobo = await this.tipoRoboRepo.findByDomainId(tipoRoboId);

      if (tipoRobo === null) {
        return Result.fail<ITipoRoboDTO>("Tipo robo não encontrado");
      }
      else {
        const elevadorDTOResult = TipoRoboMap.toDTO( tipoRobo ) as ITipoRoboDTO;
        return Result.ok<ITipoRoboDTO>( elevadorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createTipoRobo(tipoRoboDTO: ITipoRoboDTO): Promise<Result<ITipoRoboDTO>> {
    try {

      const tipoRoboDocument = await this.tipoRoboRepo.findByDesignacao(tipoRoboDTO.designacao);

      if(!!tipoRoboDocument)
        return Result.fail<ITipoRoboDTO>("Já existe um tipo de robo com a desginacao " + tipoRoboDTO.designacao);

      const tarefas = (await this.getTarefas(tipoRoboDTO.tarefas)).getValue();

      const tipoRoboOrError = TipoRobo.create({
        tarefas: tarefas,
        designacao: tipoRoboDTO.designacao,
        marca: tipoRoboDTO.marca,
        modelo: tipoRoboDTO.modelo
      });

      if (tipoRoboOrError.isFailure) {
        return Result.fail<ITipoRoboDTO>(tipoRoboOrError.errorValue());
      }

      const tipoRoboResult = tipoRoboOrError.getValue();
      await this.tipoRoboRepo.save(tipoRoboResult);

      const tipoRoboDTOResult = TipoRoboMap.toDTO( tipoRoboResult ) as ITipoRoboDTO;
      return Result.ok<ITipoRoboDTO>( tipoRoboDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTipoRobo(tipoRoboDTO: ITipoRoboDTO): Promise<Result<ITipoRoboDTO>> {
    try {
      const tipoRobo = await this.tipoRoboRepo.findByDomainId(tipoRoboDTO.domainId);

      const tarefas = (await this.getTarefas(tipoRoboDTO.tarefas)).getValue();

      if (tipoRobo === null) {
        return Result.fail<ITipoRoboDTO>("Tipo de robo não encontrado");
      }
      else {
        tipoRobo.designacao = tipoRoboDTO.designacao;
        tipoRobo.marca = tipoRoboDTO.marca;
        tipoRobo.modelo = tipoRoboDTO.modelo;
        tipoRobo.tarefas = tarefas;
        await this.tipoRoboRepo.save(tipoRobo);

        const tipoRoboDTOResult = TipoRoboMap.toDTO( tipoRobo ) as ITipoRoboDTO;
        return Result.ok<ITipoRoboDTO>( tipoRoboDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  private async getTarefas(idTarefas : string[]): Promise<Result<Tarefa[]>>{
    let tarefas : Tarefa[];
    idTarefas.forEach(async t => tarefas.push(await this.tarefaRepo.findByDomainId(t)));
    return Result.ok<Tarefa[]>(tarefas);
  }

}
