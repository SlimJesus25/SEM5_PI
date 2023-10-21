import { Repo } from "../../core/infra/Repo";
import { MapaEdificio } from "../../domain/mapaEdificio";
import { MapaEdificioId } from "../../domain/mapaEdificioId";

export default interface IMapaEdificioRepo extends Repo<MapaEdificio> {
  save(mapa: MapaEdificio): Promise<MapaEdificio>;
  findByDomainId (mapaId: MapaEdificioId | string): Promise<MapaEdificio>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}