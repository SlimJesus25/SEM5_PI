import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoController from "./IControllers/IAprovacaoController";
import IAprovacaoService from '../services/IServices/IAprovacaoService';
import IAprovacaoDTO from '../dto/IAprovacaoDTO';

import { Result } from "../core/logic/Result";
import IAprovarDTO from '../dto/IAprovarDTO';

@Service()
export default class AprovacaoController implements IAprovacaoController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.aprovacao.name) private aprovacaoServiceInstance: IAprovacaoService
    ) { }


    public async aceitarRequisicao(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacaoOrError = await this.aprovacaoServiceInstance.aceitarRequisicao(req.body as IAprovarDTO) as Result<IAprovacaoDTO>;

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

    public async listarTarefasNaoAprovadas(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacoesOrError = await this.aprovacaoServiceInstance.listarRequisicoesNaoAprovadas() as Result<IAprovacaoDTO[]>;

            if (aprovacoesOrError.isFailure) {
                return res.status(404).send("Error: " + aprovacoesOrError.errorValue());
            }

            const aprovacoesDTO = aprovacoesOrError.getValue()
            return res.json(aprovacoesDTO).status(201);
        } catch (e) {
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