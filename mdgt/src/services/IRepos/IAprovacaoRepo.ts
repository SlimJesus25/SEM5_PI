import { Repo } from "../../core/infra/Repo";
import { Aprovacao } from "../../domain/aprovacao";
import { AprovacaoId } from "../../domain/aprovacaoId";

export default interface IAprovacaoRepo extends Repo<Aprovacao> {
  save(aprovacao: Aprovacao): Promise<Aprovacao>;
  findByDomainId (aprovacaoId: AprovacaoId | string): Promise<Aprovacao>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}