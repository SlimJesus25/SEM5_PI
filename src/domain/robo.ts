import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";
import { NumeroSerieRobo } from "./numeroSerieRobo";
import { CodigoRobo } from "./codigoRobo";
import { MarcaRobo } from "./marcaRobo";
import { RoboId } from "./roboId";
import { EstadoRobo } from "./estadoRobo";


interface RoboProps {
  estado: EstadoRobo;
  marca: MarcaRobo;
  codigo: CodigoRobo;
  numeroSerie: NumeroSerieRobo;
  nickname: string;
}

export class Robo extends AggregateRoot<RoboProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roboId (): RoboId {
    return RoboId.caller(this.id)
  }

  get estado (): EstadoRobo {
    return this.props.estado;
  }

  get marca (): MarcaRobo {
    return this.props.marca;
  }

  get codigo (): CodigoRobo {
    return this.props.codigo;
  }

  get numeroSerie (): NumeroSerieRobo {
    return this.props.numeroSerie;
  }

  get nickname (): string {
    return this.props.nickname;
  }

  private constructor (props: RoboProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RoboProps, id?: UniqueEntityID): Result<Robo> {

    const guardedProps = [
      { argument: props.estado, argumentName: 'estado' },
      { argument: props.marca, argumentName: 'marca' },
      { argument: props.codigo, argumentName: 'codigo' },
      { argument: props.numeroSerie, argumentName: 'numeroSerie' },
      { argument: props.nickname, argumentName: 'nickname' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Robo>(guardResult.message)
    }     
    else {
      const user = new Robo({
        ...props
      }, id);

      return Result.ok<Robo>(user);
    }
  }
}