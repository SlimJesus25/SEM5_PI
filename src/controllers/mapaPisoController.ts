import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IMapaPisoService from '../services/IServices/IMapaPisoService';
import IMapaPisoController from './IControllers/IMapaPisoController';

@Service()
export default class MapaPisoController implements IMapaPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.mapaPiso.name) private mapaPisoServiceInstance : IMapaPisoService
  ) {}

}