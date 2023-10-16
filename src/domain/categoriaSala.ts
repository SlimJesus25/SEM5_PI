
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CategoriaSalaProps {
  value: string;
}

enum Categorias {
    laboratorio,
    anfiteatro,
    gabinete,
}

export class CategoriaSala extends ValueObject<CategoriaSalaProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: CategoriaSalaProps) {
    super(props);
  }

  public static create (categoria: string): Result<CategoriaSala> {
    const guardResult = Guard.againstNullOrUndefined(categoria, 'categoria');
    if (!guardResult.succeeded) {
      return Result.fail<CategoriaSala>(guardResult.message);
    } else {
      return Result.ok<CategoriaSala>(new CategoriaSala({ value: categoria }))
    }
  }
}