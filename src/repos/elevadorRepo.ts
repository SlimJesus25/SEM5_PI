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
    @Inject('elevadorSchema') private roleSchema : Model<IElevadorPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: Elevador): Promise<boolean> {
    
    const idX = role.id instanceof ElevadorId ? (<ElevadorId>role.id).toValue() : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.roleSchema.findOne( query as FilterQuery<IElevadorPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (elevador: Elevador): Promise<Elevador> {
    const query = { domainId: elevador.id.toString()}; 

    const roleDocument = await this.roleSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = ElevadorMap.toPersistence(elevador);

        const roleCreated = await this.roleSchema.create(rawRole);

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
    const roleRecord = await this.roleSchema.findOne( query as FilterQuery<IElevadorPersistence & Document> );

    if( roleRecord != null) {
      return ElevadorMap.toDomain(roleRecord);
    }
    else
      return null;
  }
}