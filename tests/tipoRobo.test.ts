import * as sinon from 'sinon';
import { Tarefa } from '../src/domain/tarefa';
import { TipoRobo } from '../src/domain/tipoRobo';

describe('TipoRobo', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('TipoRobo succeeds', () => {

        const dummyTarefa1 = Tarefa.create({
            tipoTarefa: "vigilancia"
        }).getValue();

        const body = {
            "designacao": "Polivalente",
            "marca": "Marca 1",
            "modelo": "Modelo 1",
            "tarefas": dummyTarefa1,
        };

        const tipoRobo = TipoRobo.create({
            designacao: body.designacao,
            marca: body.marca,
            modelo: body.modelo,
            tarefas: [body.tarefas]
        }).getValue();

        sinon.assert.match(tipoRobo.designacao,"Polivalente");
        sinon.assert.match(tipoRobo.marca,"Marca 1");
        sinon.assert.match(tipoRobo.modelo,"Modelo 1");
        sinon.assert.match(tipoRobo.tarefas,[dummyTarefa1]);
    })
})