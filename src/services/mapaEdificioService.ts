import { Service, Inject } from 'typedi';
import config from "../../config";
import IMapaEdificioRepo from './IRepos/IMapaEdificioRepo';
import IMapaEdificioService from './IServices/IMapaEdificioService';

@Service()
export default class MapaEdificioService implements IMapaEdificioService {
  constructor(
      @Inject(config.repos.mapaEdificio.name) private mapaEdificioRepo : IMapaEdificioRepo
  ) {}

  
}
