import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { EdificioId } from "./edificioId";
import { CodigoEdificio } from "./codigoEdificio";
import { Guard } from "../core/logic/Guard";
import { Elevador } from "./elevador";
import { Piso } from "./piso";
import { MapaEdificio } from "./mapaEdificio"
import IEdificioDTO from "../dto/IEdificioDTO";
import { PisoMap } from "../mappers/PisoMap";
import { ElevadorMap } from "../mappers/ElevadorMap";
import { MapaEdificioMap } from "../mappers/MapaEdificioMap";

interface EdificioProps {
  codigoEdificio: CodigoEdificio;
  nomeOpcionalEdificio: string;
  descricaoEdificio: string;
  dimensaoMaximaPiso: number;
  elevadores: Elevador;
  pisos: Piso[];
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

  get pisos (): Piso[] {
    return this.props.pisos;
  }

  get mapa (): MapaEdificio {
    return this.props.mapaEdificio;
  }

  set codigo (value : CodigoEdificio) {
    this.props.codigoEdificio = value;
  }

  set nomeOpcional (value : string) {
    this.props.nomeOpcionalEdificio = value;
  }

  set descricao (value : string) {
    this.props.descricaoEdificio = value;
  }

  set dimensaoMaxima (value : number) {
    this.props.dimensaoMaximaPiso = value;
  }

  set elevadores (value : Elevador) {
    this.props.elevadores = value;
  }

  set pisos (value : Piso[]) {
    this.props.pisos = value;
  }

  set mapa (value : MapaEdificio) {
    this.props.mapaEdificio = value;
  }

  private constructor (props: EdificioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  
  /*
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
      const edificio = new Edificio({
        ...props
      }, id);

      return Result.ok<Edificio>(edificio);
    }
  }*/
  
  
  public static create (edificioDTO: IEdificioDTO, id?: UniqueEntityID): Result<Edificio> {

    try{
      const codigoOrError = CodigoEdificio.create(edificioDTO.codigoEdificio).getValue();
      const nomeOpcional = edificioDTO.nomeOpcional;
      const descricao = edificioDTO.descricao;
      const dimensaoMaxima = edificioDTO.dimensaoMaxima;
      const elevador = ElevadorMap.toDomain(edificioDTO.elevador);
      let pisos: Piso[] = [];
      edificioDTO.pisos.forEach(v => pisos.push(PisoMap.toDomain(v)));
      const mapaEdificio = MapaEdificioMap.toDomain(edificioDTO.mapaEdificio);

      const edificio = new Edificio({ 
        codigoEdificio: codigoOrError,
        nomeOpcionalEdificio: nomeOpcional,
        descricaoEdificio: descricao,
        dimensaoMaximaPiso: dimensaoMaxima,
        elevadores: elevador,
        pisos: pisos,
        mapaEdificio: mapaEdificio
      }, id);
        return Result.ok<Edificio>( edificio )
  }catch(e){
    return Result.fail(e);
  }
    
  }
}