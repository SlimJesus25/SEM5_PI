import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoController from "./IControllers/IAprovacaoController";
import IAprovacaoService from '../services/IServices/IAprovacaoService';
import IAprovacaoDTO from '../dto/IAprovacaoDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class AprovacaoController implements IAprovacaoController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.aprovacao.name) private aprovacaoServiceInstance: IAprovacaoService
    ) { }


    public async aceitarRequisicao(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacaoOrError = await this.aprovacaoServiceInstance.aceitarRequisicao(req.body as IAprovacaoDTO) as Result<IAprovacaoDTO>;

            if (aprovacaoOrError.isFailure) {
                return res.status(403).send("Erro: " + aprovacaoOrError.errorValue());
            }

            const aprovacaoDTO = aprovacaoOrError.getValue();
            return res.json(aprovacaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async recusarRequisicao(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacaoOrError = await this.aprovacaoServiceInstance.recusarRequisicao(req.body as IAprovacaoDTO) as Result<IAprovacaoDTO>;

            if (aprovacaoOrError.isFailure) {
                return res.status(403).send("Erro: " + aprovacaoOrError.errorValue());
            }

            const aprovacaoDTO = aprovacaoOrError.getValue();
            return res.json(aprovacaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async listarPorEstado(req: Request, res: Response, next: NextFunction) {

    };

    public async listarPorTipoDispositivo(req: Request, res: Response, next: NextFunction) {

    };

    public async listarPorUtente(req: Request, res: Response, next: NextFunction) {

    };
}