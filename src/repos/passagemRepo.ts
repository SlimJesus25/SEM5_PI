import { Service, Inject } from 'typedi';

import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import { Passagem } from "../domain/passagem";
import { PassagemId } from "../domain/passagemId";
import { PassagemMap } from "../mappers/PassagemMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';

@Service()
export default class PassagemRepo implements IPassagemRepo {
  private models: any;

  constructor(
    @Inject('passagemSchema') private passagemSchema : Model<IPassagemPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(passagem: Passagem): Promise<boolean> {
    
    return null;
  }

  public async save (passagem: Passagem): Promise<Passagem> {
    return null;
  }

  public async findByDomainId (passagemId: PassagemId | string): Promise<Passagem> {
    return null;
  }

  public async listPassagensBetween(idEdificioA: string, idEdificioB: string): Promise<Passagem[]> {
    const query = { codigoEdificioA: idEdificioA, codigoEdificioB: idEdificioB}
    const passagemSchema = await this.passagemSchema.find(query);

    try {
        if (passagemSchema === null) {
            return null;
        } else {
            let passagemArray = [];
            for (let i = 0; i < passagemSchema.length; i++) {
                passagemArray[i] = PassagemMap.toDomain(passagemSchema[i]);
            }
            return passagemArray;
        }
    } catch (err) {
        throw err;
    }
  }
}