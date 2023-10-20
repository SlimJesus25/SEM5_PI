import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

import IEdificioDTO from "../dto/IEdificioDTO";
import { Edificio } from "../domain/edificio";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Container } from 'typedi';

import PisoRepo from "../repos/pisoRepo";
import ElevadorRepo from "../repos/elevadorRepo";

export class EdificioMap extends Mapper<Edificio> {
  
  public static toDTO( edificio: Edificio): IEdificioDTO {

    let pisos: Array<String>;

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

  // TODO: Verificar forma de converter todas os pisos.
  public static async toDomain (edificio: any | Model<IEdificioPersistence & Document> ): Promise<Piso> {
    
    const repo = Container.get(PisoRepo);

    const pisos = await repo.findByDomainId(edificio.sala);

    const elevador = await repo.findByDomainId(edificio.elevador);
    
    const edificioOrError = Edificio.create({
        codigoEdificio: edificio.codigoEdificio.getValue(),
        nomeOpcionalEdificio: edificio.nomeOpcional,
        descricaoEdificio: edificio.descricao,
        dimensaoMaximaPiso: edificio.dimensaoMaxima,
        elevadores: elevador,
        pisos: edificio.pisos,
        mapaEdificio: edificio.mapa.id.toValue()
    }, new UniqueEntityID(edificio.domainId));

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  // TODO: Verificar forma de persistir array pisos.
  public static toPersistence (edificio: Edificio): any {
    return {
      domainId: edificio.id.toString(),
      codigo: edificio.codigo.value,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensao: edificio.dimensaoMaxima,
      elevadores: edificio.elevadores.id.toValue(),
      pisos: edificio.pisos,
      mapaEdificio: edificio.mapa.id.toValue()
    }
  }
}