import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PassagemId } from "./passagemId";
import { Guard } from "../core/logic/Guard";
import { Edificio } from "./edificio";
import { Piso } from "./piso";

interface PassagemProps {
  designacao: string;
  edificioA: Edificio;
  edificioB: Edificio;
  pisoA: Piso;
  pisoB: Piso;
}

export class Passagem extends AggregateRoot<PassagemProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get passagemId (): PassagemId {
    return PassagemId.caller(this.id)
  }

  get edificioUm (): Edificio {
    return this.props.edificioA;
  }

  get edificioDois (): Edificio {
    return this.props.edificioB
  }

  get pisoUm (): Piso {
    return this.props.pisoA;
  }

  get pisoDois (): Piso {
    return this.props.pisoB;
  }

  get designacao (): string {
    return this.props.designacao;
  }

  set designacao (value : string){
    this.props.designacao = value;
  }

  set edificioUm (value : Edificio) {
    this.props.edificioA = value;
  }
  
  set edificioDois (value : Edificio) {
    this.props.edificioB = value;
  }

  set pisoUm (value : Piso) {
    this.props.pisoA = value;
  }

  set pisoDois (value : Piso) {
    this.props.pisoB = value;
  }

  private constructor (props: PassagemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PassagemProps, id?: UniqueEntityID): Result<Passagem> {

    const guardedProps = [
      { argument: props.designacao, argumentName: 'designacao' },
      { argument: props.edificioA, argumentName: 'edificioA' },
      { argument: props.edificioB, argumentName: 'edificioB' },
      { argument: props.pisoA, argumentName: 'pisoA' },
      { argument: props.pisoB, argumentName: 'pisoB' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passagem>(guardResult.message)
    }     
    else {
      const passagem = new Passagem({
        ...props
      }, id);

      return Result.ok<Passagem>(passagem);
    }
  }
  /*
  // Verificar forma de 
  public static create (passagemDTO: IPassagemDTO, id?: UniqueEntityID): Result<Passagem> {

    try{
      const edificioOrigem = EdificioMap.toDomain(passagemDTO.edificioOrigem) as Result<Edificio>;
      const edificioDestino = await EdificioMap.toDomain(passagemDTO.edificioDestino) as Result<Edificio>;
      const pisoOrigem = PisoMap.toDomain(passagemDTO.pisoOrigem);
      const pisoDestino = PisoMap.toDomain(passagemDTO.pisoDestino);
      
      const passagem = new Passagem({ 
        edificioA: edificioOrigem,
        edificioB: edificioDestino,
        pisoA: pisoOrigem,
        pisoB: pisoDestino
      }, id);
        return Result.ok<Passagem>( passagem)
  }catch(e){
    return Result.fail(e);
  }
    
  }*/
}