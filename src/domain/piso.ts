import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PisoId } from "./pisoId";
import { Sala } from "./sala";
import { Guard } from "../core/logic/Guard";
import IPisoDTO from "../dto/IPisoDTO";
import { SalaMap } from "../mappers/SalaMap";

interface PisoProps {
  descricao: string;
  salas: Sala[];
  designacao: string;
}

export class Piso extends AggregateRoot<PisoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get pisoId (): PisoId {
    return new PisoId(this.pisoId.toValue());
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get salas (): Sala[] {
    return this.props.salas;
  }

  get designacao (): string {
    return this.props.designacao;
  }

  set descricao (value : string) {
    this.props.descricao = value;
  }

  set designacao (value : string) {
    this.props.designacao = value;
  }

  set sala (value : Sala[]) {
    this.props.salas = value;
  }


  private constructor (props: PisoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PisoProps, id?: UniqueEntityID): Result<Piso> {

    const guardedProps = [
      { argument: props.designacao, argumentName: 'designacao' },
      { argument: props.descricao, argumentName: 'descricao' },
      { argument: props.salas, argumentName: 'sala' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Piso>(guardResult.message)
    }     
    else {
      const piso = new Piso({
        ...props
      }, id);

      return Result.ok<Piso>(piso);
    }
  }


  /*
  COMENTADO POR JOAO PARA TESTES DE EDIFICIO
  public static create (pisoDTO: IPisoDTO, id?: UniqueEntityID): Result<Piso> {

    try{
      const descricao = pisoDTO.descricao;
      const designacao = pisoDTO.designacao;
      let salas: Sala[] = [];
      pisoDTO.sala.forEach(v => salas.push(SalaMap.toDomain(v)));

      const piso = new Piso({ 
        descricao: descricao,
        designacao: designacao,
        sala: salas,
      }, id);
        return Result.ok<Piso>( piso )
  }catch(e){
    return Result.fail(e);
  }
    
  }
  */
}
