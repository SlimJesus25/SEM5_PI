import { Result } from "../../core/logic/Result";
import IElevadorDTO from "../../dto/IElevadorDTO";

export default interface IElevadorService  {
  createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>>;
  updateElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>>;

  getElevador (elevadorId: string): Promise<Result<IElevadorDTO>>;
}
