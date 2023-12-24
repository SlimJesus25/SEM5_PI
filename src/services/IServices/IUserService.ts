import { Result } from "../../core/logic/Result";
import  ICreatingUserDTO  from "../../dto/ICreatingUserDTO";
import  IUserDTO  from "../../dto/IUserDTO";

export default interface IUserService  {
  criarUser(userDTO: ICreatingUserDTO): Promise<Result<IUserDTO>>;
  criarUtente(userDTO: ICreatingUserDTO): Promise<Result<IUserDTO>>;
  updateUser(userId: string, userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  getAllUsers(): Promise<Result<IUserDTO[]>>;
  getUserById(userId: string): Promise<Result<IUserDTO>>;
  /*SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
*/
}
