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
      piso: mapaPiso.piso.designacao, // designação única
      mapaLargura: mapaPiso.largura,
      mapaProfundidade: mapaPiso.profundidade,
      mapaPiso: mapaPiso.mapa, // Deve coincidir com a largura e a profunidade.
      mapaSaidaLocalizacao: mapaPiso.saidaLocalizacao, // Deve estar dentro das medidas.
      mapaElevador: mapaPiso.elevador,
      mapaSaidas: mapaPiso.saidas,
    } as IMapaPisoDTO;
  }

  public static toDomain (mapaEdificio: any | Model<IMapaPisoPersistence & Document> ): MapaPiso {
    return null;
  }

  public static toPersistence (mapaEdificio: MapaPiso): any {
    return null;
  }
}