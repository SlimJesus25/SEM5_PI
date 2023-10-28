import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IEdificioController from "./IControllers/IEdificioController";
import IEdificioService from '../services/IServices/IEdificioService';
import IEdificioDTO from '../dto/IEdificioDTO';

import { Result } from "../core/logic/Result";
import IListElevadoresDTO from '../dto/IListElevadoresDTO';
import IElevadorDTO from '../dto/IElevadorDTO';
import IListPisosDTO from '../dto/IListPisosDTO';
import IPisoDTO from '../dto/IPisoDTO';
import IListMinMaxDTO from '../dto/IListMinMaxDTO';

@Service()
export default class EdificioController implements IEdificioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.edificio.name) private edificioServiceInstance : IEdificioService
  ) {}

  public async createEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = await this.edificioServiceInstance.createEdificio(req.body as IEdificioDTO) as Result<IEdificioDTO>;
        
      if (edificioOrError.isFailure) {
        return res.status(403).send();
      }

      const elevadorDTO = edificioOrError.getValue();
      return res.json( elevadorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = await this.edificioServiceInstance.updateEdificio(req.body as IEdificioDTO) as Result<IEdificioDTO>;

      if (edificioOrError.isFailure) {
        return res.status(404).send();
      }

      const elevadorDTO = edificioOrError.getValue();
      return res.status(201).json( elevadorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listEdificios(req: Request, res: Response, next: NextFunction){
    try {
      const edificioOrError = await this.edificioServiceInstance.listEdificios() as Result<IEdificioDTO[]>;

      if (edificioOrError.isFailure) {
        return res.status(404).send();
      }

      const edificioDTO = edificioOrError.getValue();
      return res.status(200).json( edificioDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}