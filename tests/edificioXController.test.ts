import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IElevadorDTO from '../src/dto/IElevadorDTO';
import IEdificioDTO from '../src/dto/IEdificioDTO';
import IEdificioService from "../src/services/IServices/IEdificioService";
import EdificioController from "../src/controllers/edificioController";
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { Elevador } from '../src/domain/elevador';



describe('edificio controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {

		// Reset the container
		Container.reset();

		let mapaEdificioSchemaInstance = require("../src/persistence/schemas/mapaEdificioSchema").default;
		Container.set("mapaEdificioSchema", mapaEdificioSchemaInstance);

		let mapaEdificioRepoClass = require("../src/repos/mapaEdificioRepo").default;
		let mapaEdificioRepoInstance = Container.get(mapaEdificioRepoClass);
		Container.set("MapaEdificioRepo", mapaEdificioRepoInstance);

		// ELEVADOR
		let elevadorSchemaInstance = require("../src/persistence/schemas/elevadorSchema").default;
		Container.set("elevadorSchema", elevadorSchemaInstance);

		let elevadorRepoClass = require("../src/repos/elevadorRepo").default;
		let elevadorRepoInstance = Container.get(elevadorRepoClass);
		Container.set("ElevadorRepo", elevadorRepoInstance);

		// PISO
		let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

		// EDIFICIO
		let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);

		let edificioServiceClass = require("../src/services/edificioService").default;
		let edificioServiceInstance = Container.get(edificioServiceClass);
		Container.set("EdificioService", edificioServiceInstance);

	});


	afterEach(function () {
		sandbox.restore();
	});

	it('listElevadores: edificioController + edificioService integration test using spy on edificioService, success case', async function () {
		// Arrange
		let body = {
			"codigoEdificio": "B",
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");
		let edificioServiceInstance = Container.get("EdificioService");

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

		const edificio = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
			elevadores: dummyElevador,
			pisos: [dummyPiso1, dummyPiso2],
			mapaEdificio: dummyMapaEdificio
		});

		sinon.stub(edificioRepoInstance, "findByCodigo").resolves(edificio.getValue());

		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "listElevadores");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.listElevadores(<Request>req, <Response>res, <NextFunction>next);


		/*
sinon.assert.calledWith(res.json, sinon.match([sinon.match({
			"designacao": "B4_J4",
			"edificioDestino": "J",
			"edificioOrigem": "B",
			"pisoDestino": "J4",
			"pisoOrigem": "B4"
		})]));
		*/
		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match([sinon.match({
			"descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["B4", "B3"],
			"numeroIdentificativo": 100
		})]));
		sinon.assert.calledOnce(edificioServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
		sinon.assert.calledOnce(edificioServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('listEdificios', async function () {
		let req: Partial<Request> = {};
		req.body = {
		};
		let res2: Partial<Response> = {};
		let response: IEdificioDTO[] = [
			{
				"id": "1",
				"dimensaoMaxima": 200,
				"descricao": "Edificio Acolhe Malucos",
				"nomeOpcional": "Edificio Francisco",
				"codigoEdificio": "2324",
				"elevador": 100,
				"pisos": ["1", "2", "3"],
				"mapaEdificio": "1"
			},

		];

		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "listEdificios").returns(Result.ok<IEdificioDTO[]>(response as IEdificioDTO[]));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.listEdificios(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	it('listElevadores de um edifício', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"codigoEdificio": "B",
		};
		let res2: Partial<Response> = {};
		let response: IElevadorDTO[] = [
			{
				"id": "1234",
				"descricao": "Elevador super lento",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
			}
		];


		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "listElevadores").resolves(Result.ok<IElevadorDTO[]>(response as IElevadorDTO[]));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.listElevadores(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
		
	});

	

});
/*

it('createEdificio returns status 403 forbidden', async function () {
	let req: Partial<Request> = {};
	req.body = 'Já existe um edificio com o código 150'

	let res: Partial<Response> = {
		status: sinon.spy(),
	};

	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstace = Container.get("EdificioService");

	const obj = sinon.stub(edificioServiceInstace, "createEdificio").returns(Result.fail<IElevadorDTO>("Já existe um edificio com o código 150"));

	const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
	await ctrl.createEdificio(<Request>req, <Response> res, <NextFunction> next);

	sinon.assert.calledOnce(res.status);
	sinon.assert.calledWith(res.status, 403);
	sinon.assert.calledWith(obj, "Já existe um edificio com o código 150");
});

it('createElevator returns elevador json', async function () {
	let req: Partial<Request> = {};

	req.body = {
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
	const dummySala  = Sala.create({descricaoSala :"descricao", categoriaSala: CategoriaSala.laboratorio, designacaoSala: "designacao"})
	const dummySala2  = Sala.create({descricaoSala :"descricao", categoriaSala: CategoriaSala.laboratorio, designacaoSala: "designacao"})


  const body3 = {
	"id": "1",
	"descricao": "gandapiso",
	"designacao": "gandadesignacao",
	"salas": [dummySala.getValue(), dummySala2.getValue()]
  }

  const dummyPiso1 = Piso.create(body3).getValue();
  const dummyPiso2 = Piso.create(body3).getValue();

  const body4 = [["2"], ["4"]];

	let res: Partial<Response> = {
		status: sinon.spy(),
	};

	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstace = Container.get("EdificioService");

	const obj = sinon.stub(edificioServiceInstace, "createEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

	const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
	await ctrl.createEdificio(<Request>req, <Response> res, <NextFunction> next);

	sinon.assert.calledOnce(obj);
	sinon.assert.calledWith(obj, sinon.match(req.body));
});

it('createEdificio returns status 201', async function () {
	let req: Partial<Request> = {};
	req.body = {
		"dimensaoMaximaPiso": 200,
	"descricaoEdificio": "Edificio Acolhe Malucos",
	"nomeOpcionalEdificio": "Edificio Francisco",
	"codigoEdificio": "2324",
	"elevadores": "1",
	"pisos": ["1","2","3"],
	"mapaEdificio": "1"
	};

	let res: Partial<Response> = {
		status: sinon.spy(),
	};

	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstace = Container.get("EdificioService");

	const obj = sinon.stub(edificioServiceInstace, "createEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

	const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
	await ctrl.createEdificio(<Request>req, <Response> res, <NextFunction> next);

	sinon.assert.calledOnce(res.status);
	sinon.assert.calledWith(res.status, 201);
});


it("updateElevador returns status 404", async function() {
	let body = "Edificio não encontrado";

	let req: Partial<Request> = {};

	req.body = body;

	let res: Partial<Response> = {
		json: sinon.spy(),
	};

	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstace = Container.get("EdificioService");

	const obj = sinon.stub(edificioServiceInstace, "updateEdificio").returns(Result.fail<IElevadorDTO>("Edificio não encontrado"));

	const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
	await ctrl.updateEdificio(<Request>req, <Response> res, <NextFunction> next);

	sinon.assert.calledOnce(res.status);
	sinon.assert.calledWith(res.status, 404);
	sinon.assert.calledWith(obj, "Edificio não encontrado");
	
});


it("updateEdificio returns elevador json", async function() {
	let body = {
		"dimensaoMaximaPiso": 200,
		"descricaoEdificio": "Edificio Acolhe Malucos",
		"nomeOpcionalEdificio": "Edificio Francisco",
		"codigoEdificio": "2324",
		"elevadores": "1",
		"pisos": ["1","2","3"],
		"mapaEdificio": "1"
	};

	let req: Partial<Request> = {};

	req.body = body;

	let res: Partial<Response> = {
		json: sinon.spy(),
	};

	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstace = Container.get("EdificioService");

	const obj = sinon.stub(edificioServiceInstace, "updateEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

	const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
	await ctrl.updateEdificio(<Request>req, <Response> res, <NextFunction> next);

	sinon.assert.calledOnce(obj);
	sinon.assert.calledWith(obj, sinon.match({
		"dimensaoMaximaPiso": 200,
	"descricaoEdificio": "Edificio Acolhe Malucos",
	"nomeOpcionalEdificio": "Edificio Francisco",
	"codigoEdificio": "2324",
	"elevadores": "1",
	"pisos": ["1","2","3"],
	"mapaEdificio": "1"
	}))
});

it("updateElevador returns status 201", async function() {
	let body = "";

	let req: Partial<Request> = {};

	req.body = body;

	let res: Partial<Response> = {
		json: sinon.spy(),
	};

	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstace = Container.get("EdificioService");

	const obj = sinon.stub(edificioServiceInstace, "updateEdificio").returns(Result.fail<IEdificioDTO>(""));

	const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
	await ctrl.updateEdificio(<Request>req, <Response> res, <NextFunction> next);

	sinon.assert.calledOnce(res.status);
	sinon.assert.calledWith(res.status, 201);
});


it('elevadorController unit test using elevadorService mock', async function () {		
	// Arrange
	let body = { "dimensaoMaximaPiso": 200,
	"descricaoEdificio": "Edificio Acolhe Malucos",
	"nomeOpcionalEdificio": "Edificio Francisco",
	"codigoEdificio": "2324",
	"elevadores": "1",
	"pisos": ["1","2","3"],
	"mapaEdificio": "1"};


	let req: Partial<Request> = {};
	req.body = body;

	let res: Partial<Response> = {
		json: sinon.spy()
	};
	let next: Partial<NextFunction> = () => {};

	let edificioServiceInstance = Container.get("EdificioService");		
	const edificioServiceMock = sinon.mock(edificioServiceInstance, "createEdificio")
	edificioServiceMock.expects("createEdificio")
		.once()
		.withArgs(sinon.match({name: req.body.name}))
		.returns(Result.ok<IEdificioDTO>( {"id": "1",
		"dimensaoMaxima": 200,
		"descricao": "Edificio Acolhe Malucos",
		"nomeOpcional": "Edificio Francisco",
		"codigoEdificio": "2324",
		"elevador": 1,
		"pisos": ["1","2","3"],
		"mapaEdificio": "1"} ));

	const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

	// Act
	await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

	// Assert
	edificioServiceMock.verify();
	sinon.assert.calledOnce(res.json);
	sinon.assert.calledWith(res.json, sinon.match({"dimensaoMaximaPiso": 200,
	"descricaoEdificio": "Edificio Acolhe Malucos",
	"nomeOpcionalEdificio": "Edificio Francisco",
	"codigoEdificio": "2324",
	"elevadores": "1",
	"pisos": ["1","2","3"],
	"mapaEdificio": "1"}));
});
});

*/