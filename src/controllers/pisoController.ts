import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPisoController from "./IControllers/IPisoController";
import IPisoService from '../services/IServices/IPisoService';
import IPisoDTO from '../dto/IPisoDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PisoController implements IPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.elevador.name) private pisoServiceInstance : IPisoService
  ) {}

  public async createPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.createElevador(req.body as IPisoDTO) as Result<IPisoDTO>;
        
      if (pisoOrError.isFailure) {
        return res.status(402).send();
      }

      const elevadorDTO = pisoOrError.getValue();
      return res.json( elevadorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.updateElevador(req.body as IPisoDTO) as Result<IPisoDTO>;

      if (pisoOrError.isFailure) {
        return res.status(404).send();
      }

      const elevadorDTO = pisoOrError.getValue();
      return res.status(201).json( elevadorDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}