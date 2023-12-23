import { Result } from "../../core/logic/Result";
import  ICreatingUserDTO  from "../../dto/ICreatingUserDTO";
import  IUserDTO  from "../../dto/IUserDTO";

export default interface IUserService  {
  criarUser(roleDTO: ICreatingUserDTO): Promise<Result<IUserDTO>>;
  criarUtente(roleDTO: ICreatingUserDTO): Promise<Result<IUserDTO>>;
  /*SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
*/
}
