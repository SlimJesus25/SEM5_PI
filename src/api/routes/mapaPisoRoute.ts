import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPisoController from '../../controllers/IControllers/IPisoController'; 

import config from "../../../config";
import IMapaPisoController from '../../controllers/IControllers/IMapaPisoController';

const route = Router();

export default (app: Router) => {
  app.use('/mapaPiso', route);

  const ctrl2 = Container.get(config.controllers.mapaPiso.name) as IMapaPisoController;

    route.post('/createMapaPiso',
  celebrate({
    body: Joi.object({
      mapa : Joi.object().required(),
      piso : Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl2.createMapaPiso(req, res, next));
  

  route.patch('/LoadMapaPiso',
    celebrate({
      body: Joi.object({
        mapaPiso : Joi.number()
      }),
    }),
    (req, res, next) => ctrl2.loadMapaPiso(req, res, next));

    route.delete('/deleteMapaPiso',
    celebrate({
      body: Joi.object({
        piso: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl2.deleteMapaPiso(req, res, next));

    route.get('/listMapasPiso',
  celebrate({
    body: Joi.object({
    }),
  }),
  (req, res, next) => ctrl2.listMapasPiso(req, res, next));
};