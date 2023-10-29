import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPisoController from '../../controllers/IControllers/IPisoController'; 

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
      designacaoPiso: Joi.string().required(),
      edificio: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createPiso(req, res, next));

    // List pisos de um edifício.
    route.get('/listPisos',
    celebrate({
      body: Joi.object({
          codigoEdificio: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.listPisos(req, res, next));

  // Update piso existente.
  route.put('/updatePiso',
  celebrate({
    body: Joi.object({
      descricaoPiso: Joi.string(),
      salas: Joi.array().items(Joi.string()),
      designacaoPiso: Joi.string(),
      edificio: Joi.string()
    }),
  }),
  (req, res, next) => ctrl.updatePiso(req, res, next));

    // List edifícios com min e max de pisos.
    route.get('/listMinMax',
    celebrate({
      body: Joi.object({
          min: Joi.number().required(),
          max: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.listMinMax(req, res, next));
};