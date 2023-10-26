import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ElevadorController from "../src/controllers/elevadorController";
import IElevadorDTO from '../src/dto/IElevadorDTO';
import IEdificioDTO from '../src/dto/IEdificioDTO';

import IEdificioService from "../src/services/IServices/IEdificioService";
import EdificioController from "../src/controllers/edificioController";
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';


describe('edificio controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {

		// EDIFICIO
		Container.reset();
		let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);

		let edificioServiceClass = require("../src/services/edificioService").default;
		let edificioServiceInstance = Container.get(edificioServiceClass);
		Container.set("EdificioService", edificioServiceInstance);


		// ELEVADOR
		let elevadorSchemaInstance = require("../src/persistence/schemas/elevadorSchema").default;
		Container.set("elevadorSchema", elevadorSchemaInstance);

		let elevadorRepoClass = require("../src/repos/elevadorRepo").default;
		let elevadorRepoInstance = Container.get(elevadorRepoClass);
		Container.set("ElevadorRepo", elevadorRepoInstance);

		//PISO
		let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);	
    });

	afterEach(function() {
		sandbox.restore();
	});

	/*
    it('elevadorController unit test using elevadorService stub', async function () {
		// Arrange
        let body = { "descricao": "Elevador super rápido",
		"numeroSerie": "11111",
		 "modelo": "Azal",
		  "marca": "Otis",
		   "pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100 };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstance = Container.get("ElevadorService");
		sinon.stub(elevadorServiceInstance, "createElevador").returns( Result.ok<IElevadorDTO>( {"id":"123", "descricao": "Elevador super rápido",
		"numeroSerie": "11111",
		 "modelo": "Azal",
		  "marca": "Otis",
		   "pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100 } ));

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "descricao": "Elevador super rápido",
		"numeroSerie": "11111",
		 "modelo": "Azal",
		  "marca": "Otis",
		   "pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100}));

		/*let body2 = { "name":"elevador525"};
		let req2: Partial<Request> = {};
		req2.body = body2;
		let res2: Partial<Response> = {
			json: sinon.spy()
		};

		let next2: Partial<NextFunction> = () => {};

		let elevadorServiceInstance2 = Container.get("ElevadorService");
		sinon.stub(elevadorServiceInstance2, "updateElevador").returns( Result.ok<IElevadorDTO>( {"id":"123", "descricao": "Elevador super rápido",
		"numeroSerie": "11111",
		 "modelo": "Azal",
		  "marca": "Otis",
		   "pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100 } ));

		const ctrl2 = new ElevadorController(elevadorServiceInstance2 as IElevadorService);

		// Act
		await ctrl2.updateElevador(<Request>req2, <Response>res2, <NextFunction>next2);

		// Assert
		sinon.assert.calledOnce(res2.json);
		sinon.assert.calledWith(res2.json, sinon.match({ "designacao": req2.body.name,"id": "123"}));

	});


    it('elevadorController + elevadorService integration test using elevadorRepoistory and Elevador stubs', async function () {	
		// Arrange	
        let body = { "descricao": "Elevador super rápido",
		"numeroSerie": "11111",
		 "modelo": "Azal",
		  "marca": "Otis",
		   "pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevador, "create").returns(Result.ok({"id":"123", "descricao": "Elevador super rápido",
		"numeroSerie": "11111",
		 "modelo": "Azal",
		  "marca": "Otis",
		   "pisosServidos": ["1", "2", "3"],
			"numeroIdentificativo": 100}));

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({"id":"123", "descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100 }).getValue())
		}));

		let elevadorServiceInstance = Container.get("ElevadorService");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","designacao": req.body.name}));
	});


    it('elevadorController + elevadorService integration test using spy on elevadorService', async function () {		
		// Arrange
        let body = { "name":'elevador1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({"id":"123", "descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100 }).getValue())
		}));

		let elevadorServiceInstance = Container.get("ElevadorService");		
		const elevadorServiceSpy = sinon.spy(elevadorServiceInstance, "createElevador");

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","designacao": req.body.name}));
		sinon.assert.calledOnce(elevadorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(elevadorServiceSpy, sinon.match({name: req.body.name}));
	});
	*/

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
