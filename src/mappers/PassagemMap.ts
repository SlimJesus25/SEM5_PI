import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';

import IPassagemDTO from "../dto/IPassagemDTO";
import { Passagem } from "../domain/passagem";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PassagemMap extends Mapper<Passagem> {
  
  public static toDTO( passagem: Passagem): IPassagemDTO {
    return null;
  }

  public static toDomain (passagem: any | Model<IPassagemPersistence & Document> ): Passagem {
    return null;
  }

  public static toPersistence (passagem: Passagem): any {

  }
}