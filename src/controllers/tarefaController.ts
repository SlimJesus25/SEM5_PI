import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ISalaController from "./IControllers/ISalaController";
import ISalaService from '../services/IServices/ISalaService';
import ISalaDTO from '../dto/ISalaDTO';

import { Result } from "../core/logic/Result";
import ITarefaController from './IControllers/ITarefaController';
import ITarefaService from '../services/IServices/ITarefaService';

@Service()
export default class TarefaController implements ITarefaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.tarefa.name) private tarefaServiceInstance : ITarefaService
  ) {}

 
}