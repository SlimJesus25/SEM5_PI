import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPassagemController from "./IControllers/IPassagemController";
import IPassagemService from '../services/IServices/IPassagemService';
import IPassagemDTO from '../dto/IPassagemDTO';

import { Result } from "../core/logic/Result";
import IListPassagensEntreEdificiosDTO from '../dto/IListPassagensEntreEdificiosDTO';
import IListPisosComPassagemDTO from '../dto/IListPisosComPassagemDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IPisoDTO from '../dto/IPisoDTO';

@Service()
export default class PassagemController implements IPassagemController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.passagem.name) private passagemServiceInstance : IPassagemService
  ) {}

  public async createPassagem(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemOrError = await this.passagemServiceInstance.createPassagem(req.body as IPassagemDTO) as Result<IPassagemDTO>;
        
      if (passagemOrError.isFailure) {
        return res.status(403).send("Erro: " + passagemOrError.errorValue());
      }

      const passagemDTO = passagemOrError.getValue();
      return res.status(201).json( passagemDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePassagem(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemOrError = await this.passagemServiceInstance.updatePassagem(req.body as IPassagemDTO) as Result<IPassagemDTO>;

      if (passagemOrError.isFailure) {
        return res.status(404).send("Erro: " + passagemOrError.errorValue());
      }

      const passagemDTO = passagemOrError.getValue();
      return res.status(201).json( passagemDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listPassagens(req: Request, res: Response, next: NextFunction){
    try {
      const passagemOrError = await this.passagemServiceInstance.listPassagens(req.body as IListPassagensEntreEdificiosDTO) as Result<IPassagemDTO[]>;

      if (passagemOrError.isFailure) {
        return res.status(404).send("Erro: " + passagemOrError.errorValue());
      }

      const passagemDTO = passagemOrError.getValue();
      return res.json( passagemDTO ).status(200);
    }
    catch (e) {
      return next(e);
    }
  }
  
  public async listPisos(req: Request, res: Response, next: NextFunction) {
      try{
        const passagemOrError = await this.passagemServiceInstance.listPisos(req.body as IListPisosComPassagemDTO) as Result<IPisoDTO[]>;
        
        if(passagemOrError.isFailure){
          return res.status(404).send("Erro: " + passagemOrError.errorValue());
        }
        
        const passagemDTO = passagemOrError.getValue();
        return res.status(200).json(passagemDTO);
        
      }
      catch(e){
        return next(e);
      }
  }
}