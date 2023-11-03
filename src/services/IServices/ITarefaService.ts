import { Result } from "../../core/logic/Result";
import ITarefaDTO from "../../dto/ITarefaDTO";

export default interface ITarefaService {
    createTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>>;
}
