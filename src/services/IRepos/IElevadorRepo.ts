import { Repo } from "../../core/infra/Repo";
import { Elevador } from "../../domain/elevador";
import { ElevadorId } from "../../domain/elevadorId";

export default interface IRoleRepo extends Repo<Elevador> {
  save(role: Elevador): Promise<Elevador>;
  findByDomainId (roleId: ElevadorId | string): Promise<Elevador>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}