import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IEdificioController from '../../controllers/IControllers/IEdificioController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/edificio', route);

  const ctrl = Container.get(config.controllers.edificio.name) as IEdificioController;

  // Criar novo edificio.
  route.post('/createEdificio',
  celebrate({
    body: Joi.object({
      dimensaoMaxima: Joi.number().required(),
      nomeOpcional: Joi.string(),
      codigo: Joi.string().required(),
      elevador: Joi.string().required(),
      pisos: Joi.array().items(Joi.string()).min(1).max(20),
      mapaEdificio: Joi.string()
    })
  }),
  (req, res, next) => ctrl.createEdificio(req, res, next));

  // Update edificio existente.
  route.put('/updateEdificio',
  celebrate({
    body: Joi.object({
        dimensaoMaxima: Joi.number().required(),
        nomeOpcional: Joi.string(),
        codigo: Joi.string().required(),
        elevador: Joi.string().required(),
        pisos: Joi.array().items(Joi.string()).min(1).max(20),
        mapaEdificio: Joi.string()
    }),
  }),
  (req, res, next) => ctrl.updateEdificio(req, res, next));

};