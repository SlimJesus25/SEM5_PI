import { Service, Inject } from 'typedi';

import IMapaPisoRepo from "../services/IRepos/IMapaPisoRepo";
import { MapaPiso } from "../domain/mapaPiso";
import { MapaPisoId } from "../domain/mapaPisoId";
import { MapaPisoMap } from "../mappers/MapaPisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IMapaPisoPersistence } from '../dataschema/IMapaPisoPersistence';

@Service()
export default class MapaPisoRepo implements IMapaPisoRepo {
  private models: any;

  constructor(
    @Inject('mapaPisoSchema') private mapaPisoSchema : Model<IMapaPisoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: MapaPiso): Promise<boolean> {
    
    const idX = role.id instanceof MapaPisoId ? (<MapaPisoId>role.id) : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.mapaPisoSchema.findOne( query as FilterQuery<IMapaPisoPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (elevador: MapaPiso): Promise<MapaPiso> {
    const query = { domainId: elevador.id.toString()}; 

    const roleDocument = await this.mapaPisoSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = null; //mapaPisoSchema.toPersistence(elevador);

        const roleCreated = await this.mapaPisoSchema.create(rawRole);

        return MapaPisoMap.toDomain(roleCreated);
      } else {
        roleDocument.grelha = null;//elevador.grelha;
        await roleDocument.save();

        return elevador;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: MapaPisoId | string): Promise<MapaPiso> {
    const query = { domainId: roleId};
    const roleRecord = await this.mapaPisoSchema.findOne( query as FilterQuery<IMapaPisoPersistence & Document> );

    if( roleRecord != null) {
      return MapaPisoMap.toDomain(roleRecord);
    }
    else
      return null;
  }

}