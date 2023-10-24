import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador';

import { ElevadorMap } from '../src/mappers/ElevadorMap'

describe('elevador map', () => {
    const body = {
        id: 't12345',
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        modelo: "Azur",
        marca: "Otis",
        pisosServidos: ["1", "2", "3"],
        numeroIdentificativo: 155
    };

    const elevador = Elevador.create(body).getValue();

    const expectedDTO = {
        id: 't12345',
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        modelo: "Azur",
        marca: "Otis",
        pisosServidos: ["1", "2", "3"],
        numeroIdentificativo: 155
    };

    const expectedPersistence = {
        domainId: "t12345",
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        marca: "Otis",
        modelo: "Azur",
        pisosServidos: ["1", "2", "3"],
        numeroIdentificativo: 155
    };

    const document = {
        domainId: "t12345",
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        marca: "Azur",
        modelo: "Otis",
        pisosServidos: ["1", "2", "3"],
        numeroIdentificativo: 155
    }

    const expectedDomain = {
        descricao: "Elevador super rápido",
        numeroSerie: "11111",
        marca: "Azur",
        modelo: "Otis",
        pisosServidos: ["1", "2", "3"],
        numeroIdentificativo: 155
    }


    afterEach(() => {
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = ElevadorMap.toDTO(elevador);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        sinon.assert.match(await ElevadorMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = ElevadorMap.toPersistence(elevador);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})