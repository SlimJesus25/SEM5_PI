import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IElevadorService from "../src/services/IServices/IElevadorService";
import ElevadorController from "../src/controllers/elevadorController";
import IElevadorDTO from '../src/dto/IElevadorDTO';
import { Elevador } from '../src/domain/elevador';

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

    it('elevadorController unit test using elevadorService stub', async function () {
		// Arrange
        let body = { "name":'elevador1' };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstance = Container.get("ElevadorService");
		sinon.stub(elevadorServiceInstance, "createElevador").returns( Result.ok<IElevadorDTO>( {"id":"123", "designacao": req.body.name} ));

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "designacao": req.body.name,"id": "123"}));
	});


    it('elevadorController + elevadorService integration test using elevadorRepoistory and Elevador stubs', async function () {	
		// Arrange	
        let body = { "name":'elevador1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevador, "create").returns(Result.ok({"id":"123", "designacao": req.body.name}));

		let elevadorRepoInstance = Container.get("ElevadorRepo");
		sinon.stub(elevadorRepoInstance, "save").returns(new Promise<Elevador>((resolve, reject) => {
			resolve(Elevador.create({"id":"123", "designacao": req.body.name}).getValue())
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
			resolve(Elevador.create({"id":"123", "designacao": req.body.name}).getValue())
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


    it('elevadorController unit test using elevadorService mock', async function () {		
		// Arrange
        let body = { "name":'elevador1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevadorServiceInstance = Container.get("ElevadorService");		
		const elevadorServiceMock = sinon.mock(elevadorServiceInstance, "createElevador")
		elevadorServiceMock.expects("createElevador")
			.once()
			.withArgs(sinon.match({name: req.body.name}))
			.returns(Result.ok<IElevadorDTO>( {"id":"123", "designacao": req.body.name} ));

		const ctrl = new ElevadorController(elevadorServiceInstance as IElevadorService);

		// Act
		await ctrl.createElevador(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		elevadorServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","designacao": req.body.name}));
	});
});


