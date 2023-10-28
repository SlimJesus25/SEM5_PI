import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { SalaId } from "./salaId";
import { CategoriaSala } from "./categoriaSala";
import { Guard } from "../core/logic/Guard";
import { Piso } from "./piso";

interface SalaProps {
  descricaoSala: string;
  categoriaSala: CategoriaSala;
  designacaoSala: string;
  piso: Piso
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
    return Object.values(CategoriaSala)[this.props.categoriaSala.toString()];
  }

  get designacao (): string {
    return this.props.designacaoSala;
  }

  get piso (): Piso {
    return this.props.piso;
  }

  set descricao (value: string){
    this.props.descricaoSala = value;
  }

  set categoria (value: CategoriaSala){
    this.props.categoriaSala = value;
  }

  set designacao (value: string){
    this.props.designacaoSala = value;
  }

  set piso (value: Piso){
    this.props.piso = value;
  }

  private constructor (props: SalaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static categoriaValue(categoriaSala : string) : number{
    if(categoriaSala.toLowerCase() == "anfiteatro")
      return 1;
    else if(categoriaSala.toLowerCase() == "gabinete")
      return 2;
    else
      return 0;

  }

  public static create (props: SalaProps, id?: UniqueEntityID): Result<Sala> {

    const guardedProps = [
      { argument: props.designacaoSala, argumentName: 'designacaoSala' },
      { argument: props.descricaoSala, argumentName: 'descricaoSala' },
      { argument: props.categoriaSala, argumentName: 'categoriaSala' },
      { argument: props.piso, argumentName: 'piso' }
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
