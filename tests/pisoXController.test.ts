import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import PisoController from "../src/controllers/pisoController";
import IPisoService from "../src/services/IServices/IPisoService";
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';

describe('piso controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {

		Container.reset();

		// EDIFICIO
		let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
		Container.set("edificioSchema", edificioSchemaInstance);

		let edificioRepoClass = require("../src/repos/edificioRepo").default;
		let edificioRepoInstance = Container.get(edificioRepoClass);
		Container.set("EdificioRepo", edificioRepoInstance);

		// PISO
		let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
		Container.set("pisoSchema", pisoSchemaInstance);

		let pisoRepoClass = require("../src/repos/pisoRepo").default;
		let pisoRepoInstance = Container.get(pisoRepoClass);
		Container.set("PisoRepo", pisoRepoInstance);

		let pisoServiceClass = require("../src/services/pisoService").default;
		let pisoServiceInstance = Container.get(pisoServiceClass);
		Container.set("PisoService", pisoServiceInstance);

	});

	afterEach(function () {
		sandbox.restore();
	});

	it('listPisos: pisoController + pisoService integration test using spy on pisoService, success case', async function () {
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

		//	

		const dummyEdificio = Edificio.create({
			"dimensaoMaximaPiso": 200,
			"descricaoEdificio": "Edificio Acolhe Malucos",
			"nomeOpcionalEdificio": "Departamento de Engenharia Informática",
			"codigoEdificio": CodigoEdificio.create("B").getValue(),
		}).getValue();

		const piso1 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: dummyEdificio
		};

		const piso2 = {
			id: 't12345',
			descricao: "Piso de gabinetes e aulas laboratoriais",
			designacao: "B2",
			edificio: dummyEdificio
		};

		let pisos: Piso[] = [Piso.create(piso1).getValue(),Piso.create(piso2).getValue()];

		let pisoRepoInstance = Container.get("PisoRepo");

		sinon.stub(pisoRepoInstance, "findByEdificio").resolves(pisos);

		let pisoServiceInstance = Container.get("PisoService");
		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "listPisos");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
			[sinon.match({
			descricao: "Piso de gabinetes e aulas teórica-práticas",
			designacao: "B1",
			edificio: "B"}),sinon.match({
			descricao: "Piso de gabinetes e aulas laboratoriais",
			designacao: "B2",
			edificio: "B"
			}
			)])
		);
		sinon.assert.calledOnce(pisoServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ name: req.body.name }));
	});

	it('listPisos: pisoController + pisoService integration test using spy on pisoService, unsuccess case edificio without pisos', async function () {
		// Arrange
		let body = {
			"codigoEdificio": "B",
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			status: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pisoRepoInstance = Container.get("PisoRepo");
		let pisoServiceInstance = Container.get("PisoService");

		sinon.stub(pisoRepoInstance, "findByEdificio").resolves(null);

		const pisoServiceSpy = sinon.spy(pisoServiceInstance, "listPisos");

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		// Act
		await ctrl.listPisos(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.status);
		sinon.assert.calledWith(res.status, 404);
		sinon.assert.calledOnce(pisoServiceSpy);
		sinon.assert.calledWith(pisoServiceSpy, sinon.match({ codigoEdificio: req.body.codigoEdificio }));

	});

});

