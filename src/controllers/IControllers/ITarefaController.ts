import { Request, Response, NextFunction } from 'express';

export default interface ITarefaController  {
    createTarefa(req: Request, res: Response, next: NextFunction);
}