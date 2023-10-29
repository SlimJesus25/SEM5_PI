import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ISalaController from '../../controllers/IControllers/ISalaController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/sala', route);

  const ctrl = Container.get(config.controllers.sala.name) as ISalaController;

  route.post('/createSala',
    celebrate({
      body: Joi.object({
        descricao: Joi.string(),
        categoria: Joi.string(),
        designacao: Joi.string().required(),
        piso: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createSala(req, res, next) );

  route.put('updateSala',
    celebrate({
      body: Joi.object({
        descricao: Joi.string(),
        categoria: Joi.string(),
        designacao: Joi.string().required(),
        piso: Joi.string()
      }),
    }),
    (req, res, next) => ctrl.updateSala(req, res, next) );
};