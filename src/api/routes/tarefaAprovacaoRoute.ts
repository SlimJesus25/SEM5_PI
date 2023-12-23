import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITarefaAprovacaoController from '../../controllers/IControllers/ITarefaAprovacaoController';

const route = Router();

export default (app: Router) => {
    app.use('/tarefaAprovacao', route);

    const ctrl = Container.get(config.controllers.tarefaAprovacao.name) as ITarefaAprovacaoController;

    route.post('/requisitar',
    celebrate({
      body: Joi.object({
        tipoDispositivo: Joi.string(),
        tarefa: Joi.string().required(),
        tipoTarefa: Joi.string().required(),
        pontoInicio: Joi.string().required(),
        pontoTermino: Joi.string().required(),
        //requisitante: Joi.string().required() --> Deve ser, automaticamente, gathered pela sessão.
      })
    }),
    (req, res, next) => ctrl.requisitar(req, res, next));


};