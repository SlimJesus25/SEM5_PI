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



export class EdificioMap extends Mapper<Edificio> {
  
  public static toDTO( edificio: Edificio): IEdificioDTO {

    let pisos: string[] = [];

    edificio.pisos.forEach(id => pisos.push(id.toString()));

    return {
      id: edificio.id.toString(),
      codigoEdificio: edificio.codigo.value,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensaoMaxima: edificio.dimensaoMaxima,
      elevador: edificio.elevadores.id.toString(),
      pisos: pisos,
      mapaEdificio: edificio.mapa.id.toString(),
    } as IEdificioDTO;
  }

  public static async toDomain (edificio: any | Model<IEdificioPersistence & Document> ): Promise<Edificio> {

    const elevadorRepo = Container.get(ElevadorRepo);
    const pisoRepo = Container.get(PisoRepo);
    let pisos : string[];
    //edificio.pisos.forEach(v => pisos.push(pisoRepo.findByDesignacao(v)));
    const elevador = await elevadorRepo.findByDomainId(edificio.elevador);
    
    const edificioOrError = Edificio.create({
      id: edificio.id,
      codigoEdificio: edificio.codigo,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensaoMaxima: edificio.dimensaoMaxima,
      elevador: edificio.elevador,
      pisos: pisos,
      mapaEdificio: edificio.mapa,
    });

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static toPersistence (edificio: Edificio): any {

    let pisoIDList : string[] = [];

    edificio.pisos.forEach(p => pisoIDList.push(p.id.toString()));

    return {
      domainId: edificio.id.toString(),
      codigo: edificio.codigo.value,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensao: edificio.dimensaoMaxima,
      elevadores: edificio.elevadores.id.toValue(),
      pisos: pisoIDList,
      mapaEdificio: edificio.mapa.id.toValue()
    }
  }
}