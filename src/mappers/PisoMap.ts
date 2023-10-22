import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

import IPisoDTO from "../dto/IPisoDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Container } from 'typedi';

import SalaRepo from "../repos/salaRepo";

export class PisoMap extends Mapper<Piso> {
  
  public static toDTO(piso: Piso): IPisoDTO {

    let salas: string[] = [];

    piso.sala.forEach(id => salas.push(id.toString()));

    return {
      id: piso.id.toString(),
      designacao: piso.designacao,
      descricao: piso.descricao,
      sala: salas,
    } as IPisoDTO;
  }

  public static toDomain (piso: any | Model<IPisoPersistence & Document> ): Piso {
    const pisoOrError = Piso.create(
      piso,
      new UniqueEntityID(piso.domainId)
    );

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence (piso: Piso): any {

    let salaIDList : string[] = [];

    piso.sala.forEach(p => salaIDList.push(p.id.toString()));

    return {
      descricao: piso.descricao,
      designacao: piso.designacao,
      sala: salaIDList,
    }
  }
}