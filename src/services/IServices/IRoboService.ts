import { Result } from "../../core/logic/Result";
import IRoboDTO from "../../dto/IRoboDTO";

export default interface IRoboService  {
  createRobo(roboDTO: IRoboDTO): Promise<Result<IRoboDTO>>;
  listRobos(): Promise<Result<IRoboDTO[]>>;
}
