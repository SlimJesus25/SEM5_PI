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

	/*
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
	*/


	it('createEdificio returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Já existe um edificio com o código 150'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstance = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstance, "createEdificio").resolves(Result.fail<IEdificioDTO>(res as IEdificioDTO));


		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe um edificio com o código 150");
	});




	it('createEdificio returns edificio json', async function () {
		let req: Partial<Request> = {};

		req.body = {
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
			"mapaEdificio": "1"
		};


		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "createEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

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
			"mapaEdificio": "1"
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "createEdificio").resolves(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 201);
	});


	it("updateEdificio returns status 404", async function () {
		let body = "Edificio não encontrado";

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "updateEdificio").resolves(Result.fail<IEdificioDTO>("Edificio não encontrado"));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledWith(obj, "Edificio não encontrado");

	});



	it("updateEdificio returns elevador json", async function () {
		let body = {
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
			"elevadores": "1",
			"pisos": ["1", "2", "3"],
			"mapaEdificio": "1"
		};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "updateEdificio").returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
			"elevadores": "1",
			"pisos": ["1", "2", "3"],
			"mapaEdificio": "1"
		}))
	});

	it("updateEdificio returns status 201", async function () {
		let body = "";

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => { };

		let edificioServiceInstace = Container.get("EdificioService");

		const obj = sinon.stub(edificioServiceInstace, "updateEdificio").returns(Result.ok<IEdificioDTO>);

		const ctrl = new EdificioController(edificioServiceInstace as IEdificioService);
		await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 201);
	});


	it('edificioController + edificioService integration test using spy on edificioService, success creation case', async function () {
		// Arrange
		let body = {
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
			"elevadores": "1",
			"pisos": ["1", "2", "3"],
			"mapaEdificio": "1"
		};

		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let edificioRepoInstance = Container.get("EdificioRepo");
		sinon.stub(edificioRepoInstance, "findByCodigo").returns(null);



		const dummyMapaEdificio = MapaEdificio.create({ grelha: [["2"], ["4"]] }).getValue();


		sinon.stub(edificioRepoInstance, "save").returns(new Promise<Edificio>((resolve, reject) => {
			resolve(Edificio.create({
				dimensaoMaximaPiso: body.dimensaoMaximaPiso,
				descricaoEdificio: body.descricaoEdificio,
				nomeOpcionalEdificio: body.nomeOpcionalEdificio,
				codigoEdificio: CodigoEdificio.create(body.codigoEdificio).getValue(),
				mapaEdificio: dummyMapaEdificio
			}).getValue())
		}));

		let edificioServiceInstance = Container.get("EdificioService");
		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "createEdificio");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
			"elevadores": "1",
			"pisos": ["1", "2", "3"],
			"mapaEdificio": "1"
		}));
		sinon.assert.calledOnce(edificioServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(edificioServiceSpy, sinon.match({ name: req.body.name }));
	});


	it('elevadorController + elevadorService integration test using spy on elevadorService, unsuccess creation test', async function () {
		// Arrange
		let body = {
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Edificio Francisco",
			"codigoEdificio": "2324",
			"elevadores": "1",
			"pisos": ["1", "2", "3"],
			"mapaEdificio": "1"
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		const dummyMapaEdificio = MapaEdificio.create({ grelha: [["2"], ["4"]] }).getValue();

		let edificioRepoInstance = Container.get("EdificioRepo");
		sinon.stub(edificioRepoInstance, "findByCodigo").returns(new Promise<Edificio>((resolve, reject) => {
			resolve(Edificio.create({
				dimensaoMaximaPiso: body.dimensaoMaximaPiso,
				descricaoEdificio: body.descricaoEdificio,
				nomeOpcionalEdificio: body.nomeOpcionalEdificio,
				codigoEdificio: CodigoEdificio.create(body.codigoEdificio).getValue(),
				mapaEdificio: dummyMapaEdificio
			}).getValue())
		}));

		// Isto não vai correr porque é suposto falhar na verificação de existência do prédio.
		sinon.stub(edificioRepoInstance, "save").returns(new Promise<Edificio>((resolve, reject) => {
			resolve(Edificio.create({
				dimensaoMaximaPiso: body.dimensaoMaximaPiso,
				descricaoEdificio: body.descricaoEdificio,
				nomeOpcionalEdificio: body.nomeOpcionalEdificio,
				codigoEdificio: CodigoEdificio.create(body.codigoEdificio).getValue(),
				mapaEdificio: dummyMapaEdificio
			}).getValue())
		}));

		let edificioServiceInstance = Container.get("EdificioService");
		const edificioServiceSpy = sinon.spy(edificioServiceInstance, "createEdificio");

		const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

		// Act
		await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});
	/*
		it('elevadorController + elevadorService integration test using spy on elevadorService, success updating case', async function () {		
			// Arrange
			let body = {
				"id" : "123",
				"descricao": "Elevador super RÁPIDO",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
				};
			let req: Partial<Request> = {};
			req.body = body;
	
			let res: Partial<Response> = {
				json: sinon.spy()
			};
			let next: Partial<NextFunction> = () => {};
	
			let elevadorRepoInstance = Container.get("ElevadorRepo");
			sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").returns(new Promise<Elevador>((resolve, reject) => {
				resolve(Elevador.create({
				"descricao": "Elevador super LENTO",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
				}).getValue())
			}));
	
			// Era possível dizer que o serviço não estaria a ser testado por causa deste retorno do save
			// , porém, no serviço, o retorno do save não é aproveitado.
			sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
				resolve(Elevador.create({
				"descricao": "Elevador super RÁPIDO",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
				}).getValue())
			}));
	
			let elevadorServiceInstance = Container.get("ElevadorService");		
			const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "updateElevador");
	
			const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);
	
		// Act
			await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);
	
			// Assert
			sinon.assert.calledOnce(res.json);
			sinon.assert.calledWith(res.json, sinon.match({ "descricao": "Elevador super RÁPIDO",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100}));
			sinon.assert.calledOnce(elevadorServiceSpy);
			//sinon.assert.calledTwice(roleServiceSpy);
			sinon.assert.calledWith(elevadorServiceSpy, sinon.match({name: req.body.name}));
		});
	
		it('elevadorController + elevadorService integration test using spy on elevadorService, unsuccess updating case', async function () {		
			// Arrange
			let body = {
				"id" : "123",
				"descricao": "Elevador super RÁPIDO",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
				};
			let req: Partial<Request> = {};
			req.body = body;
	
			let res: Partial<Response> = {
				status: sinon.spy()
			};
			let next: Partial<NextFunction> = () => {};
	
			let elevadorRepoInstance = Container.get("ElevadorRepo");
			sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").returns(null);
	
			sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
				resolve(Elevador.create({
				"descricao": "Elevador super RÁPIDO",
				"numeroSerie": "11111",
				"modelo": "Azal",
				"marca": "Otis",
				"pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
				}).getValue())
			}));
	
			let elevadorServiceInstance = Container.get("ElevadorService");		
			const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "updateElevador");
	
			const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);
	
		// Act
			await ctrl.updateElevador(<Request>req, <Response>res, <NextFunction>next);
	
			// Assert
			sinon.assert.calledOnce(res.status);
			sinon.assert.calledWith(res.status, 404);
			sinon.assert.calledOnce(elevadorServiceSpy);
			//sinon.assert.calledTwice(roleServiceSpy);
			sinon.assert.calledWith(elevadorServiceSpy, sinon.match({name: req.body.name}));
		});
		*/
});