import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { EdificioId } from "./edificioId";
import { CodigoEdificio } from "./codigoEdificio";
import { Guard } from "../core/logic/Guard";
import { Elevador } from "./elevador";
import { Piso } from "./piso";
import { MapaEdificio } from "./mapaEdificio"

interface EdificioProps {
  codigoEdificio: CodigoEdificio;
  nomeOpcionalEdificio: string;
  descricaoEdificio: string;
  dimensaoMaximaPiso: number;
  elevadores: Elevador;
  pisos: Array<Piso>
  mapaEdificio: MapaEdificio;
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

  get elevadores (): Elevador {
    return this.props.elevadores;
  }

  get pisos (): Array<Piso> {
    return this.props.pisos;
  }

  get mapa (): MapaEdificio {
    return this.props.mapaEdificio;
  }


  private constructor (props: EdificioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: EdificioProps, id?: UniqueEntityID): Result<Edificio> {

    const guardedProps = [
      { argument: props.codigoEdificio, argumentName: 'codigoEdificio' },
      { argument: props.descricaoEdificio, argumentName: 'descricaoEdificio' },
      { argument: props.dimensaoMaximaPiso, argumentName: 'dimensaoMaximaEdificio' },
      { argument: props.nomeOpcionalEdificio, argumentName: 'nomeOpcionalEdificio' },
      { argument: props.elevadores, argumentName: 'elevadores' },
      { argument: props.pisos, argumentName: 'pisos' },
      { argument: props.mapaEdificio, argumentName: 'mapaEdificio' }
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