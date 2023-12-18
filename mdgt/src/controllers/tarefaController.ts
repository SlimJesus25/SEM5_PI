import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoService from '../services/IServices/IAprovacaoService';
import ITarefaController from './IControllers/ITarefaController';

@Service()
export default class TarefaController implements ITarefaController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.aprovacao.name) private aprovacaoServiceInstance: IAprovacaoService
    ) { }


    public async requisitar(req: Request, res: Response, next: NextFunction) {

    };


}