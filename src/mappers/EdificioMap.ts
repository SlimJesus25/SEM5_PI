import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

import IEdificioDTO from "../dto/IEdificioDTO";
import { Edificio } from "../domain/edificio";
import { Piso } from "../domain/piso";
import Container from "typedi";
import ElevadorRepo from "../repos/elevadorRepo";
import PisoRepo from "../repos/pisoRepo";

import { Result } from "../core/logic/Result";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";



export class EdificioMap extends Mapper<Edificio> {
  
  public static toDTO( edificio: Edificio): IEdificioDTO {

    let pisos: string[] = [];

    // Vai adicionar as designações dos pisos pisos[].
    edificio.pisos.forEach(designacao => pisos.push(designacao.toString()));

    return {
      id: edificio.id.toString(),
      codigoEdificio: edificio.codigo,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensaoMaxima: edificio.dimensaoMaxima,
      elevador: edificio.elevadores.numeroIdentificativo,
      pisos: pisos,
      mapaEdificio: edificio.mapa.id.toString(),
    } as IEdificioDTO;
  }

  public static async toDomain (raw: any): Promise<Edificio> {

    const elevadorRepo = Container.get(ElevadorRepo);
    const pisoRepo = Container.get(PisoRepo);

    let pisoArray : Piso[];

    raw.pisos.forEach(async v => pisoArray.push( await pisoRepo.findByDesignacao(v)));
    const elevador = await elevadorRepo.findByNumeroIdentificativo(raw.elevador);
    
    const edificioOrError = Edificio.create({
      codigoEdificio: raw.codigo,
      nomeOpcionalEdificio: raw.nomeOpcional,
      descricaoEdificio: raw.descricao,
      dimensaoMaximaPiso: raw.dimensaoMaxima,
      elevadores: raw.elevador,
      pisos: pisoArray,
      mapaEdificio: raw.mapa,
    }, new UniqueEntityID(raw.domainId));

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static toPersistence (edificio: Edificio): any {

    let pisoIDList : string[] = [];

    edificio.pisos.forEach(p => pisoIDList.push(p.designacao));

    return {
      domainId: edificio.id.toString(),
      codigo: edificio.codigo,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensao: edificio.dimensaoMaxima,
      elevadores: edificio.elevadores.numeroIdentificativo,
      pisos: pisoIDList,
      mapaEdificio: edificio.mapa.id.toValue()
    }
  }
}