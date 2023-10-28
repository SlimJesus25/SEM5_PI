import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PisoId } from "./pisoId";
import { Guard } from "../core/logic/Guard";
import { Edificio } from "./edificio";

interface PisoProps {
  descricao: string;
  designacao: string;
  edificio: Edificio; // código edifício
}

export class Piso extends AggregateRoot<PisoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get pisoId (): PisoId {
    return new PisoId(this.pisoId.toValue());
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get edificio (): Edificio {
    return this.props.edificio;
  }

  get designacao (): string {
    return this.props.designacao;
  }

  set descricao (value : string) {
    this.props.descricao = value;
  }

  set designacao (value : string) {
    this.props.designacao = value;
  }

  set edificio (value : Edificio) {
    this.props.edificio = value;
  }


  private constructor (props: PisoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PisoProps, id?: UniqueEntityID): Result<Piso> {

    const guardedProps = [
      { argument: props.designacao, argumentName: 'designacao' },
      { argument: props.descricao, argumentName: 'descricao' },
      { argument: props.edificio, argumentName: 'edificio' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Piso>(guardResult.message)
    }     
    else {
      const piso = new Piso({
        ...props
      }, id);

      return Result.ok<Piso>(piso);
    }
  }

}
