import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IMapaPisoService from '../services/IServices/IMapaPisoService';
import IMapaPisoController from './IControllers/IMapaPisoController';
import IMapaPisoDTO from '../dto/IMapaPisoDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class MapaPisoController implements IMapaPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.mapaPiso.name) private mapaPisoServiceInstance : IMapaPisoService
  ) {}


  public async createMapaPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const mapaPisoOrError = await this.mapaPisoServiceInstance.createMapaPiso(req.body as IMapaPisoDTO) as Result<IMapaPisoDTO>;
        
      if (mapaPisoOrError.isFailure) {
        return res.status(403).send("Erro: " + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json( mapaPisoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  
  public async loadMapaPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const mapaPisoOrError = await this.mapaPisoServiceInstance.loadMapaPiso(req.body as IMapaPisoDTO) as Result<IMapaPisoDTO>;

      if (mapaPisoOrError.isFailure) {
        return res.status(404).send("Erro: " + mapaPisoOrError.errorValue());
      }

      const mapaPisoDTO = mapaPisoOrError.getValue();
      return res.json( mapaPisoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
}