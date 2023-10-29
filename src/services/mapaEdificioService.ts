import { Service, Inject } from 'typedi';
import config from "../../config";
import IMapaPisoRepo from './IRepos/IMapaPisoRepo';
import IMapaPisoService from './IServices/IMapaPisoService';

@Service()
export default class MapaPisoService implements IMapaPisoService {
  constructor(
      @Inject(config.repos.mapaPiso.name) private mapaPisoRepo : IMapaPisoRepo
  ) {}

  
}
