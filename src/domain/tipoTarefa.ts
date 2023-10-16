
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TipoTarefaProps {
  value: string;
}

enum Tarefas {
    vigilancia,
    transporte,
}

export class TipoTarefa extends ValueObject<TipoTarefaProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: TipoTarefaProps) {
    super(props);
  }

  public static create (tarefa: string): Result<TipoTarefa> {
    const guardResult = Guard.againstNullOrUndefined(tarefa, 'tarefa');
    if (!guardResult.succeeded) {
      return Result.fail<TipoTarefa>(guardResult.message);
    } else {
      return Result.ok<TipoTarefa>(new TipoTarefa({ value: tarefa }))
    }
  }
}