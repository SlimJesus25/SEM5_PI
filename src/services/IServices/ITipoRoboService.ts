import { Result } from "../../core/logic/Result";
import ITipoRoboDTO from "../../dto/ITipoRoboDTO";

export default interface IElevadorService  {
  createTipoRobo(tipoRoboDTO: ITipoRoboDTO): Promise<Result<ITipoRoboDTO>>;
  updateTipoRobo(tipoRoboDTO: ITipoRoboDTO): Promise<Result<ITipoRoboDTO>>;

  getTipoRobo (tipoRoboId: string): Promise<Result<ITipoRoboDTO>>;
}
