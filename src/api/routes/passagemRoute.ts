import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPassagemController from '../../controllers/IControllers/IPassagemController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/passagem', route);

  const ctrl = Container.get(config.controllers.passagem.name) as IPassagemController;

  // Criar nova passagem.
  route.post('/createPassagem',
  celebrate({
    body: Joi.object({
      designacao: Joi.string().required(),
      edificioA: Joi.string().required(),
      edificioB: Joi.string().required(),
      pisoA: Joi.string().required(),
      pisoB: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createPassagem(req, res, next));

  // Update passagem existente.
  route.put('/updatePassagem',
  celebrate({
    body: Joi.object({
      designacao: Joi.string().required(),
      edificioA: Joi.string().required(),
      edificioB: Joi.string().required(),
      pisoA: Joi.string().required(),
      pisoB: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.updatePassagem(req, res, next));

  // Listar passagens entre 2 edifícios (recebe 2 códigos de edifício).
  route.get('/listPassagensEdificios',
  celebrate({
    body: Joi.object({
      codigoEdificioA: Joi.string().required(),
      codigoEdificioB: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.listPassagens(req, res, next));
  
  //Listar pisos de edifício com passagem para outros edifícios
  route.get('/listPisos',
  celebrate({
    body: Joi.object({
    codigoEdificioA: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.listPisos(req,res,next));
};

