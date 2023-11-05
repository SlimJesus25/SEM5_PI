import { Service, Inject } from 'typedi';

import IMapaPisoRepo from "../services/IRepos/IMapaPisoRepo";
import { MapaPiso } from "../domain/mapaPiso";
import { MapaPisoId } from "../domain/mapaPisoId";
import { MapaPisoMap } from "../mappers/MapaPisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IMapaPisoPersistence } from '../dataschema/IMapaPisoPersistence';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

@Service()
export default class MapaPisoRepo implements IMapaPisoRepo {
  private models: any;

  constructor(
    @Inject('mapaPisoSchema') private mapaPisoSchema : Model<IMapaPisoPersistence & Document>,
    @Inject ("pisoSchema") private pisoSchema : Model<IPisoPersistence & Document>
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

  public async save (mapaPiso: MapaPiso): Promise<MapaPiso> {
    const query = { domainId: mapaPiso.id.toString()}; 

    const roleDocument = await this.mapaPisoSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = null; //mapaPisoSchema.toPersistence(elevador);

        const roleCreated = await this.mapaPisoSchema.create(rawRole);

        return MapaPisoMap.toDomain(roleCreated);
      } else {
        roleDocument.mapa = null;//elevador.grelha;
        await roleDocument.save();

        return mapaPiso;
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

  public async findByPiso (designacao : string) : Promise<MapaPiso>{
    const query = { piso : designacao};
    const roleRecord = await this.mapaPisoSchema.findOne (query as FilterQuery<IMapaPisoPersistence & Document>);

    if (roleRecord != null) {
      let result = await MapaPisoMap.toDomain(roleRecord)
      return result;
    }
    else
      return null;
  }
}