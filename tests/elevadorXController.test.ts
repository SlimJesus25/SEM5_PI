import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IElevadorService from "../src/services/IServices/IElevadorService";
import ElevadorController from "../src/controllers/elevadorController";
import IElevadorDTO from '../src/dto/IElevadorDTO';
import { Elevador } from '../src/domain/elevador'

describe('elevador controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let elevadorSchemaInstance = require("../src/persistence/schemas/elevadorSchema").default;
		Container.set("elevadorSchema", elevadorSchemaInstance);

		let elevadorRepoClass = require("../src/repos/elevadorRepo").default;
		let elevadorRepoInstance = Container.get(elevadorRepoClass);
		Container.set("ElevadorRepo", elevadorRepoInstance);

		let elevadorServiceClass = require("../src/services/elevadorService").default;
		let elevadorServiceInstance = Container.get(elevadorServiceClass);
		Container.set("ElevadorService", elevadorServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});


	it('createElevator returns status 403 forbidden', async function () {
		let req: Partial<Request> = {};
		req.body = 'Já existe um elevador com o código 150'

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "createElevador").returns(Result.fail<IElevadorDTO>("Já existe um elevador com o código 150"));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.createElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
		sinon.assert.calledWith(obj, "Já existe um elevador com o código 150");
	});

	it('createElevator returns elevador json', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100 
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "createElevador").returns(Result.ok<IElevadorDTO>(req.body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.createElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
	});

	it('createElevator returns status 201', async function () {
		let req: Partial<Request> = {};
		req.body = {
			"descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100 
		};

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "createElevador").returns(Result.ok<IElevadorDTO>(req.body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.createElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 201);
	});

	/*
	let body = {
			"id" : "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
			};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "updateElevador").returns(Result.ok<IElevadorDTO>(body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.updateElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 201);
	*/


	it("updateElevador returns status 404", async function() {
		let body = "Elevador não encontrado";

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "updateElevador").returns(Result.fail<IElevadorDTO>("Elevador não encontrado"));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.updateElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledWith(obj, "Elevador não encontrado");
	
	});


	it("updateElevador returns elevador json", async function() {
		let body = {
		"id" : "123",
		"descricao": "Elevador super lento",
		"numeroSerie": "11111",
		"modelo": "Azal",
		"marca": "Otis",
		"pisosServidos": ["1", "2", "3"],
		"numeroIdentificativo": 100
		};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "updateElevador").returns(Result.ok<IElevadorDTO>(req.body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.updateElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			"id" : "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
		}))
	});

	it("updateElevador returns status 201", async function() {
		let body = {
			"id" : "123",
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
			};

		let req: Partial<Request> = {};

		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstace = Container.get("ElevadorService");

		const obj = sinon.stub(elevadorServiceInstace, "updateElevador").returns(Result.ok<IElevadorDTO>(body as IElevadorDTO));

		const ctrl = new ElevadorController(elevadorServiceInstace as IElevadorService);
		await ctrl.updateElevador(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 201);
	});

	it('elevadorController + elevadorService integration test using spy on elevadorService, success creation case', async function () {		
		// Arrange
        let body = {
			"id" : "123",
			"descricao": "Elevador super lento",
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
		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").returns(null);

		sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
			}).getValue())
		}));

		let elevadorServiceInstance = Container.get("ElevadorService");		
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

	// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "descricao": "Elevador super lento",
		"numeroSerie": "11111",
		"modelo": "Azal",
		"marca": "Otis",
		"pisosServidos": ["1", "2", "3"],
		"numeroIdentificativo": 100}));
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({name: req.body.name}));
	});


	it('elevadorController + elevadorService integration test using spy on elevadorService, unsuccess creation test', async function () {		
		// Arrange
        let body = {
			"id" : "123",
			"descricao": "Elevador super lento",
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
		sinon.stub(elevadorRepoInstance, "findByNumeroIdentificativo").returns(new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
			}).getValue())
		}));

		// Isto não vai correr porque é suposto falhar na verificação de existência do prédio.
		sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({
			"descricao": "Elevador super lento",
			"numeroSerie": "11111",
			"modelo": "Azal",
			"marca": "Otis",
			"pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100
			}).getValue())
		}));

		let elevadorServiceInstance = Container.get("ElevadorService");		
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

	// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 403);
	});

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


});


