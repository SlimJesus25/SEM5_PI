import { Mapper } from "../core/infra/Mapper";

import ISalaDTO from "../dto/ISalaDTO";
import { Sala } from "../domain/sala";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CategoriaSala } from "../domain/categoriaSala";

export class SalaMap extends Mapper<Sala> {
  
  public static toDTO( sala: Sala): ISalaDTO {
    return {
      id: sala.id.toString(),
      descricao: sala.descricao,
      categoria: sala.categoria.toString(),
      designacao: sala.designacao,
    } as ISalaDTO;
  }

  public static async toDomain (raw: any): Promise<Sala> {

    const index = Object.values(CategoriaSala).find(k => CategoriaSala[k] == raw.categoriaSala) as CategoriaSala;

    const salaOrError = Sala.create({
      descricaoSala: raw.descricaoSala,
      categoriaSala: index,
      designacaoSala: raw.designacaoSala
    }, new UniqueEntityID(raw.domainId));

    salaOrError.isFailure ? console.log(salaOrError.error) : '';

    return salaOrError.isSuccess ? salaOrError.getValue() : null;
  }

  public static toPersistence (sala: Sala): any {
    return {
      domainId: sala.id.toString(),
      descricaoSala: sala.descricao,
      categoriaSala: sala.categoria,
      designacaoSala: sala.designacao
    }
  }
}