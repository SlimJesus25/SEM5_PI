import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import IAprovacaoRepo from '../services/IRepos/IAprovacaoRepo';
import { IAprovacaoPersistence } from '../dataschema/IAprovacaoPersistence';
import { Aprovacao } from '../domain/aprovacao';
import { AprovacaoMap } from '../mappers/AprovacaoMap';
import { AprovacaoId } from '../domain/aprovacaoId';

@Service()
export default class AprovacaoRepo implements IAprovacaoRepo {
    private models: any;

    constructor(
        @Inject('aprovacaoSchema') private aprovacaoSchema: Model<IAprovacaoPersistence & Document>,
    ) { }

    public async exists(aprovacao: Aprovacao): Promise<boolean> {

        const idX = aprovacao.id instanceof AprovacaoId ? (<AprovacaoId>aprovacao.id).toValue() : aprovacao.id;

        const query = { domainId: idX };
        const tarefaDocument = await this.aprovacaoSchema.findOne(query as FilterQuery<IAprovacaoPersistence & Document>);

        return !!tarefaDocument === true;
    }

    public async save(aprovacao: Aprovacao): Promise<Aprovacao> {
        const query = { domainId: aprovacao.id.toString() };

        const aprovacaoDocument = await this.aprovacaoSchema.findOne(query);

        try {
            if (aprovacaoDocument === null) {
                const rawAprovacao: any = AprovacaoMap.toPersistence(aprovacao);

                const aprovacaoCreated = await this.aprovacaoSchema.create(rawAprovacao);

                return AprovacaoMap.toDomain(aprovacaoCreated);
            } else {

                aprovacaoDocument.estado = aprovacao.estado;
                aprovacaoDocument.requisitante = aprovacao.requisitante;
                aprovacaoDocument.tipoDispositivo = aprovacao.tipoDispositivo;
                aprovacaoDocument.tarefa = aprovacao.tarefa.designacaoTarefa;
                await aprovacaoDocument.save();

                return aprovacao;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(aprovacaoId: AprovacaoId | string): Promise<Aprovacao> {
        const query = { domainId: aprovacaoId };
        const aprovacaoRecord = await this.aprovacaoSchema.findOne(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacaoRecord != null) {
            return AprovacaoMap.toDomain(aprovacaoRecord);
        }
        else
            return null;
    }

    public async findByTarefaName(designacaoTarefa: string): Promise<Aprovacao> {
        const query = { tarefa: designacaoTarefa };
        const aprovacaoRecord = await this.aprovacaoSchema.findOne(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacaoRecord != null) {
            return AprovacaoMap.toDomain(aprovacaoRecord);
        } else {
            return null;
        }
    }
}