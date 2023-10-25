import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoboController from '../../controllers/IControllers/IRoboController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/robo', route);

  const ctrl = Container.get(config.controllers.robo.name) as IRoboController;

  // Criar novo robo.
  route.post('/createRobo',
  celebrate({
    body: Joi.object({
      estado: Joi.array().items(Joi.string()).min(1).max(20).required(),
      marca: Joi.string().required(),
      codigo: Joi.string().required(),
      numeroSerie: Joi.string().required(),
      nickname: Joi.string().required(),
      tipoRobo: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createRobo(req, res, next));

  // Update robo existente.
  route.put('/updateRobo',
  celebrate({
    body: Joi.object({
      estado: Joi.array().items(Joi.string()).min(1).max(20).required(),
      marca: Joi.string().required(),
      codigo: Joi.string().required(),
      numeroSerie: Joi.string().required(),
      nickname: Joi.string().required(),
      tipoRobo: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.updateRobo(req, res, next));

  /* List robos.
  route.put('/listRobo',
  celebrate({
    body: Joi.object({
        codigoEdificio: Joi.string().required(),
    }),
  }),
  (req, res, next) => ctrl.listElevadores(req, res, next));
 
  */
};