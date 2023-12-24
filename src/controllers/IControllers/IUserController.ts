import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  criarUser(req: Request, res: Response, next: NextFunction);
  criarUtente(req: Request, res: Response, next: NextFunction);
  updateUser(req: Request, res: Response, next: NextFunction);
  getAllUsers(req: Request, res: Response, next: NextFunction);
  getUserById(req: Request, res: Response, next: NextFunction);
}