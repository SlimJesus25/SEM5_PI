import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITarefaService from './IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import ITarefaRepo from './IRepos/ITarefaRepo';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';

@Service()
export default class TarefaService implements ITarefaService {
    constructor(
        @Inject(config.repos.tarefa.name) private tarefaRepo: ITarefaRepo
    ) { }

    public async requisitarTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>> {
        try {

            let tarefa;

            const tarefaOrError = await Tarefa.create({
                tipoTarefa: tarefaDTO.tipoTarefa,
                pontoTermino: tarefaDTO.pontoTermino,
                pontoInicial: tarefaDTO.pontoInicial,
                designacaoTarefa: tarefaDTO.designacaoTarefa
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
