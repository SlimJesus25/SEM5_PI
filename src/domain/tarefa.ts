import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TarefaId } from "./tarefaId";
import { Guard } from "../core/logic/Guard";
import { TipoTarefa } from "./tipoTarefa";

interface TarefaProps {
  tipoTarefa: TipoTarefa;
}

export class Tarefa extends AggregateRoot<TarefaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): TarefaId {
    return TarefaId.caller(this.id)
  }

  get tipo (): TipoTarefa {
    return this.props.tipoTarefa;
  }

  private constructor (props: TarefaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: TarefaProps, id?: UniqueEntityID): Result<Tarefa> {

    const guardedProps = [
      { argument: props.tipoTarefa, argumentName: 'tipoTarefa' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Tarefa>(guardResult.message)
    }     
    else {
      const tarefa = new Tarefa({
        ...props
      }, id);

      return Result.ok<Tarefa>(tarefa);
    }
  }
}
