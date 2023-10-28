import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPisoService from '../services/IServices/IPisoService';
import IMapaEdificioController from './IControllers/IMapaEdificioController';
import IMapaEdificioService from '../services/IServices/IMapaEdificioService';

@Service()
export default class MapaEdificioController implements IMapaEdificioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.mapaEdificio.name) private mapaEdificioServiceInstance : IMapaEdificioService
  ) {}

}