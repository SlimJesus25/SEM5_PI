import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPassagemService from "../src/services/IServices/IPassagemService";
import PassagemController from "../src/controllers/passagemController";
import IPassagemDTO from '../src/dto/IPassagemDTO';
import IListPassagensEntreEdificiosDTO from '../src/dto/IListPassagensEntreEdificiosDTO';

describe('passagem controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let passagemSchemaInstance = require("../src/persistence/schemas/passagemSchema").default;
		Container.set("passagemSchema", passagemSchemaInstance);

		let passagemRepoClass = require("../src/repos/passagemRepo").default;
		let passagemRepoInstance = Container.get(passagemRepoClass);
		Container.set("PassagemRepo", passagemRepoInstance);

		let passagemServiceClass = require("../src/services/passagemService").default;
		let passagemServiceInstance = Container.get(passagemServiceClass);
		Container.set("PassagemService", passagemServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
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
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let passagemServiceInstace = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstace, "listPassagens").returns(Result.ok<IPassagemDTO[]>(response as IPassagemDTO[]));

		const ctrl = new PassagemController(passagemServiceInstace as IPassagemService);
		await ctrl.listPassagens(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
    });

	//TODO para list pisos com passagem
	it('listPisos com passagens entre edificios', async function () {
        let req: Partial<Request> = {};
		req.body = {
			"codigoEdificio": "B"
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
			status: sinon.spy(),
		};

		let next: Partial<NextFunction> = () => {};

		let passagemServiceInstance = Container.get("PassagemService");

		const obj = sinon.stub(passagemServiceInstance, "listPisos").returns(Result.ok<IPassagemDTO[]>(response as IPassagemDTO[]));

		const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);
		await ctrl.listPisos(<Request>req, <Response> res, <NextFunction> next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(req.body));
    });
	
});


