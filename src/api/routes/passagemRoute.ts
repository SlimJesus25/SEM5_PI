import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPassagemController from '../../controllers/IControllers/IPassagemController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/elevador', route);

  const ctrl = Container.get(config.controllers.elevador.name) as IPassagemController;

  // Criar novo elevador.
  route.post('/createElevador',
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      numeroIdentificativo: Joi.number().required(),
      modelo: Joi.string(),
      marca: Joi.string(),
      pisosServidos: Joi.array().items(Joi.string()).min(1).max(20).required(),
      numeroSerie: Joi.string()
    })
  }),
  (req, res, next) => ctrl.createElevador(req, res, next));

  // Update elevador existente.
  route.put('/updateElevador',
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      numeroIdentificativo: Joi.number().required(),
      modelo: Joi.string(),
      marca: Joi.string(),
      pisosServidos: Joi.array().items(Joi.string()).min(1).max(20).required(),
      numeroSerie: Joi.string()
    }),
  }),
  (req, res, next) => ctrl.updateElevador(req, res, next));

  // Listar passagens entre 2 edifícios (recebe 2 códigos de edifício).
  route.put('/listPassagens',
  celebrate({
    body: Joi.object({
      codigoEdificioA: Joi.string().required(),
      codigoEdificioB: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.updateElevador(req, res, next));
};