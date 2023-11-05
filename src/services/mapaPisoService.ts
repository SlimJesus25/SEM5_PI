import { Service, Inject } from 'typedi';
import config from "../../config";
import IMapaPisoRepo from './IRepos/IMapaPisoRepo';
import IPisoRepo from './IRepos/IPisoRepo';
import IMapaPisoService from './IServices/IMapaPisoService';
import { Result } from '../core/logic/Result';
import IMapaPisoDTO from '../dto/IMapaPisoDTO';
import IPisoDTO from '../dto/IPisoDTO';
import { MapaPiso } from '../domain/mapaPiso';
import { MapaPisoMap } from '../mappers/MapaPisoMap';

@Service()
export default class MapaPisoService implements IMapaPisoService {
  constructor(
      @Inject(config.repos.mapaPiso.name) private mapaPisoRepo : IMapaPisoRepo,
      @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo
  ) {}


 public async createMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {

      const mapaPiso = await this.mapaPisoRepo.findByPiso(mapaPisoDTO.piso);

      if (mapaPiso != null)
        return Result.fail<IMapaPisoDTO>("Já existe um piso com o mapa de piso " + mapaPisoDTO.id);

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      const mapaPisoOrError = MapaPiso.create({
        mapa: mapaPisoDTO.mapa,
        piso : piso
      });


      if (mapaPisoOrError.isFailure) {
        return Result.fail<IMapaPisoDTO>(mapaPisoOrError.errorValue());
      }
      const mapaPisoResult = mapaPisoOrError.getValue();
      await this.mapaPisoRepo.save(mapaPisoResult);

      const mapaPisoDTOResult = MapaPisoMap.toDTO( mapaPisoResult ) as IMapaPisoDTO;
      return Result.ok<IMapaPisoDTO>( mapaPisoDTOResult )
    } catch (e) {
      throw e;
    }

  }

  public async loadMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {
      const mapaPiso = await this.mapaPisoRepo.findByDomainId(mapaPisoDTO.id);

      if (mapaPiso === null) {
        return Result.fail<IMapaPisoDTO>("Mapa de Piso não encontrado");
      }

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      if (piso == null){
        return Result.fail<IMapaPisoDTO>("O mapa de piso" + mapaPisoDTO.id + "não tem nenhum piso associado.");

      }else {
        mapaPiso.mapa = mapaPisoDTO.mapa
        await this.mapaPisoRepo.save(mapaPiso);

        const mapaPisoDTOResult = MapaPisoMap.toDTO( mapaPiso ) as IMapaPisoDTO;
        return Result.ok<IMapaPisoDTO>( mapaPisoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  
}
