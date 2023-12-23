import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IUserController from "./IControllers/IUserController";
import IUserService from '../services/IServices/IUserService';
import IUserDTO from '../dto/IUserDTO';

import { Result } from "../core/logic/Result";
import ICreatingUserDTO from '../dto/ICreatingUserDTO';
import { Console } from 'console';

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.user.name) private userServiceInstance : IUserService
  ) {}

  public async criarUser(req: Request, res: Response, next: NextFunction){
    try {
      console.log(req.body);
      const userOrError = await this.userServiceInstance.criarUser(req.body as ICreatingUserDTO) as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(403).send("Erro: " + userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async criarUtente(req: Request, res: Response, next: NextFunction){
    try {
      console.log(req.body);
      const userOrError = await this.userServiceInstance.criarUser(req.body as ICreatingUserDTO) as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(403).send("Erro: " + userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
/*
exports.getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}
*/
}