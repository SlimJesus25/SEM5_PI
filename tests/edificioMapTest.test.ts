import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { EdificioMap } from '../src/mappers/EdificioMap'


describe('edificio map', () => {
        const body = {
            "dimensaoMaximaPiso": 200,
            "descricaoEdificio": "Edificio Acolhe Malucos",
            "nomeOpcionalEdificio": "Edificio Francisco",
            "codigoEdificio": "2324",
            "mapaEdificio": "1"
          };
        
      const dummyMapaEdificio = MapaEdificio.create({grelha :[["2"], ["4"]]}).getValue();


      const edificio = Edificio.create({
        dimensaoMaximaPiso : body.dimensaoMaximaPiso,
        descricaoEdificio : body.descricaoEdificio,
        nomeOpcionalEdificio : body.nomeOpcionalEdificio,
        codigoEdificio : CodigoEdificio.create(body.codigoEdificio).getValue(),
        mapaEdificio : dummyMapaEdificio
      }).getValue();



    const expectedDTO = {
        id: "1",
        dimensaoMaxima: 200,
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
        mapaEdificio: "mapa".toString()
    };

    const expectedPersistence = {
        codigo: "2324",
        descricao: "Edificio Acolhe Malucos",
        dimensao: 200,
        domainId: "123".toString(),
        id: "1",
        mapaEdificio: dummyMapaEdificio.id.toString(), 
        nomeOpcional: "Edificio Francisco",
    };

    const document = {
        id: "1",
        dimensaoMaxima: 200,
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
        mapaEdificio: dummyMapaEdificio.id.toString()
    }

    const expectedDomain = {
        id: "1",
        dimensaoMaxima: 200,
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
        mapaEdificio: dummyMapaEdificio.id.toString()
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDTO", () => {
        let actual = EdificioMap.toDTO(edificio);
        actual.id = "1";

        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        sinon.assert.match(await EdificioMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = EdificioMap.toPersistence(edificio);
        actual.domainId = "123";
        sinon.assert.match(actual, expectedPersistence);
    });
})
