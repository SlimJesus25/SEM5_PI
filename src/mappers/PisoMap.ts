import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

import IPisoDTO from "../dto/IPisoDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Container } from 'typedi';

import SalaRepo from "../repos/salaRepo";

export class PisoMap extends Mapper<Piso> {
  
  public static toDTO( piso: Piso): IPisoDTO {

    let salas: Array<String>;

    piso.sala.forEach(id => salas.push(id.toString()));

    return {
      id: piso.id.toString(),
      descricao: piso.descricao,
      designacao: piso.designacao,
      sala: salas
    } as IPisoDTO;
  }

  // TODO: Verificar forma de converter todas as salas.
  public static async toDomain (piso: any | Model<IPisoPersistence & Document> ): Promise<Piso> {
    
    const repo = Container.get(SalaRepo);

    const sala = await repo.findByDomainId(piso.sala);
    
    const pisoOrError = Piso.create({
        descricaoPiso: piso.descricao,
        designacaoPiso: piso.designacao,
        sala: sala
    }, new UniqueEntityID(piso.domainId));

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence (piso: Piso): any {
    return {
      domainId: piso.id.toString(),
      descricao: piso.descricao,
      designacao: piso.designacao,
      salas: piso.sala
    }
  }
}