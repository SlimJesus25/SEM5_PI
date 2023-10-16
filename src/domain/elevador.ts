import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevadorId } from "./elevadorId";
import { Guard } from "../core/logic/Guard";
import IEdificioDTO from "../dto/IEdificioDTO";

interface ElevadorProps {
  designacaoElevador: string;
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


  private constructor (props: ElevadorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ElevadorProps, id?: UniqueEntityID): Result<Elevador> {

    const guardedProps = [
      { argument: props.designacaoElevador, argumentName: 'designacaoEdificio' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevador>(guardResult.message)
    }     
    else {
      const elevador = new Elevador({
        ...props
      }, id);

      return Result.ok<Elevador>(elevador);
    }
  }
}
