import { Result } from "../../core/logic/Result";
import IPisoDTO from "../../dto/IPisoDTO";
import IListPisosDTO from "../../dto/IListPisosDTO"
import IListMinMaxDTO from "../../dto/IListMinMaxDTO";
import IEdificioDTO from "../../dto/IEdificioDTO";

export default interface IPisoService  {
  createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
  updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
  getPiso( pisoId: string): Promise<Result<IPisoDTO>>;
  listPisoPassagem(edificioDTO: IPisoDTO): Promise<Result<Array<IPisoDTO>>>;
  listPisos(codigoEdificio: IListPisosDTO): Promise<Result<IPisoDTO[]>>;
  listMinMax(minMax: IListMinMaxDTO): Promise<Result<IEdificioDTO[]>>;
}