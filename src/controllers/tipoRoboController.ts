import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITipoRoboController from "./IControllers/ITipoRoboController";
import ITipoRoboService from '../services/IServices/ITipoRoboService';
import ITipoRoboDTO from '../dto/ITipoRoboDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TipoRoboController implements ITipoRoboController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.tipoRobo.name) private tipoRoboServiceInstance : ITipoRoboService
  ) {}

  public async createTipoRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoRoboOrError = await this.tipoRoboServiceInstance.createTipoRobo(req.body as ITipoRoboDTO) as Result<ITipoRoboDTO>;
        
      if (tipoRoboOrError.isFailure) {
        return res.status(403).send();
      }

      const elevadorDTO = tipoRoboOrError.getValue();
      return res.json( elevadorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTipoRobo(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoRoboOrError = await this.tipoRoboServiceInstance.updateTipoRobo(req.body as ITipoRoboDTO) as Result<ITipoRoboDTO>;

      if (tipoRoboOrError.isFailure) {
        return res.status(404).send();
      }

      const elevadorDTO = tipoRoboOrError.getValue();
      return res.status(201).json( elevadorDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}