import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { MapaEdificioId } from "./mapaEdificioId";


interface MapaEdificioProps {
  grelha: string[][];
}

export class MapaEdificio extends AggregateRoot<MapaEdificioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get mapaEdificio (): MapaEdificioId {
    return MapaEdificioId.caller(this.id)
  }

  get grelha (): string[][] {
    return this.props.grelha;
  }

  set grelha (value :string[][]){
    this.props.grelha = value;
  }

  private constructor (props: MapaEdificioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: MapaEdificioProps, id?: UniqueEntityID): Result<MapaEdificio> {

    const guardedProps = [
      { argument: props.grelha, argumentName: 'grelha' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<MapaEdificio>(guardResult.message)
    }     
    else {
      const mapaEdificio = new MapaEdificio({
        ...props
      }, id);

      return Result.ok<MapaEdificio>(mapaEdificio);
    }
  }
}