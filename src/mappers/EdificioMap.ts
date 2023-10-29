import { Mapper } from "../core/infra/Mapper";

import IEdificioDTO from "../dto/IEdificioDTO";
import { Edificio } from "../domain/edificio";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";



export class EdificioMap extends Mapper<Edificio> {
  
  public static toDTO( edificio: Edificio): IEdificioDTO {

    return {
      id: edificio.id.toString(),
      codigoEdificio: edificio.codigo,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensaoMaxima: edificio.dimensaoMaxima,
    } as IEdificioDTO;
  }

  public static async toDomain (raw: any): Promise<Edificio> {
    
    const edificioOrError = Edificio.create({
      codigoEdificio: raw.codigo,
      nomeOpcionalEdificio: raw.nomeOpcional,
      descricaoEdificio: raw.descricao,
      dimensaoMaximaPiso: raw.dimensaoMaxima,
    }, new UniqueEntityID(raw.domainId));

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static toPersistence (edificio: Edificio): any {

    return {
      domainId: edificio.id.toString(),
      codigo: edificio.codigo,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensao: edificio.dimensaoMaxima,
    }
  }
}