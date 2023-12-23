import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  criarUser(req: Request, res: Response, next: NextFunction);
  criarUtente(req: Request, res: Response, next: NextFunction);
}