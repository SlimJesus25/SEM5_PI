import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITarefaController from '../../controllers/IControllers/ITarefaController';

const route = Router();

export default (app: Router) => {
  app.use('/tarefa', route);

  const ctrl = Container.get(config.controllers.tarefa.name) as ITarefaController;

  // Criar novo tipo de robo.
  route.post('/createTarefa',
  celebrate({
    body: Joi.object({
      tipoTarefa: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createTarefa(req, res, next));

  route.delete('/deleteTarefa',
    celebrate({
      body: Joi.object({
        tipoTarefa: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.deleteTarefa(req, res, next));

};