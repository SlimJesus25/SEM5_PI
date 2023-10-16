import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { SalaId } from "./salaId";
import { CategoriaSala } from "./categoriaSala";
import { Guard } from "../core/logic/Guard";
import ISalaDTO from "../dto/ISalaDTO";

interface SalaProps {
  descricaoSala: string;
  categoriaSala: CategoriaSala;
  designacaoSala: string;
}

export class Sala extends AggregateRoot<SalaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get salaId (): SalaId {
    return new SalaId(this.salaId.toValue());
  }

  get descricao (): string {
    return this.props.descricaoSala;
  }

  get categoria (): CategoriaSala {
    return this.props.categoriaSala;
  }

  get designacao (): string {
    return this.props.designacaoSala;
  }


  private constructor (props: SalaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: SalaProps, id?: UniqueEntityID): Result<Sala> {

    const guardedProps = [
      { argument: props.designacaoSala, argumentName: 'designacaoSala' },
      { argument: props.descricaoSala, argumentName: 'descricaoSala' },
      { argument: props.categoriaSala, argumentName: 'categoriaSala' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Sala>(guardResult.message)
    }     
    else {
      const sala = new Sala({
        ...props
      }, id);

      return Result.ok<Sala>(sala);
    }
  }
}
