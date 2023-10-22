import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';

import IPassagemDTO from "../dto/IPassagemDTO";
import { Passagem } from "../domain/passagem";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PassagemMap extends Mapper<Passagem> {
  
  public static toDTO( passagem: Passagem): IPassagemDTO {
    return {
      id: passagem.id.toString(),
      edificioOrigem: passagem.edificioUm.id.toString(),
      edificioDestino: passagem.edificioDois.id.toString(),
      pisoOrigem: passagem.pisoUm.id.toString(),
      pisoDestino: passagem.pisoDois.id.toString(),
    } as IPassagemDTO;
  }

  public static toDomain (passagem: any | Model<IPassagemPersistence & Document> ): Passagem {
    const passagemOrError = Passagem.create(
      passagem,
      new UniqueEntityID(passagem.domainId)
    );

    passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

    return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
  }

  public static toPersistence (passagem: Passagem): any {
    return {
      domainId: passagem.id.toString(),
      edificioOrigem: passagem.edificioUm.id.toString(),
      edificioDestino: passagem.edificioDois.id.toString(),
      pisoOrigem: passagem.pisoUm.id.toString(),
      pisoDestino: passagem.pisoDois.id.toString(),
    }
  }
}