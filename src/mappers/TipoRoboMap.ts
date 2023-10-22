import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITipoRoboPersistence } from '../dataschema/ITipoRoboPersistence';

import ITipoRoboDTO from "../dto/ITipoRoboDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TipoRobo } from "../domain/tipoRobo";

// TODO implementar os métodos.
export class TipoRoboMap extends Mapper<TipoRobo> {
  
  public static toDTO( elevador: TipoRobo): ITipoRoboDTO {
    return {

    } as ITipoRoboDTO;
  }

  public static toDomain (elevador: any | Model<ITipoRoboPersistence & Document> ): TipoRobo {
    return null;
  }

  public static toPersistence (elevador: TipoRobo): any {
    return {

    }
  }
}