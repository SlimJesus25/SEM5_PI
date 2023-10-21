import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";

export default interface IEdificioService  {
  createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  listElevadores(edificioDTO: IEdificioDTO): Promise<Result<Array<IEdificioDTO>>>;
  listPassagens(edificioDTO: IEdificioDTO): Promise<Result<Array<IEdificioDTO>>>;

  getEdificio (edificioId: string): Promise<Result<IEdificioDTO>>;
}