import { Result } from "../../core/logic/Result";
import IPassagemDTO from "../../dto/IPassagemDTO";
import IPisoDTO from "../../dto/IPisoDTO";

export default interface IPassagemService  {
  createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
  updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
  listPassagens(edificios): Promise<Result<IPassagemDTO[]>>; // codigoEdificioA: string, codigoEdificioB: string
  listPisos(edificio): Promise<Result<IPisoDTO[]>>;
  getPassagem (passagemId: string): Promise<Result<IPassagemDTO>>;
}
