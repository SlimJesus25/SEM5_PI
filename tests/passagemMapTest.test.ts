import * as sinon from 'sinon';
import { Passagem } from '../src/domain/passagem';
import { PassagemMap } from '../src/mappers/PassagemMap'
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { Sala } from '../src/domain/sala';
import { Edificio } from '../src/domain/edificio';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Container } from 'typedi';

describe('passagem map', () => {

    /////////////////////////
    Container.reset();
    let passagemSchemaInstance = require("../src/persistence/schemas/passagemSchema").default;
    Container.set("passagemSchema", passagemSchemaInstance);

    let passagemRepoClass = require("../src/repos/passagemRepo").default;
    let passagemRepoInstance = Container.get(passagemRepoClass);
    Container.set("PassagemRepo", passagemRepoInstance);

    ////////////////////////////
    // Repo + schema edifício.
    let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
    Container.set("edificioSchema", edificioSchemaInstance);

    let edificioRepoClass = require("../src/repos/edificioRepo").default;
    let edificioRepoInstance = Container.get(edificioRepoClass);
    Container.set("EdificioRepo", edificioRepoInstance);

    //let containerClass = require("typedi");
    //let containerInstance = Container.get(containerClass);
    //Container.set("Container", containerInstance);
    ////////////////////////////

    ////////////////////////////
    // Repo + schema piso.
    let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
    Container.set("pisoSchema", pisoSchemaInstance);

    let pisoRepoClass = require("../src/repos/pisoRepo").default;
    let pisoRepoInstance = Container.get(pisoRepoClass);
    Container.set("PisoRepo", pisoRepoInstance);		
    ////////////////////////////

    let passagemServiceClass = require("../src/services/passagemService").default;
    let passagemServiceInstance = Container.get(passagemServiceClass);
    Container.set("PassagemService", passagemServiceInstance);
    /////////////////////////

    sinon.stub(Container, 'get')
    .withArgs('EdificioRepo').returns(edificioRepoInstance)
    .withArgs('PisoRepo').returns(pisoRepoInstance);

    console.log('Aqui: ', edificioRepoInstance);

    const dummyElevador2 = Elevador.create({
        "descricao": "Elevador super lento",
        "numeroSerie": "11112",
         "modelo": "Azal",
          "marca": "Otis",
           "pisosServidos": ["J4", "J3"],
            "numeroIdentificativo": 101
    }).getValue();

    const dummySala3  = Sala.create({
        descricaoSala : "Gabinete professor XYZ",
        categoriaSala: CategoriaSala.gabinete, 
        designacaoSala: "J409"});

    const dummySala4  = Sala.create({
        descricaoSala : "Gabinete professor KAL",
        categoriaSala: CategoriaSala.gabinete, 
        designacaoSala: "J303"});

    const dummyPiso3 = Piso.create({
        "descricao": "Piso de gabinetes e aulas práticas laboratoriais",
        "designacao": "J4",
        "salas": [dummySala3.getValue()]
    }).getValue();

    const dummyPiso4 = Piso.create({
        "descricao": "Piso de gabinetes e aulas teórica-práticas",
        "designacao": "J3",
        "salas": [dummySala4.getValue()]
    }).getValue();

    const dummyMapaEdificio2 = MapaEdificio.create({
        grelha :[["2"], ["4"]]
    }).getValue();

    const dummyElevador = Elevador.create({
        "descricao": "Elevador super rápido",
        "numeroSerie": "11111",
        "modelo": "Azal",
        "marca": "Otis",
        "pisosServidos": ["B4", "B3"],
            "numeroIdentificativo": 100
    }).getValue();

    const dummySala  = Sala.create({
        descricaoSala : "Gabinete professor ABC",
        categoriaSala: CategoriaSala.gabinete, 
        designacaoSala: "B402"});

    const dummySala2  = Sala.create({
        descricaoSala : "Gabinete professor CBA",
        categoriaSala: CategoriaSala.gabinete, 
        designacaoSala: "B303"});

    const dummyPiso1 = Piso.create({
    "descricao": "Piso de gabinetes e aulas práticas laboratoriais",
    "designacao": "B4",
    "salas": [dummySala.getValue()]
    }).getValue();

    const dummyPiso2 = Piso.create({
    "descricao": "Piso de gabinetes e aulas teórica-práticas",
    "designacao": "B3",
    "salas": [dummySala2.getValue()]
    }).getValue();

    const dummyMapaEdificio = MapaEdificio.create({
    grelha :[["2"], ["4"]]
    }).getValue();

    const edificio1 = Edificio.create({
    dimensaoMaximaPiso : 200,
    descricaoEdificio : "Edificio Acolhe Malucos",
    nomeOpcionalEdificio : "Departamento de Engenharia Informática",
    codigoEdificio : CodigoEdificio.create("B").getValue(),
    elevadores : dummyElevador,
    pisos : [dummyPiso1, dummyPiso2],
    mapaEdificio : dummyMapaEdificio
    });

    const edificio2 = Edificio.create({
      dimensaoMaximaPiso : 200,
      descricaoEdificio : "Edificio Acolhe Malucos",
      nomeOpcionalEdificio : "Departamento de Engenharia Civil",
      codigoEdificio : CodigoEdificio.create("J").getValue(),
      elevadores : dummyElevador2,
      pisos : [dummyPiso3, dummyPiso4],
      mapaEdificio : dummyMapaEdificio2
    });

    const passagem = Passagem.create({
        designacao: "B4_J4",
        edificioA: edificio1.getValue(),
        edificioB: edificio2.getValue(),
        pisoA: dummyPiso1,
        pisoB: dummyPiso3
    }).getValue();

    const expectedDTO = {
        designacao: "B4_J4",
        edificioOrigem: "B",
        edificioDestino: "J",
        pisoOrigem: "B4",
        pisoDestino: "J4"
    };

    const expectedPersistence = {
        domainId: "t12345",
        designacao: "B4_J4",
        edificioOrigem: "B",
        edificioDestino: "J",
        pisoOrigem: "B4",
        pisoDestino: "J4"
    };

    const document = {
        domainId: "t12345",
        designacao: "B4_J4",
        edificio1: "B",
        edificio2: "J",
        piso1: "B4",
        piso2: "J4"
    }

    const expectedDomain = {
        designacao: "B4_J4",
        edificio1: "B",
        edificio2: "J",
        piso1: "B4",
        piso2: "J4"
    }


    afterEach(() => {
        sinon.restore();
    });

    it("toDomain", async () => {

        // Necessidade de fazer stub.
        let edificioRepoInstace = Container.get("EdificioRepo");
        let pisoRepoInstace = Container.get("PisoRepo");
         
        /*
        const obj1 = sinon.stub(edificioRepoInstace, "findByCodigo")
			.onCall(0).resolves(edificio1.getValue())
			.onCall(1).resolves(edificio2.getValue());

        const obj2 = sinon.stub(pisoRepoInstace, "findByDesignacao")
            .onCall(0).resolves(dummyPiso1)
            .onCall(1).resolves(dummyPiso3);
        

        sinon.stub(containerInstance, "get")
        .onCall(0).returns(edificioRepoInstace)
        .onCall(1).returns(pisoRepoInstace);
        */

        const result = await PassagemMap.toDomain(document);
        sinon.assert.match(result, expectedDomain);
        sinon.restore();
    });

    // Foi necessário adicionar a linha de modificação do ID por este ser criado automáticamente aquando da criação.
    it("toDTO", () => {
        let actual = PassagemMap.toDTO(passagem);
        actual.id = "t12345";
        sinon.assert.match(actual, expectedDTO);
    });

    it("toPersistence", () => {
        let actual = PassagemMap.toPersistence(passagem);
        actual.domainId = "t12345";
        sinon.assert.match(actual, expectedPersistence);
    });
})