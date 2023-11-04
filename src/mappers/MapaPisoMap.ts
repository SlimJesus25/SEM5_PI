import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IMapaPisoPersistence } from '../dataschema/IMapaPisoPersistence';

import IMapaEdificioDTO from "../dto/IMapaPisoDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Container } from 'typedi';

import { MapaPiso } from "../domain/mapaPiso";
import IMapaPisoDTO from "../dto/IMapaPisoDTO";

export class MapaPisoMap extends Mapper<MapaPiso> {
  
  public static toDTO(mapaPiso: MapaPiso): IMapaPisoDTO {
    return {
      id: mapaPiso.id.toString(),
      piso: mapaPiso.piso.designacao,
      mapa : mapaPiso.mapa,
    } as IMapaPisoDTO;
  }

  public static toDomain (mapaPiso: any | Model<IMapaPisoPersistence & Document> ): MapaPiso {
    return null;
  }

  public static toPersistence (mapaPiso: MapaPiso): any {
    return {
      domainId: mapaPiso.id.toString(),
      piso : mapaPiso.piso,
      mapa : mapaPiso.mapa,
    }
  }
}