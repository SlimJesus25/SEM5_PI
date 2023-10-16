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
      designacao: elevador.designacao,
    } as IElevadorDTO;
  }

  public static toDomain (elevador: any | Model<IElevadorPersistence & Document> ): Elevador {
    const roleOrError = Elevador.create(
        elevador,
      new UniqueEntityID(elevador.domainId)
    );

    roleOrError.isFailure ? console.log(roleOrError.error) : '';

    return roleOrError.isSuccess ? roleOrError.getValue() : null;
  }

  public static toPersistence (elevador: Elevador): any {
    return {
      domainId: elevador.id.toString(),
      designacao: elevador.designacao
    }
  }
}