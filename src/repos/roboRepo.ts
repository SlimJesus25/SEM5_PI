import { Service, Inject } from 'typedi';

import IRoboRepo from "../services/IRepos/IRoboRepo";
import { Robo } from "../domain/robo";
import { RoboId } from "../domain/roboId";
import { RoboMap } from "../mappers/RoboMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoboPersistence } from '../dataschema/IRoboPersistence';

@Service()
export default class RoboRepo implements IRoboRepo {
  private models: any;
  find: any;

  constructor(
    @Inject('roboSchema') private roboSchema : Model<IRoboPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async save (robo: Robo): Promise<Robo> {
    const query = { domainId: robo.id.toString()}; 

    const roboDocument = await this.roboSchema.findOne( query );

    try {
      if (roboDocument === null ) {
        const rawRobo: any = RoboMap.toPersistence(robo);

        const roboCreated = await this.roboSchema.create(rawRobo);

        return RoboMap.toDomain(roboCreated);
      } else {
        roboDocument.estado = robo.estado,
        roboDocument.marca = robo.marca,
        roboDocument.codigo = robo.codigo,
        roboDocument.numeroSerie = robo.numeroSerie,
        roboDocument.nickname = robo.nickname,
        roboDocument.tipoRobo = robo.tipoRobo,
        await roboDocument.save();

        return robo;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roboId: RoboId | string): Promise<Robo> {
    const query = { domainId: roboId};
    const roboRecord = await this.roboSchema.findOne( query as FilterQuery<IRoboPersistence & Document> );

    if( roboRecord != null) {
      return RoboMap.toDomain(roboRecord);
    }
    else
      return null;
  }
  

  public async findByCodigo(value: string): Promise<Robo> {
      const query = { codigo: value.toString() };
      const roboRecord = await this.roboSchema.findOne(query);

      if(roboRecord != null)
        return RoboMap.toDomain(roboRecord);
      else
        return null;
  }
}