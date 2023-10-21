import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { NumeroSerieRobo } from "./numeroSerieRobo";
import { CodigoRobo } from "./codigoRobo";
import { MarcaRobo } from "./marcaRobo";
import { RoboId } from "./roboId";
import { EstadoRobo } from "./estadoRobo";
import { TipoRobo } from "./tipoRobo";
import IRoboDTO from "../dto/IRoboDTO";

interface RoboProps {
  estado: EstadoRobo;
  marca: MarcaRobo;
  codigo: CodigoRobo;
  numeroSerie: NumeroSerieRobo;
  nickname: string;
  tipoRobo: TipoRobo;
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

  get tipoRobo(): TipoRobo {
    return this.props.tipoRobo;
  }

  public inibir(){
    this.props.estado = EstadoRobo.inibido;
  }

  public desinibir(){
    this.props.estado = EstadoRobo.desinibido;
  }

  set nickname(value:string){
    this.props.nickname = value;
  }

  set numeroSerie(value:NumeroSerieRobo){
    this.props.numeroSerie = value;
  }

  set codigo(value:CodigoRobo){
    this.props.codigo = value;
  }

  set marca(value:MarcaRobo){
    this.props.marca = value;
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
      { argument: props.nickname, argumentName: 'nickname' },
      { argument: props.tipoRobo, argumentName: 'tipoRobo' }
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

  /*
  estado: EstadoRobo;
  marca: MarcaRobo;
  codigo: CodigoRobo;
  numeroSerie: NumeroSerieRobo;
  nickname: string;
  tipoRobo: TipoRobo;
  */

  /*public static create (roboDTO: IRoboDTO, id?: UniqueEntityID): Result<Robo> {

    const estado = EstadoRobo.inibido;
    const marca = MarcaRobo.create(roboDTO.marca);
    const codigo = CodigoRobo.create(roboDTO.codigo);
    const numeroSerie = NumeroSerieRobo.create(roboDTO.numeroSerie);
    const nickname = roboDTO.nickname;
    const tipoRobo = 

    if (!!descricao === false || descricao.length === 0) {
      return Result.fail<Sala>('Must provide sala s description')
    }else if(!!designacao === false || designacao.length === 0){
      return Result.fail<Sala>('Must provide sala s designation')
    } else {
      const sala = new Sala({ descricaoSala: descricao,
         categoriaSala: categoria,
          designacaoSala: designacao}, id);
      return Result.ok<Sala>( sala )
    }
  }*/

  private static getCategoriaValue(categoriaSala : string) : number{
    if(categoriaSala.toLowerCase() == "anfiteatro")
      return 1;
    else if(categoriaSala.toLowerCase() == "gabinete")
      return 2;
    else
      return 0;

  }
}