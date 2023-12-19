import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IAprovacaoController from '../../controllers/IControllers/IAprovacaoController';

const route = Router();

export default (app: Router) => {
  app.use('/aprovacoes', route);

  const ctrl = Container.get(config.controllers.aprovacao.name) as IAprovacaoController;

  route.post('/aceitarRequisicao',
    celebrate({
      body: Joi.object({
        tipoDispositivo: Joi.string().required(),
        tarefa: Joi.string().required(),
        requisitante: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.aceitarRequisicao(req, res, next));

  route.post('/recusarRequisicao',
    celebrate({
      body: Joi.object({
        tipoDispositivo: Joi.string().required(),
        tarefa: Joi.string().required(),
        requisitante: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.recusarRequisicao(req, res, next));

    route.get('/listarTarefasNaoAprovadas',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.listarTarefasNaoAprovadas(req, res, next));
};