import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITarefaService from './IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import ITarefaRepo from './IRepos/ITarefaRepo';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';
import IRequisitarDTO from '../dto/IRequisitarDTO';
import ITarefaAprovacaoService from './IServices/ITarefaAprovacaoService';

@Service()
export default class TarefaAprovacaoService implements ITarefaAprovacaoService {
    constructor(
    ) { }

    public async requisitarTarefa(requisitarDTO: IRequisitarDTO): Promise<Result<ITarefaDTO>> {
        try {

            
            return null//Result.ok<ITarefaDTO>(tarefaDTOResult);
        } catch (e) {
            throw e;
        }
    }


}
