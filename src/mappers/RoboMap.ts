import { Mapper } from "../core/infra/Mapper";

import IRoboDTO from "../dto/IRoboDTO";
import { Robo } from "../domain/robo";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoboMap extends Mapper<Robo> {
  
  public static toDTO( robo: Robo): IRoboDTO {
    return {
      id: robo.id.toString(),
      estado: robo.estado.toString(),
      marca: robo.marca.value,
      codigo: robo.codigo.value,
      numeroSerie: robo.numeroSerie.value,
      nickname: robo.nickname,
      tipoRobo: robo.tipoRobo.designacao
    } as IRoboDTO;
  }

  public static async toDomain (raw: any): Promise<Robo> {
    
    const roboOrError = Robo.create({
        estado: raw.estado,
        marca: raw.marca,
        codigo: raw.codigo,
        numeroSerie: raw.numeroSerie,
        nickname: raw.nickname,
        tipoRobo: raw.tipoRobo
    }, new UniqueEntityID(raw.domainId));

    roboOrError.isFailure ? console.log(roboOrError.error) : '';

    return roboOrError.isSuccess ? roboOrError.getValue() : null;
  }

  public static toPersistence (robo: Robo): any {
    return {
      domainId: robo.id.toString(),
      estado: robo.estado,
      marca: robo.marca,
      codigo: robo.codigo,
      numeroSerie: robo.numeroSerie,
      nickname: robo.nickname,
      tipoRobo: robo.tipoRobo
    }
  }
}