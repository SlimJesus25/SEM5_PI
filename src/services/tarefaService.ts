import { Service, Inject } from 'typedi';
import config from "../../config";
import ITarefaRepo from './IRepos/ITarefaRepo';
import ITarefaService from './IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import { Result } from '../core/logic/Result';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';

@Service()
export default class TarefaService implements ITarefaService {
  constructor(
      @Inject(config.repos.tarefa.name) private tarefaRepo : ITarefaRepo
  ) {}

  public async createTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>>{
    try {

      const tarefa = await this.tarefaRepo.findByDesignacao(tarefaDTO.tipoTarefa);

      if (tarefa != null)
        return Result.fail<ITarefaDTO>("Já existe uma tarefa com a desginacao " + tarefaDTO.tipoTarefa);

      const tarefaOrError = Tarefa.create({
        tipoTarefa: tarefaDTO.tipoTarefa
      });

      if (tarefaOrError.isFailure) {
        return Result.fail<ITarefaDTO>(tarefaOrError.errorValue());
      }

      const tarefaResult = tarefaOrError.getValue();
      await this.tarefaRepo.save(tarefaResult);

      const tarefaDTOResult = TarefaMap.toDTO(tarefaResult) as ITarefaDTO;
      return Result.ok<ITarefaDTO>(tarefaDTOResult)
    } catch (e) {
      throw e;
    }
  }

}
