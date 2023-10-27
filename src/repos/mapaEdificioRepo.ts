import { Service, Inject } from 'typedi';

import IMapaEdificioRepo from "../services/IRepos/IMapaEdificioRepo";
import { MapaEdificio } from "../domain/mapaEdificio";
import { MapaEdificioId } from "../domain/mapaEdificioId";
import { MapaEdificioMap } from "../mappers/MapaEdificioMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IMapaEdificioPersistence } from '../dataschema/IMapaEdificioPersistence';

@Service()
export default class MapaEdificioRepo implements IMapaEdificioRepo {
  private models: any;

  constructor(
    @Inject('mapaEdificioSchema') private mapaEdificioSchema : Model<IMapaEdificioPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: MapaEdificio): Promise<boolean> {
    
    const idX = role.id instanceof MapaEdificioId ? (<MapaEdificioId>role.id) : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.mapaEdificioSchema.findOne( query as FilterQuery<IMapaEdificioPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (elevador: MapaEdificio): Promise<MapaEdificio> {
    const query = { domainId: elevador.id.toString()}; 

    const roleDocument = await this.mapaEdificioSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = MapaEdificioMap.toPersistence(elevador);

        const roleCreated = await this.mapaEdificioSchema.create(rawRole);

        return MapaEdificioMap.toDomain(roleCreated);
      } else {
        roleDocument.grelha = elevador.grelha;
        await roleDocument.save();

        return elevador;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: MapaEdificioId | string): Promise<MapaEdificio> {
    const query = { domainId: roleId};
    const roleRecord = await this.mapaEdificioSchema.findOne( query as FilterQuery<IMapaEdificioPersistence & Document> );

    if( roleRecord != null) {
      return MapaEdificioMap.toDomain(roleRecord);
    }
    else
      return null;
  }
  

  public async findByNumeroIdentificativo(value: number): Promise<MapaEdificio> {
      const query = { codigo: value.toString() };
      const elevadorRecord = await this.mapaEdificioSchema.findOne(query as FilterQuery<IMapaEdificioPersistence & Document>);

      if(elevadorRecord != null)
        return MapaEdificioMap.toDomain(elevadorRecord);
      else
        return null;
  }
}