import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITarefaController from './IControllers/ITarefaController';
import ITarefaService from '../services/IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class TarefaController implements ITarefaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.tarefa.name) private tarefaServiceInstance : ITarefaService
  ) {}

  public async createTarefa(req: Request, res: Response, next: NextFunction){
    try {
      const tarefaOrError = await this.tarefaServiceInstance.createTarefa(req.body as ITarefaDTO) as Result<ITarefaDTO>;
        
      if (tarefaOrError.isFailure) {
        return res.status(403).send("Erro: " + tarefaOrError.errorValue());
      }

      const tarefaDTO = tarefaOrError.getValue();
      return res.json( tarefaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

 
}