import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPisoController from "./IControllers/IPisoController";
import IPisoService from '../services/IServices/IPisoService';
import IPisoDTO from '../dto/IPisoDTO';

import { Result } from "../core/logic/Result";
import IListMinMaxDTO from '../dto/IListMinMaxDTO';
import IListPisosDTO from '../dto/IListPisosDTO';
import IEdificioDTO from '../dto/IEdificioDTO';

@Service()
export default class PisoController implements IPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.piso.name) private pisoServiceInstance : IPisoService
  ) {}

  public async createPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.createPiso(req.body as IPisoDTO) as Result<IPisoDTO>;
        
      if (pisoOrError.isFailure) {
        return res.status(403).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.updatePiso(req.body as IPisoDTO) as Result<IPisoDTO>;

      if (pisoOrError.isFailure) {
        return res.status(404).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.status(201).json( pisoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listPisos(req: Request, res: Response, next: NextFunction){
    try {
      const pisoOrError = await this.pisoServiceInstance.listPisos(req.body as IListPisosDTO) as Result<IPisoDTO[]>;

      if (pisoOrError.isFailure) {
        return res.status(404).send("Erro: " + pisoOrError.errorValue());
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json( pisoDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listMinMax(req: Request, res: Response, next: NextFunction){
    try {
      const edificioOrError = await this.pisoServiceInstance.listMinMax(req.body as IListMinMaxDTO) as Result<IEdificioDTO[]>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.status(200).json( edificioDTO );
    }
    catch (e) {
      return next(e);
    }
  };

}