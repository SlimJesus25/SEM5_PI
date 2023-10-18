import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ISalaService from "../src/services/IServices/ISalaService";
import SalaController from "../src/controllers/salaController";
import ISalaDTO from '../src/dto/ISalaDTO';
import { Sala } from '../src/domain/sala';

describe('sala controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let salaSchemaInstance = require("../src/persistence/schemas/salaSchema").default;
		Container.set("salaSchema", salaSchemaInstance);

		let salaRepoClass = require("../src/repos/salaRepo").default;
		let salaRepoInstance = Container.get(salaRepoClass);
		Container.set("SalaRepo", salaRepoInstance);

		let salaServiceClass = require("../src/services/salaService").default;
		let salaServiceInstance = Container.get(salaServiceClass);
		Container.set("SalaService", salaServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('salaController unit test using salaService stub', async function () {
		// Arrange
        let body = { "name":'sala1' };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let salaServiceInstance = Container.get("SalaService");
		sinon.stub(salaServiceInstance, "createSala").returns( Result.ok<ISalaDTO>( {
        "id":"123",
        "designacao": req.body.designacao,
        "descricao": req.body.descricao,
        "categoria": req.body.categoria} ));

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123"
        , "designacao": req.body.designacao
        , "descricao": req.body.descricao
        , "categoria": req.body.categoria}));
	});


    it('salaController + salaService integration test using salaRepoistory and Sala stubs', async function () {	
		// Arrange	
        let body = { "name":'sala1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Sala, "create").returns(Result.ok({"id":"123"
        , "designacao": req.body.designacao
        , "descricao": req.body.descricao
        , "categoria": req.body.categoria}));

		let salaRepoInstance = Container.get("SalaRepo");
		sinon.stub(salaRepoInstance, "save").returns(new Promise<Sala>((resolve, reject) => {
			resolve(Sala.create({"id":"123"
            , "designacao": req.body.designacao
            , "descricao": req.body.descricao
            , "categoria": req.body.categoria}).getValue())
		}));

		let salaServiceInstance = Container.get("SalaService");

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123"
        , "designacao": req.body.designacao
        , "descricao": req.body.descricao
        , "categoria": req.body.categoria}));
	});


    it('salaController + salaService integration test using spy on salaService', async function () {		
		// Arrange
        let body = { "name":'sala1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let salaRepoInstance = Container.get("SalaRepo");
		sinon.stub(salaRepoInstance, "save").returns(new Promise<Sala>((resolve, reject) => {
			resolve(Sala.create({"id":"123"
            , "designacao": req.body.designacao
            , "descricao": req.body.descricao
            , "categoria": req.body.categoria}).getValue())
		}));

		let salaServiceInstance = Container.get("SalaService");		
		const salaServiceSpy = sinon.spy(salaServiceInstance, "createSala");

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123"
        , "designacao": req.body.designacao
        , "descricao": req.body.descricao
        , "categoria": req.body.categoria}));
		sinon.assert.calledOnce(salaServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(salaServiceSpy, sinon.match({name: req.body.name}));
	});


    it('salaController unit test using salaService mock', async function () {		
		// Arrange
        let body = { "name":'sala1' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let salaServiceInstance = Container.get("SalaService");		
		const salaServiceMock = sinon.mock(salaServiceInstance, "createSala")
		salaServiceMock.expects("createSala")
			.once()
			.withArgs(sinon.match({name: req.body.name}))
			.returns(Result.ok<ISalaDTO>( {"id":"123"
            , "designacao": req.body.designacao
            , "descricao": req.body.descricao
            , "categoria": req.body.categoria} ));

		const ctrl = new SalaController(salaServiceInstance as ISalaService);

		// Act
		await ctrl.createSala(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		salaServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123"
        , "designacao": req.body.designacao
        , "descricao": req.body.descricao
        , "categoria": req.body.categoria}));
	});
});


