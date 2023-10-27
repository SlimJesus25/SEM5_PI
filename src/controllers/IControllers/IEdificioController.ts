import { Request, Response, NextFunction } from 'express';

export default interface IRoleController  {
  createEdificio(req: Request, res: Response, next: NextFunction);
  updateEdificio(req: Request, res: Response, next: NextFunction);
  listElevadores(req: Request, res: Response, next: NextFunction);
  listEdificios(req: Request, res: Response, next: NextFunction);
  listPisos(req: Request, res: Response, next: NextFunction);
  listMinMax(req: Request, res: Response, next: NextFunction);
}