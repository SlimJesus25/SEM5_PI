import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";
import IListElevadoresDTO from "../../dto/IListElevadoresDTO";
import IElevadorDTO from "../../dto/IElevadorDTO";


export default interface IEdificioService  {
  createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  listElevadores(codigoEdificio: IListElevadoresDTO): Promise<Result<IElevadorDTO[]>>;

  getEdificio (edificioId: string): Promise<Result<IEdificioDTO>>;
}