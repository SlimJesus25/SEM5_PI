import { Mapper } from "../core/infra/Mapper";

import IElevadorDTO from "../dto/IElevadorDTO";
import { Elevador } from "../domain/elevador";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ElevadorMap extends Mapper<Elevador> {
  
  public static toDTO( elevador: Elevador): IElevadorDTO {
    return {
      id: elevador.id.toString(),
      descricao: elevador.descricao,
      numeroSerie: elevador.numeroSerie,
      modelo: elevador.modelo,
      marca: elevador.marca,
      pisosServidos: elevador.pisosServidos,
      numeroIdentificativo: elevador.numeroIdentificativo
    } as IElevadorDTO;
  }

  public static async toDomain (raw: any): Promise<Elevador> {
    
    const elevadorOrError = Elevador.create({
      descricao: raw.descricao,
      numeroIdentificativo: raw.numeroIdentificativo,
      numeroSerie: raw.numeroSerie,
      modelo: raw.modelo,
      marca: raw.marca,
      pisosServidos: raw.pisosServidos,
    }, new UniqueEntityID(raw.domainId));

    elevadorOrError.isFailure ? console.log(elevadorOrError.error) : '';

    return elevadorOrError.isSuccess ? elevadorOrError.getValue() : null;
  }

  public static toPersistence (elevador: Elevador): any {
    return {
      domainId: elevador.id.toString(),
      descricao: elevador.descricao,
      numeroSerie: elevador.numeroSerie,
      modelo: elevador.modelo,
      marca: elevador.marca,
      pisosServidos: elevador.pisosServidos,
      numeroIdentificativo: elevador.numeroIdentificativo
    }
  }
}