import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";
import IListElevadoresDTO from "../../dto/IListElevadoresDTO";
import IElevadorDTO from "../../dto/IElevadorDTO";
import IListPisosDTO from "../../dto/IListPisosDTO";
import IPisoDTO from "../../dto/IPisoDTO";


export default interface IEdificioService  {
  createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  listElevadores(codigoEdificio: IListElevadoresDTO): Promise<Result<IElevadorDTO[]>>;
  listEdificios(): Promise<Result<IEdificioDTO[]>>;
  getEdificio (edificioId: string): Promise<Result<IEdificioDTO>>;
  listPisos(codigoEdificio: IListPisosDTO): Promise<Result<IPisoDTO[]>>;
}