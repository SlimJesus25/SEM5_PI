
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface EstadoRoboProps {
  value: string;
}

enum Estados {
    inibido,
    desinibido,
}

export class EstadoRobo extends ValueObject<EstadoRoboProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: EstadoRoboProps) {
    super(props);
  }

  public static create (estado: string): Result<EstadoRobo> {
    const guardResult = Guard.againstNullOrUndefined(estado, 'estado');
    if (!guardResult.succeeded) {
      return Result.fail<EstadoRobo>(guardResult.message);
    } else {
      return Result.ok<EstadoRobo>(new EstadoRobo({ value: estado }))
    }
  }
}