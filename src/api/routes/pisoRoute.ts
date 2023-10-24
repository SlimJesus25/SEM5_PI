import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import { IPisoController } from '../../controllers/IControllers/IPisoController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/piso', route);

  const ctrl = Container.get(config.controllers.piso.name) as IPisoController;

  // Criar novo piso.
  route.post('/createPiso',
  celebrate({
    body: Joi.object({
      descricaoPiso: Joi.string(),
      salas: Joi.array().items(Joi.string()).required(),
      designacaoPiso: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createPiso(req, res, next));

  // Update piso existente.
  route.put('/updatePiso',
  celebrate({
    body: Joi.object({
      descricaoPiso: Joi.string(),
      salas: Joi.array().items(Joi.string()).required(),
      designacaoPiso: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.updatePiso(req, res, next));
};