import { Request, Response, NextFunction } from 'express';

export default interface IMapaPisoController  {
    createMapaPiso(req: Request, res: Response, next: NextFunction);
    loadMapaPiso(req: Request, res: Response, next: NextFunction);
}