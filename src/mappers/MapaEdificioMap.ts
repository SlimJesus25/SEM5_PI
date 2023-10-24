import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IMapaEdificioPersistence } from '../dataschema/IMapaEdificioPersistence';

import IMapaEdificioDTO from "../dto/IMapaEdificioDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Container } from 'typedi';

import { MapaEdificio } from "../domain/mapaEdificio";

export class MapaEdificioMap extends Mapper<MapaEdificio> {
  
  public static toDTO(mapaEdificio: MapaEdificio): IMapaEdificioDTO {



    return {
      id: mapaEdificio.id.toString(),
      grelha: mapaEdificio.grelha,
    } as IMapaEdificioDTO;
  }

  public static toDomain (mapaEdificio: any | Model<IMapaEdificioPersistence & Document> ): MapaEdificio {
    const mapaEdificioOrError = MapaEdificio.create(
      mapaEdificio,
      new UniqueEntityID(mapaEdificio.domainId)
    );

    mapaEdificioOrError.isFailure ? console.log(mapaEdificioOrError.error) : '';

    return mapaEdificioOrError.isSuccess ? mapaEdificioOrError.getValue() : null;
  }

  public static toPersistence (mapaEdificio: MapaEdificio): any {

    return {
      id: mapaEdificio.id,
      grelha: mapaEdificio.grelha
    }
  }
}