import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ISalaPersistence } from '../dataschema/ISalaPersistence';

import ISalaDTO from "../dto/ISalaDTO";
import { Sala } from "../domain/sala";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class SalaMap extends Mapper<Sala> {
  
  public static toDTO( sala: Sala): ISalaDTO {
    return {
      id: sala.id.toString(),
      descricao: sala.descricao,
      categoria: sala.categoria.toString(),
      designacao: sala.designacao,
    } as ISalaDTO;
  }

  public static toDomain (sala: any | Model<ISalaPersistence & Document> ): Sala {
    const salaOrError = Sala.create(
        sala,
      new UniqueEntityID(sala.domainId)
    );

    salaOrError.isFailure ? console.log(salaOrError.error) : '';

    return salaOrError.isSuccess ? salaOrError.getValue() : null;
  }

  public static toPersistence (sala: Sala): any {
    return {
      domainId: sala.id.toString(),
      name: sala.designacao
      
    }
  }
}