import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador';
import IElevadorDTO from '../src/dto/IElevadorDTO';

import { ElevadorMap } from '../src/mappers/ElevadorMap'

// Problema está no ID do Elevador, deve ser mudado.

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

    const elevadorDTO: IElevadorDTO = body;
    const elevadores = Elevador.create(body);

    afterEach(() => {
        sinon.restore();
    });

    it("toDTO", () => {
        sinon.assert.match(ElevadorMap.toDTO(elevadores.getValue()), elevadorDTO);
    });

    it("toDomain", () => {
        sinon.assert.match(elevadorDTO, body);
    });

    it("toPersistence", () => {
        sinon.assert.match(ElevadorMap.toPersistence(elevadores.getValue()), body);
    });
})