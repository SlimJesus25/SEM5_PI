import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevadorId } from "./elevadorId";
import { Guard } from "../core/logic/Guard";
import IElevadorDTO from "../dto/IElevadorDTO";

interface ElevadorProps {
  descricao: string;
  numeroSerie: string;
  modelo: string;
  marca: string;
  pisosServidos: string[];
  numeroIdentificativo: number;
}

export class Elevador extends AggregateRoot<ElevadorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get elevadorId (): ElevadorId {
    return new ElevadorId(this.elevadorId.toValue());
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get numeroSerie (): string {
    return this.props.numeroSerie;
  }
  
  get modelo (): string {
    return this.props.modelo;
  }

  get marca (): string {
    return this.props.marca;
  }

  get pisosServidos (): string[] {
    return this.props.pisosServidos;
  }

  get numeroIdentificativo (): number {
    return this.props.numeroIdentificativo;
  }

  set numeroIdentificativo ( value: number) {
    this.props.numeroIdentificativo = value;
  }

  set numeroSerie ( value: string) {
    this.props.numeroSerie = value;
  }

  set modelo ( value: string) {
    this.props.modelo = value;
  }

  set marca ( value: string) {
    this.props.marca = value;
  }

  set pisosServidos ( value: string[]) {
    this.props.pisosServidos = value;
  }

  set descricao ( value: string) {
    this.props.descricao = value;
  }

  private constructor (props: ElevadorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (elevadorDTO: IElevadorDTO, id?: UniqueEntityID): Result<Elevador> {

    const elevador = new Elevador({ 
      descricao: elevadorDTO.descricao,
      numeroIdentificativo: elevadorDTO.numeroIdentificativo,
      modelo: elevadorDTO.modelo,
      marca: elevadorDTO.marca,
      pisosServidos: elevadorDTO.pisosServidos,
      numeroSerie: elevadorDTO.numeroSerie}, id);
    return Result.ok<Elevador>( elevador )
    
  }
}
