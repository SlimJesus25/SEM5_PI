import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPisoController from '../../controllers/IControllers/IPisoController'; 

import config from "../../../config";
import IMapaPisoController from '../../controllers/IControllers/IMapaPisoController';

const route = Router();

export default (app: Router) => {
  app.use('/piso', route);

  const ctrl = Container.get(config.controllers.piso.name) as IPisoController;
  const ctrl2 = Container.get(config.controllers.mapaPiso.name) as IMapaPisoController;

  // Criar novo piso.
  route.post('/createPiso',
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      designacao: Joi.string().required(),
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

    route.post('/createMapaPiso',
  celebrate({
    body: Joi.object({
      mapaProfundidade: Joi.number(),
      mapaPiso : Joi.number(),
      mapaSaidaLocalizacao : Joi.number(),
      mapaElevador : Joi.number(),
      mapaSaidas : Joi.number()
    }),
  }),
  (req, res, next) => ctrl2.createMapaPiso(req, res, next));
  

  route.patch('/LoadMapaPiso',
    celebrate({
      body: Joi.object({
        mapaProfundidade: Joi.number(),
        mapaPiso : Joi.number(),
        mapaSaidaLocalizacao : Joi.number(),
        mapaElevador : Joi.number(),
        mapaSaidas : Joi.number()
      }),
    }),
    (req, res, next) => ctrl2.loadMapaPiso(req, res, next));


};