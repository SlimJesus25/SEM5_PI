import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { MapaPisoId } from "./mapaPisoId";
import { Piso } from "./piso";


interface MapaPisoProps {
  piso: Piso;
  mapaLargura: number;
  mapaProfundidade: number;
  mapaPiso: number[][]; // Deve coincidir com a largura e a profunidade.
  mapaSaidaLocalizacao: number[]; // Deve estar dentro das medidas.
  mapaElevador: number[];
  mapaSaidas: number[][];
}

export class MapaPiso extends AggregateRoot<MapaPisoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get mapaPiso (): MapaPisoId {
    return MapaPisoId.caller(this.id)
  }

  get piso (): Piso {
    return this.props.piso;
  }

  get largura (): number {
    return this.props.mapaLargura;
  }

  get profundidade (): number {
    return this.props.mapaProfundidade;
  }

  get mapa (): number[][] {
    return this.props.mapaPiso;
  }

  get elevador (): number[] {
    return this.props.mapaElevador;
  }

  get saidaLocalizacao (): number[] {
    return this.props.mapaSaidaLocalizacao;
  }

  get saidas (): number[][] {
    return this.props.mapaSaidas;
  }

  set profundidade (value : number){
    this.props.mapaProfundidade = value;
  }

  set mapa (value : number[][]){
    this.props.mapaPiso = value;
  }

  set piso (value : Piso){
    this.props.piso = value;
  }

  set largura (value : number){
    this.props.mapaLargura = value;
  }

  set saidaLocalizacao (value : number[]){
    this.props.mapaSaidaLocalizacao = value;
  }

  set elevador (value : number[]){
    this.props.mapaElevador = value;
  }

  set saidas (value : number[][]){
    this.props.mapaSaidas = value;
  }

  private constructor (props: MapaPisoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: MapaPisoProps, id?: UniqueEntityID): Result<MapaPiso> {

    const guardedProps = [
      { argument: props.mapaProfundidade, argumentName: 'mapaProfundidade' },
      { argument: props.mapaLargura, argumentName: 'mapaLargura' },
      { argument: props.mapaPiso, argumentName: 'mapaPiso' },
      { argument: props.mapaSaidaLocalizacao, argumentName: 'mapaSaidaLocalizacao' },
      { argument: props.mapaElevador, argumentName: 'mapaElevador' },
      { argument: props.mapaSaidas, argumentName: 'mapaSaidas' }
    ];

    if(props.mapaLargura <= 0 || props.mapaProfundidade <= 0)
      return Result.fail<MapaPiso>("A largura e a profundidade devem ser superiores a 0.");

    if(props.mapaProfundidade != props.mapaPiso.length || props.mapaLargura != props.mapaPiso[0].length)
      return Result.fail<MapaPiso>("A largura e a profundidade devem ser coincidentes com o mapa.");
    
    // Fazer verificações para as restantes restrições...
    
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<MapaPiso>(guardResult.message)
    }     
    else {
      const mapaPiso = new MapaPiso({
        ...props
      }, id);

      return Result.ok<MapaPiso>(mapaPiso);
    }
  }
}