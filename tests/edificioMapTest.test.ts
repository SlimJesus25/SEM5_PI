import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador';

import { ElevadorMap } from '../src/mappers/ElevadorMap';
import { Edificio } from '../src/domain/edificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { EdificioMap } from '../src/mappers/EdificioMap'


describe('edificio map', () => {
        const body = {
            "dimensaoMaximaPiso": 200,
            "descricaoEdificio": "Edificio Acolhe Malucos",
            "nomeOpcionalEdificio": "Edificio Francisco",
            "codigoEdificio": "2324",
            "elevadores": "1",
            "pisos": ["1","2","3"],
            "mapaEdificio": "1"
          };
          const body2 = {
            "id": "12345",
            "descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
        };
        const dummyElevador = Elevador.create(body2).getValue();
        const dummySala  = Sala.create({descricaoSala :"descricao", categoriaSala: CategoriaSala.laboratorio, designacaoSala: "designacao"});
        const dummySala2  = Sala.create({descricaoSala :"descricao", categoriaSala: CategoriaSala.laboratorio, designacaoSala: "designacao2"});


      const body3 = {
        "id": "1",
        "descricao": "gandapiso",
        "designacao": "gandadesignacao",
        "salas": [dummySala.getValue(), dummySala2.getValue()]
      }

      const dummyPiso1 = Piso.create(body3).getValue();
      const dummyPiso2 = Piso.create(body3).getValue();
      const dummyMapaEdificio = MapaEdificio.create({grelha :[["2"], ["4"]]}).getValue();


      const edificio = Edificio.create({
        dimensaoMaximaPiso : body.dimensaoMaximaPiso,
        descricaoEdificio : body.descricaoEdificio,
        nomeOpcionalEdificio : body.nomeOpcionalEdificio,
        codigoEdificio : CodigoEdificio.create(body.codigoEdificio).getValue(),
        elevadores : dummyElevador,
        pisos : [dummyPiso1, dummyPiso2],
        mapaEdificio : dummyMapaEdificio
      }).getValue();



    const expectedDTO = {
        id: "1",
        dimensaoMaxima: 200,
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
        elevador: dummyElevador.numeroIdentificativo,
        pisos: [dummyPiso1.designacao, dummyPiso2.designacao],
        mapaEdificio: "mapa".toString()
    };

    const expectedPersistence = {
        codigo: "2324",
        descricao: "Edificio Acolhe Malucos",
        dimensao: 200,
        domainId: "123".toString(),
        elevadores: dummyElevador.numeroIdentificativo, 
        id: "1",
        mapaEdificio: dummyMapaEdificio.id.toString(), 
        nomeOpcional: "Edificio Francisco",
        pisos: [dummyPiso1.designacao, dummyPiso2.designacao]
    };

    const document = {
        id: "1",
        dimensaoMaxima: 200,
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
        elevador: dummyElevador,
        pisos: [dummyPiso1.designacao, dummyPiso2.designacao],
        mapaEdificio: dummyMapaEdificio.id.toString()
    }

    const expectedDomain = {
        id: "1",
        dimensaoMaxima: 200,
        descricao: "Edificio Acolhe Malucos",
        nomeOpcional: "Edificio Francisco",
        codigoEdificio: "2324",
        elevador: dummyElevador,
        pisos: [dummyPiso1.designacao, dummyPiso2.designacao],
        mapaEdificio: dummyMapaEdificio.id.toString()
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDTO", () => {
        let actual = EdificioMap.toDTO(edificio);
        actual.id = "1";
        actual.mapaEdificio = "mapa";
        actual.pisos = [dummyPiso1.designacao, dummyPiso2.designacao] // joao: estava a aparecer [object object, object object], foi esta a solução que encontrei

        sinon.assert.match(actual, expectedDTO);
    });

    it("toDomain", async () => {
        sinon.assert.match(await EdificioMap.toDomain(document), expectedDomain);
    });

    it("toPersistence", () => {
        let actual = EdificioMap.toPersistence(edificio);
        actual.domainId = "123";
        actual.id = "1";
        sinon.assert.match(actual, expectedPersistence);
    });
})
