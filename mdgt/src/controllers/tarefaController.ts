import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoService from '../services/IServices/IAprovacaoService';
import ITarefaController from './IControllers/ITarefaController';
import ITarefaService from '../services/IServices/ITarefaService';
import IRequisitarDTO from '../dto/IRequisitarDTO';

@Service()
export default class TarefaController implements ITarefaController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.aprovacao.name) private aprovacaoServiceInstance: IAprovacaoService,
        @Inject(config.services.tarefa.name) private tarefaServiceInstance: ITarefaService
        ) { }


    public async requisitar(req: Request, res: Response, next: NextFunction) {
        try{
            const tarefaOrError = await this.tarefaServiceInstance.requisitarTarefa(req.body as IRequisitarDTO);
            
            if(tarefaOrError.isFailure){
                return res.status(403).send("Erro: " + tarefaOrError.errorValue());
            }

            const tarefaDTO = tarefaOrError.getValue();
            return res.json(tarefaDTO).status(201);
        }catch (e){
            return next(e);
        }
    };



}