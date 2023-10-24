import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

import IPisoDTO from "../dto/IPisoDTO";
import { Piso } from "../domain/piso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Container } from 'typedi';

import SalaRepo from "../repos/salaRepo";
import { Sala } from "../domain/sala";

export class PisoMap extends Mapper<Piso> {
  
  public static toDTO(piso: Piso): IPisoDTO {

    let salas: string[] = [];

    piso.salas.forEach(sala => salas.push(sala.designacao));

    return {
      id: piso.id.toString(),
      designacao: piso.designacao,
      descricao: piso.descricao,
      salas: salas,
    } as IPisoDTO;
  }


  public static async toDomain (raw: any): Promise<Piso> {

    const salaRepo = Container.get(SalaRepo);
    
    let salaArray : Sala[];

    raw.salas.forEach(async v => salaArray.push(await salaRepo.findByDesignacao(v)));

    const pisoOrError = Piso.create({
      descricao: raw.descricao,
      designacao: raw.designacao,
      salas: raw.salas
    });

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence (piso: Piso): any {

    let salaDesignacaoList : string[] = [];

    piso.sala.forEach(p => salaDesignacaoList.push(p.designacao));

    return {
      descricao: piso.descricao,
      designacao: piso.designacao,
      sala: salaDesignacaoList,
    }
  }
}