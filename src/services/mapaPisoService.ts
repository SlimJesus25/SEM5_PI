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

      const mapaPiso = await this.mapaPisoRepo.findByDomainId(mapaPisoDTO.id);

      if (mapaPiso != null)
        return Result.fail<IMapaPisoDTO>("Já existe um mapa de piso com o código " + mapaPisoDTO.id);

      const mapaPisoOrError = MapaPiso.create({
        piso : mapaPiso.piso,
        mapaLargura : mapaPisoDTO.mapaLargura,
        mapaProfundidade : mapaPisoDTO.mapaProfundidade,
        mapaPiso : mapaPisoDTO.mapaPiso,
        mapaSaidaLocalizacao : mapaPisoDTO.mapaSaidaLocalizacao,
        mapaElevador : mapaPisoDTO.mapaElevador,
        mapaSaidas : mapaPisoDTO.mapaSaidas
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
      }else {
        mapaPiso.largura = mapaPisoDTO.mapaLargura;
        mapaPiso.profundidade = mapaPisoDTO.mapaProfundidade;
        mapaPiso.saidaLocalizacao = mapaPisoDTO.mapaSaidaLocalizacao;
        mapaPiso.elevador =  mapaPisoDTO.mapaElevador;
        mapaPiso.saidas = mapaPisoDTO.mapaSaidas;
        await this.mapaPisoRepo.save(mapaPiso);

        const mapaPisoDTOResult = MapaPisoMap.toDTO( mapaPiso ) as IMapaPisoDTO;
        return Result.ok<IMapaPisoDTO>( mapaPisoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  
}
