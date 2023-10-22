import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPassagemController from "./IControllers/IPassagemController";
import IPassagemService from '../services/IServices/IPassagemService';
import IPassagemDTO from '../dto/IPassagemDTO';

import { Result } from "../core/logic/Result";
import IEdificioDTO from '../dto/IEdificioDTO';

@Service()
export default class ElevadorController implements IPassagemController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.passagem.name) private passagemServiceInstance : IPassagemService
  ) {}

  public async createPassagem(req: Request, res: Response, next: NextFunction) {

  };

  public async updatePassagem(req: Request, res: Response, next: NextFunction) {
    
  };

  public async listPassagens(req: Request, res: Response, next: NextFunction){
    try {
        const passagemOrError = await this.passagemServiceInstance.listPassagens(req.body) as Result<IPassagemDTO>;
  
        if (passagemOrError.isFailure) {
          return res.status(404).send();
        }
  
        const passasgemDTO = passagemOrError.getValue();
        return res.status(200).json( passasgemDTO );
      }
      catch (e) {
        return next(e);
      }
  }
}