import { Service, Inject } from 'typedi';

import IPisoRepo from "../services/IRepos/IPisoRepo";
import { Piso } from "../domain/piso";
import { PisoId } from "../domain/pisoId";
import {PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';

@Service()
export default class PisoRepo implements IPisoRepo {
  private models: any;

  constructor(
    @Inject('pisoSchema') private pisoSchema : Model<IPisoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(piso: Piso): Promise<boolean> {
    
    const idX = piso.id instanceof PisoId ? (<PisoId>piso.id).toValue() : piso.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.pisoSchema.findOne( query as FilterQuery<IPisoPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (piso: Piso): Promise<Piso> {
    const query = { domainId: piso.id.toString()}; 

    const pisoDocument = await this.pisoSchema.findOne( query );

    try {
      if (pisoDocument === null ) {
        const rawPiso: any = PisoMap.toPersistence(piso);

        const pisoCreated = await this.pisoSchema.create(rawPiso);

        return PisoMap.toDomain(pisoCreated);
      } else {
        let salas : string[] = [];
        piso.sala.forEach(v => salas.push(v.id.toString()));
        pisoDocument.descricao = piso.descricao;
        pisoDocument.designacao = piso.designacao;
        await pisoDocument.save();

        return piso;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (edificioId: PisoId | string): Promise<Piso> {
    const query = { domainId: edificioId};
    const edificioRecord = await this.pisoSchema.findOne( query as FilterQuery<IPisoPersistence & Document> );

    if( edificioRecord != null) {
      return PisoMap.toDomain(edificioRecord);
    }
    else
      return null;
  }
  

  public async findByDesignacao(value: string): Promise<Piso> {
      const query = { codigo: value.toString() };
      const pisoRecord = await this.pisoSchema.findOne(query);

      if(pisoRecord != null)
        return PisoMap.toDomain(pisoRecord);
      else
        return null;
  }
}