import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPassagemService from "../src/services/IServices/IPassagemService";
import PassagemController from "../src/controllers/passagemController";
import IPassagemDTO from '../src/dto/IPassagemDTO';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Edificio } from '../src/domain/edificio';
import { Piso } from '../src/domain/piso';
import { Sala } from '../src/domain/sala';
import { Elevador } from '../src/domain/elevador';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { Passagem } from '../src/domain/passagem';


describe('passagem controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {
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
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('passagemController + passagemService integration test using spy on passagemService, success case', async function () {
		// Arrange
		let body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "J"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	
		const dummyElevador = Elevador.create({
			"descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B4", "B3"],
			"numeroIdentificativo": 100
		}).getValue();

		const dummySala = Sala.create({
			descricaoSala: "Gabinete professor ABC",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "B402"
		});

		const dummySala2 = Sala.create({
			descricaoSala: "Gabinete professor CBA",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "B303"
		});

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
			grelha: [["2"], ["4"]]
		}).getValue();

		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
			elevadores: dummyElevador,
			pisos: [dummyPiso1, dummyPiso2],
			mapaEdificio: dummyMapaEdificio
		});
		//
		const dummyElevador2 = Elevador.create({
			"descricao": "Elevador super lento",
			"numeroSerie": "11112",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["J4", "J3"],
			"numeroIdentificativo": 101
		}).getValue();

		const dummySala3 = Sala.create({
			descricaoSala: "Gabinete professor XYZ",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "J409"
		});

		const dummySala4 = Sala.create({
			descricaoSala: "Gabinete professor KAL",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "J303"
		});

		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas práticas laboratoriais",
			"designacao": "J4",
			"salas": [dummySala.getValue()]
		}).getValue();

		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "J3",
			"salas": [dummySala2.getValue()]
		}).getValue();

		const dummyMapaEdificio2 = MapaEdificio.create({
			grelha: [["2"], ["4"]]
		}).getValue();

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("J").getValue(),
			elevadores: dummyElevador2,
			pisos: [dummyPiso3, dummyPiso4],
			mapaEdificio: dummyMapaEdificio2
		});

		const p = Passagem.create({
			designacao: "B4_J4",
			edificioA: edificio1.getValue(),
			edificioB: edificio2.getValue(),
			pisoA: dummyPiso1,
			pisoB: dummyPiso3
		}).getValue();

		//
		let passagens: Passagem[] = [p];


		//

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		/*
			new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
			}).getValue())
		})
		*/

		//sinon.stub(edificioRepoInstance, "findByCodigo").resolves([edificio1.getValue(), edificio2.getValue()]);


		/*sinon.stub(edificioRepoInstance, "findByCodigo")
			.onCall(0).returns(await new Promise<Edificio>((resolve, reject) => {
			resolve(edificio1.getValue())}))
			.onCall(1).returns(await new Promise<Edificio>((resolve, reject) => {
			resolve(edificio2.getValue())}));*/

		sinon.stub(edificioRepoInstance, "findByCodigo")
			.onCall(0).resolves(edificio1)
			.onCall(1).returns(edificio2);

		//sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(edificio1.getValue()).onCall(1).resolves(edificio2.getValue());


		//sinon.stub(edificioRepoInstance, "findByCodigo").returns(edificio1).onCall(1).returns(edificio2);
		sinon.stub(passagemRepoInstance, "listPassagensBetween").returns(new Promise<Passagem[]>((resolve, reject) => {
			resolve(passagens)
		}));

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPassagens");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match([sinon.match({
			"designacao": "B4_J4",
			"edificioDestino": "J",
			"edificioOrigem": "B",
			"pisoDestino": "J4",
			"pisoOrigem": "B4"
		})]));
		sinon.assert.calledOnce(passagemServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(passagemServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('passagemController + passagemService integration test using spy on passagemService, building not found case', async function () {
		// Arrange
		let body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "C"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		//	
		const dummyElevador = Elevador.create({
			"descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B4", "B3"],
			"numeroIdentificativo": 100
		}).getValue();

		const dummySala = Sala.create({
			descricaoSala: "Gabinete professor ABC",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "B402"
		});

		const dummySala2 = Sala.create({
			descricaoSala: "Gabinete professor CBA",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "B303"
		});

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
			grelha: [["2"], ["4"]]
		}).getValue();

		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
			elevadores: dummyElevador,
			pisos: [dummyPiso1, dummyPiso2],
			mapaEdificio: dummyMapaEdificio
		});
		//
		const dummyElevador2 = Elevador.create({
			"descricao": "Elevador super lento",
			"numeroSerie": "11112",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["J4", "J3"],
			"numeroIdentificativo": 101
		}).getValue();

		const dummySala3 = Sala.create({
			descricaoSala: "Gabinete professor XYZ",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "J409"
		});

		const dummySala4 = Sala.create({
			descricaoSala: "Gabinete professor KAL",
			categoriaSala: CategoriaSala.gabinete,
			designacaoSala: "J303"
		});

		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas práticas laboratoriais",
			"designacao": "J4",
			"salas": [dummySala.getValue()]
		}).getValue();

		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "J3",
			"salas": [dummySala2.getValue()]
		}).getValue();

		const dummyMapaEdificio2 = MapaEdificio.create({
			grelha: [["2"], ["4"]]
		}).getValue();

		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("J").getValue(),
			elevadores: dummyElevador2,
			pisos: [dummyPiso3, dummyPiso4],
			mapaEdificio: dummyMapaEdificio2
		});

		const p = Passagem.create({
			designacao: "B4_J4",
			edificioA: edificio1.getValue(),
			edificioB: edificio2.getValue(),
			pisoA: dummyPiso1,
			pisoB: dummyPiso3
		}).getValue();

		//
		let passagens: Passagem[] = [p];


		//

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(edificio1.getValue()).onCall(1).resolves(null);

		sinon.stub(passagemRepoInstance, "listPassagensBetween").returns(new Promise<Passagem[]>((resolve, reject) => {
			resolve(passagens)
		}));

		let passagemServiceInstance = Container.get("PassagemService");
		const passagemServiceSpy = sinon.spy(passagemServiceInstance, "listPassagens");

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);

		// Act
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
	});


	it('listPassagens entre edifícios', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"codigoEdificioA": "B",
			"codigoEdificioB": "H"
		};
		let res2: Partial<Response> = {};
		let response: IPassagemDTO[] = [
			{
				"id": "1",
				"designacao": "ABC",
				"edificioOrigem": "1",
				"edificioDestino": "2",
				"pisoOrigem": "2",
				"pisoDestino": "1"
			},
			{
				"id": "2",
				"designacao": "DEF",
				"edificioOrigem": "1",
				"edificioDestino": "2",
				"pisoOrigem": "3",
				"pisoDestino": "2"
			}
		];



		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "listPassagens").returns(Result.ok<IPassagemDTO[]>(response as IPassagemDTO[]));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		await ctrl.listPassagens(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});


	//TODO para list pisos com passagem


});


