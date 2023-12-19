import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITarefaController from '../../controllers/IControllers/ITarefaController';

const route = Router();

export default (app: Router) => {
  app.use('/tarefas', route);

  const ctrl = Container.get(config.controllers.tarefa.name) as ITarefaController;

};