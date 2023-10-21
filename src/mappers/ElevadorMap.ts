import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IElevadorPersistence } from '../dataschema/IElevadorPersistence';

import IElevadorDTO from "../dto/IElevadorDTO";
import { Elevador } from "../domain/elevador";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ElevadorMap extends Mapper<Elevador> {
  
  public static toDTO( elevador: Elevador): IElevadorDTO {
    return {
      id: elevador.id.toString(),
      descricao: elevador.descricao,
      numeroSerie: elevador.numeroSerie,
      modelo: elevador.modelo,
      marca: elevador.marca,
      pisosServidos: elevador.pisosServidos,
      numeroIdentificativo: elevador.numeroIdentificativo
    } as IElevadorDTO;
  }

  public static toDomain (elevador: any | Model<IElevadorPersistence & Document> ): Elevador {
    const elevadorOrError = Elevador.create(elevador, new UniqueEntityID(elevador.domainId));

    elevadorOrError.isFailure ? console.log(elevadorOrError.error) : '';

    return elevadorOrError.isSuccess ? elevadorOrError.getValue() : null;
  }

  public static toPersistence (elevador: Elevador): any {
    return {
      domainId: elevador.id.toString(),
      descricao: elevador.descricao,
      numeroSerie: elevador.numeroSerie,
      modelo: elevador.modelo,
      marca: elevador.marca,
      pisosServidos: elevador.pisosServidos,
      numeroIdentificativo: elevador.numeroIdentificativo
    }
  }
}