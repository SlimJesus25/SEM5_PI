import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PisoId } from "./pisoId";
import { Sala } from "./sala";
import { Guard } from "../core/logic/Guard";
import ISalaDTO from "../dto/ISalaDTO";

interface PisoProps {
  descricaoPiso: string;
  sala: Sala;
  designacaoPiso: string;
}

export class Piso extends AggregateRoot<PisoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get pisoId (): PisoId {
    return new PisoId(this.pisoId.toValue());
  }

  get descricao (): string {
    return this.props.descricaoPiso;
  }

  get sala (): Sala {
    return this.props.sala;
  }

  get designacao (): string {
    return this.props.descricaoPiso;
  }


  private constructor (props: PisoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PisoProps, id?: UniqueEntityID): Result<Piso> {

    const guardedProps = [
      { argument: props.designacaoPiso, argumentName: 'designacaoPiso' },
      { argument: props.descricaoPiso, argumentName: 'descricaoPiso' },
      { argument: props.sala, argumentName: 'sala' }
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
