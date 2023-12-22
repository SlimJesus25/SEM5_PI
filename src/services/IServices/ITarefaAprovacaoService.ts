
import { Result } from "../../core/logic/Result";
import IRequisitarDTO from "../../dto/IRequisitarDTO";
import ITarefaDTO from "../../dto/ITarefaDTO";

export default interface ITarefaAprovacaoService {
    requisitarTarefa(requisitarDTO: IRequisitarDTO): Promise<Result<ITarefaDTO>>;
}