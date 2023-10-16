import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { EdificioId } from "./edificioId";
import { CodigoEdificio } from "./codigoEdificio";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";


interface EdificioProps {
  codigoEdificio: CodigoEdificio;
  nomeOpcionalEdificio: string;
  descricaoEdificio: string;
  dimensaoMaximaPiso: number;
  //elevador: Elevador;
  //passagem: Passagem;
  //mapaEdificio: MapaEdificio;
}

export class Edificio extends AggregateRoot<EdificioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get edificioId (): EdificioId {
    return EdificioId.caller(this.id);
  }

  get codigo (): CodigoEdificio {
    return this.props.codigoEdificio;
  }

  get nomeOpcional (): string {
    return this.props.nomeOpcionalEdificio;
  }

  get descricao (): string {
    return this.props.descricaoEdificio;
  }

  get dimensaoMaxima (): number {
    return this.props.dimensaoMaximaPiso;
  }

  private constructor (props: EdificioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: EdificioProps, id?: UniqueEntityID): Result<Edificio> {

    const guardedProps = [
      { argument: props.codigoEdificio, argumentName: 'codigoEdificio' },
      { argument: props.descricaoEdificio, argumentName: 'descricaoEdificio' },
      { argument: props.dimensaoMaximaPiso, argumentName: 'dimensaoMaximaEdificio' },
      { argument: props.nomeOpcionalEdificio, argumentName: 'nomeOpcionalEdificio' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Edificio>(guardResult.message)
    }     
    else {
      const user = new Edificio({
        ...props
      }, id);

      return Result.ok<Edificio>(user);
    }
  }
}