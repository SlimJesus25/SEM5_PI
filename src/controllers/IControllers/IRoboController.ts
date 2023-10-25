import { Request, Response, NextFunction } from 'express';

export default interface IRoboController  {
  createRobo(req: Request, res: Response, next: NextFunction);
  updateRobo(req: Request, res: Response, next: NextFunction);
}