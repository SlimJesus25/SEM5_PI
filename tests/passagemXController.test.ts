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
		const dummyMapaEdificio = MapaEdificio.create({
			grelha: [["2"], ["4"]]
		}).getValue();
	
		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
			mapaEdificio: dummyMapaEdificio
		}).getValue();
	
		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio1
		}).getValue();
	
		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1
		}).getValue();

		//
	
		const dummyMapaEdificio2 = MapaEdificio.create({
			grelha: [["2"], ["4"]]
		}).getValue();
	
		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
			mapaEdificio: dummyMapaEdificio2
		}).getValue();
	
		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "C1",
			"edificio": edificio2
		}).getValue();
	
		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "C2",
			"edificio": edificio2
		}).getValue();
	
		const passagem = Passagem.create({
			designacao: "B2_C2",
			edificioA: edificio1,
			edificioB: edificio2,
			pisoA: dummyPiso2,
			pisoB: dummyPiso4
		}).getValue();

		let passagens: Passagem[] = [passagem];

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
			"designacao": "B2_C2",
			"edificioDestino": "C",
			"edificioOrigem": "B",
			"pisoDestino": "C2",
			"pisoOrigem": "B2"
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
		//	
		const dummyMapaEdificio = MapaEdificio.create({
			grelha: [["2"], ["4"]]
		}).getValue();
	
		const edificio1 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
			mapaEdificio: dummyMapaEdificio
		}).getValue();
	
		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio1
		}).getValue();
	
		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio1
		}).getValue();

		//
	
		const dummyMapaEdificio2 = MapaEdificio.create({
			grelha: [["2"], ["4"]]
		}).getValue();
	
		const edificio2 = Edificio.create({
			dimensaoMaximaPiso: 200,
			descricaoEdificio: "Edificio principal de engenharia civil",
			nomeOpcionalEdificio: "Departamento de Engenharia Civil",
			codigoEdificio: CodigoEdificio.create("C").getValue(),
			mapaEdificio: dummyMapaEdificio2
		}).getValue();
	
		const dummyPiso3 = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "C1",
			"edificio": edificio2
		}).getValue();
	
		const dummyPiso4 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "C2",
			"edificio": edificio2
		}).getValue();
	
		const passagem = Passagem.create({
			designacao: "B2_C2",
			edificioA: edificio1,
			edificioB: edificio2,
			pisoA: dummyPiso2,
			pisoB: dummyPiso4
		}).getValue();

		let passagens: Passagem[] = [passagem];

		let passagemRepoInstance = Container.get("PassagemRepo");
		let edificioRepoInstance = Container.get("EdificioRepo");

		sinon.stub(edificioRepoInstance, "findByCodigo").onCall(0).resolves(edificio1).onCall(1).resolves(null);

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


