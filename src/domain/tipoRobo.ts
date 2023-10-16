import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TipoRoboId } from "./tipoRoboId";
import { Guard } from "../core/logic/Guard";
import { Tarefa } from "./tarefa"

interface TipoRoboProps {
    tarefas: Array<Tarefa>;
}

export class TipoRobo extends AggregateRoot<TipoRoboProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get tipoRoboId (): TipoRoboId {
    return TipoRoboId.caller(this.id)
  }

  get tarefas (): Array<Tarefa> {
    return this.props.tarefas;
  }

  private constructor (props: TipoRoboProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: TipoRoboProps, id?: UniqueEntityID): Result<TipoRobo> {

    const guardedProps = [
      { argument: props.tarefas, argumentName: 'tarefas' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TipoRobo>(guardResult.message)
    }     
    else {
      const tipoRobo = new TipoRobo({
        ...props
      }, id);

      return Result.ok<TipoRobo>(tipoRobo);
    }
  }
}
