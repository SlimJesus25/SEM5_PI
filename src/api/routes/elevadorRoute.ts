import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevadorController from '../../controllers/IControllers/IElevadorController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/elevador', route);

  const ctrl = Container.get(config.controllers.elevador.name) as IElevadorController;

  // Criar novo elevador.
  route.post('/createElevador',
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      numeroIdentificativo: Joi.number().required(),
      modelo: Joi.string(),
      marca: Joi.string(),
      pisosServidos: Joi.array().items(Joi.string()).min(1).max(20).required(),
      numeroSerie: Joi.string(),
      edificio: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createElevador(req, res, next));

    // List elevadores de um edifício.
    route.get('/listElevadores',
    celebrate({
      body: Joi.object({
          codigoEdificio: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.listElevadores(req, res, next));

  // Update elevador existente.
  route.put('/updateElevador',
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      numeroIdentificativo: Joi.number().required(),
      modelo: Joi.string(),
      marca: Joi.string(),
      pisosServidos: Joi.array().items(Joi.string()).min(1).max(20),
      numeroSerie: Joi.string(),
      edificio: Joi.string()
    }),
  }),
  (req, res, next) => ctrl.updateElevador(req, res, next));
};