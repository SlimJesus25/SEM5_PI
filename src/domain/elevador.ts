import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevadorId } from "./elevadorId";
import { Guard } from "../core/logic/Guard";
import IElevadorDTO from "../dto/IElevadorDTO";

interface ElevadorProps {
  designacaoElevador: string;
  codigoElevador: string;
}

export class Elevador extends AggregateRoot<ElevadorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get elevadorId (): ElevadorId {
    return new ElevadorId(this.elevadorId.toValue());
  }

  get designacao (): string {
    return this.props.designacaoElevador;
  }

  get codigo (): string {
    return this.props.codigoElevador;
  }

  set designacao ( value: string) {
    this.props.designacaoElevador = value;
  }

  private constructor (props: ElevadorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (elevadorDTO: IElevadorDTO, id?: UniqueEntityID): Result<Elevador> {
    const name = elevadorDTO.designacao;
    const codigo = elevadorDTO.codigo;

    if (!!name === false || name.length === 0) {
      return Result.fail<Elevador>('Deve providenciar uma designação para o elevador')
    } else {
      const elevador = new Elevador({ 
        designacaoElevador: name,
      codigoElevador:  codigo}, id);
      return Result.ok<Elevador>( elevador )
    }
  }
}
