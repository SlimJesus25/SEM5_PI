import { Result } from "../../core/logic/Result";
import IRoboDTO from "../../dto/IRoboDTO";

export default interface IRoboService  {
  createRobo(roboDTO: IRoboDTO): Promise<Result<IRoboDTO>>;
  listRobos(): Promise<Result<IRoboDTO[]>>;
  updateRobo(roboDTO: IRoboDTO) : Promise<Result<IRoboDTO>>; //joao: nao sei de quem era isto, mas estava em falta, entao adicionei
  inhibitRobo(roboDTO: IRoboDTO): Promise<Result<IRoboDTO>>;
}
