import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PassagemId } from "./passagemId";
import { Guard } from "../core/logic/Guard";
import { Edificio } from "./edificio";
import { Piso } from "./piso";


interface PassagemProps {
  edificioA: Edificio;
  edificioB: Edificio;
  pisoA: Piso;
  pisoB: Piso;
}

export class Passagem extends AggregateRoot<PassagemProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get passagemId (): PassagemId {
    return PassagemId.caller(this.id)
  }

  get edificioUm (): Edificio {
    return this.props.edificioA;
  }

  get edificioDois (): Edificio {
    return this.props.edificioB
  }

  get pisoUm (): Piso {
    return this.props.pisoA;
  }

  get pisoDois (): Piso {
    return this.props.pisoB;
  }

  private constructor (props: PassagemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PassagemProps, id?: UniqueEntityID): Result<Passagem> {

    const guardedProps = [
      { argument: props.edificioA, argumentName: 'edificioA' },
      { argument: props.edificioB, argumentName: 'edificioB' },
      { argument: props.pisoA, argumentName: 'pisoA' },
      { argument: props.pisoB, argumentName: 'pisoB' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passagem>(guardResult.message)
    }     
    else {
      const passagem = new Passagem({
        ...props
      }, id);

      return Result.ok<Passagem>(passagem);
    }
  }
}