import * as sinon from 'sinon';
import { Sala } from '../src/domain/sala';

import { SalaMap } from '../src/mappers/SalaMap'
import { CategoriaSala } from '../src/domain/categoriaSala';

describe('sala map', () => {
    const body = {
        id: "t12345",
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: CategoriaSala.anfiteatro,
        designacaoSala: "B401",
    };

    const sala = Sala.create(body).getValue();

    const expectedDTO = {
        id: "t12345",
        descricao: "Anfiteatro para palestras do núcleo de estudantes",
        categoria: "anfiteatro",
        designacao: "B401",
    };

    const expectedPersistence = {
        domainId: "t12345",
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B401",
    };

    const document = {
        domainId: "t12345",
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: "anfiteatro",
        designacaoSala: "B401",
    }

    const expectedDomain = {
        descricaoSala: "Anfiteatro para palestras do núcleo de estudantes",
        categoriaSala: CategoriaSala.anfiteatro,
        designacaoSala: "B401",
    }


    afterEach(() => {
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = SalaMap.toDTO(sala);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        sinon.assert.match(await SalaMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = SalaMap.toPersistence(sala);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})