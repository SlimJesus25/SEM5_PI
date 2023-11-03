import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import RoboController from "../src/controllers/roboController";
import { Robo } from '../src/domain/robo';
import { MarcaRobo } from '../src/domain/marcaRobo';
import { CodigoRobo } from '../src/domain/codigoRobo';
import { NumeroSerieRobo } from '../src/domain/numeroSerieRobo';
import { TipoRobo } from '../src/domain/tipoRobo';
import { Tarefa } from '../src/domain/tarefa';
import IRoboService from '../src/services/IServices/IRoboService';

describe('robo controller', function () {
    const sandbox = sinon.createSandbox();


    beforeEach(function () {
        Container.reset();
        let tipoRoboSchemaInstance = require("../src/persistence/schemas/tipoRoboSchema").default;
        Container.set("tipoRoboSchema", tipoRoboSchemaInstance);

        let tipoRoboRepoClass = require("../src/repos/tipoRoboRepo").default;
        let tipoRoboRepoInstance = Container.get(tipoRoboRepoClass);
        Container.set("TipoRoboRepo", tipoRoboRepoInstance);


        ////////////////////////////

        let roboSchemaInstance = require("../src/persistence/schemas/roboSchema").default;
        Container.set("roboSchema", roboSchemaInstance);

        let roboRepoClass = require("../src/repos/roboRepo").default;
        let roboRepoInstance = Container.get(roboRepoClass);
        Container.set("RoboRepo", roboRepoInstance);

        let roboServiceClass = require("../src/services/roboService").default;
        let roboServiceInstance = Container.get(roboServiceClass);
        Container.set("RoboService", roboServiceInstance);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('listRobos: roboController + roboService integration test using spy on roboService, success case', async function () {
        // Arrange
        let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        const tarefa1 = Tarefa.create({
            tipoTarefa: "vigilancia"
        }).getValue();

        const tarefa2 = Tarefa.create({
            tipoTarefa: "transporte"
        }).getValue();

        /*
            tarefas: Tarefa[];
            designacao: string;
            marca: string;
            modelo: string;
        */
        const tipoRobo1 = TipoRobo.create({
            designacao: "Polivalente",
            marca: "Marca 1",
            modelo: "Modelo 1",
            tarefas: [tarefa1, tarefa2]
        }).getValue();

        /*
            estado: string;
            marca: MarcaRobo;
            codigo: CodigoRobo;
            numeroSerie: NumeroSerieRobo;
            nickname: string;
            tipoRobo: TipoRobo;
        */
        const r1 = {
            id: 't12345',
            estado: "inibido",
            marca: MarcaRobo.create("Samsung").getValue(),
            codigo: CodigoRobo.create("0078954321654321").getValue(),
            numeroSerie: NumeroSerieRobo.create("AZERTYUIOPQSDCVFGHJKLMW").getValue(),
            nickname: "Roberto",
            tipoRobo: tipoRobo1
        };

        const r2 ={
            id: 't12345',
            estado: "inibido",
            marca: MarcaRobo.create("RedHat").getValue(),
            codigo: CodigoRobo.create("00320392930923").getValue(),
            numeroSerie: NumeroSerieRobo.create("IDPJPSJFDPSIJFJPSDJD").getValue(),
            nickname: "José",
            tipoRobo: tipoRobo1
        };

        let robos: Robo[] = [Robo.create(r1).getValue(), Robo.create(r2).getValue()];

        let roboRepoInstance = Container.get("RoboRepo");

        sinon.stub(roboRepoInstance, "findAll").resolves(robos);

        let roboServiceInstance = Container.get("RoboService");
        const roboServiceSpy = sinon.spy(roboServiceInstance, "listRobos");

        const ctrl = new RoboController(roboServiceInstance as IRoboService);

        // Act
        await ctrl.listRobos(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            [sinon.match({
            codigo: "0078954321654321",
            estado: "inibido",
            marca: "Samsung",
            nickname: "Roberto",
            numeroSerie: "AZERTYUIOPQSDCVFGHJKLMW",
            tipoRobo: "Polivalente"
        }),sinon.match({
            codigo: "00320392930923",
            estado: "inibido",
            marca: "RedHat",
            nickname: "José",
            numeroSerie: "IDPJPSJFDPSIJFJPSDJD",
            tipoRobo: "Polivalente"
        }
        )])
        );
        sinon.assert.calledOnce(roboServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(roboServiceSpy);
    });

    it('listRobos: roboController + roboService integration test using spy on roboService, unsuccess case', async function () {
        // Arrange
        let body = {
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            status: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let roboRepoInstance = Container.get("RoboRepo");

        sinon.stub(roboRepoInstance, "findAll").resolves([]);

        let roboServiceInstance = Container.get("RoboService");
        const roboServiceSpy = sinon.spy(roboServiceInstance, "listRobos");

        const ctrl = new RoboController(roboServiceInstance as IRoboService);

        // Act
        await ctrl.listRobos(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
    });
});