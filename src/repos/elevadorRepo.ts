import { Service, Inject } from 'typedi';

import IElevadorRepo from "../services/IRepos/IElevadorRepo";
import { Elevador } from "../domain/elevador";
import { ElevadorId } from "../domain/elevadorId";
import { ElevadorMap } from "../mappers/ElevadorMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevadorPersistence } from '../dataschema/IElevadorPersistence';

@Service()
export default class ElevadorRepo implements IElevadorRepo {
  private models: any;

  constructor(
    @Inject('elevadorSchema') private elevadorSchema : Model<IElevadorPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: Elevador): Promise<boolean> {
    
    const idX = role.id instanceof ElevadorId ? (<ElevadorId>role.id).toValue() : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.elevadorSchema.findOne( query as FilterQuery<IElevadorPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (elevador: Elevador): Promise<Elevador> {
    const query = { domainId: elevador.id.toString()}; 

    const roleDocument = await this.elevadorSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = ElevadorMap.toPersistence(elevador);

        const roleCreated = await this.elevadorSchema.create(rawRole);

        return ElevadorMap.toDomain(roleCreated);
      } else {
        roleDocument.designacao = elevador.designacao;
        await roleDocument.save();

        return elevador;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: ElevadorId | string): Promise<Elevador> {
    const query = { domainId: roleId};
    const roleRecord = await this.elevadorSchema.findOne( query as FilterQuery<IElevadorPersistence & Document> );

    if( roleRecord != null) {
      return ElevadorMap.toDomain(roleRecord);
    }
    else
      return null;
  }
  

  public async findByCodigo(value: string): Promise<Elevador> {
      const query = { codigo: value.toString() };
      const elevadorRecord = await this.elevadorSchema.findOne(query);

      if(elevadorRecord != null)
        return ElevadorMap.toDomain(elevadorRecord);
      else
        return null;
  }
}