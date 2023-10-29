import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IEdificioController from "./IControllers/IEdificioController";
import IEdificioService from '../services/IServices/IEdificioService';
import IEdificioDTO from '../dto/IEdificioDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class EdificioController implements IEdificioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.edificio.name) private edificioServiceInstance : IEdificioService
  ) {}

  public async createEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const a = req.body as IEdificioDTO;
      const edificioOrError = await this.edificioServiceInstance.createEdificio(req.body as IEdificioDTO) as Result<IEdificioDTO>;
        
      if (edificioOrError.isFailure) {
        return res.status(403).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.json( edificioDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = await this.edificioServiceInstance.updateEdificio(req.body as IEdificioDTO) as Result<IEdificioDTO>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.status(201).json( edificioDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listEdificios(req: Request, res: Response, next: NextFunction){
    try {
      const edificioOrError = await this.edificioServiceInstance.listEdificios() as Result<IEdificioDTO[]>;

      if (edificioOrError.isFailure) {
        return res.status(404).send("Erro: " + edificioOrError.errorValue());
      }

      const edificioDTO = edificioOrError.getValue();
      return res.status(200).json( edificioDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}