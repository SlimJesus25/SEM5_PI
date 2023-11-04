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
      mapa : Joi.string(),
      piso : Joi.string()
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
};