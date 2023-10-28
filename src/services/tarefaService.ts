import { Service, Inject } from 'typedi';
import config from "../../config";
import ITarefaRepo from './IRepos/ITarefaRepo';

@Service()
export default class TarefaService implements ITarefaService {
  constructor(
      @Inject(config.repos.tarefa.name) private tarefaRepo : ITarefaRepo
  ) {}

}
