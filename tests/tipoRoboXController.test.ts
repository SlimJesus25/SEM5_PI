import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import TipoRoboController from "../src/controllers/tipoRoboController";
import { Robo } from '../src/domain/robo';
import { MarcaRobo } from '../src/domain/marcaRobo';
import { CodigoRobo } from '../src/domain/codigoRobo';
import { NumeroSerieRobo } from '../src/domain/numeroSerieRobo';
import { TipoRobo } from '../src/domain/tipoRobo';
import { Tarefa } from '../src/domain/tarefa';
import ITipoRoboService from '../src/services/IServices/ITipoRoboService';

describe('robo controller', function () {
    const sandbox = sinon.createSandbox();


    beforeEach(function () {
        Container.reset();

        let tarefaSchemaInstance = require("../src/persistence/schemas/tarefaSchema").default;
        Container.set("tarefaSchema", tarefaSchemaInstance);

        let tarefaRepoClass = require("../src/repos/tarefaRepo").default;
        let tarefaRepoInstance = Container.get(tarefaRepoClass);
        Container.set("TarefaRepo", tarefaRepoInstance);

        let tipoRoboSchemaInstance = require("../src/persistence/schemas/tipoRoboSchema").default;
        Container.set("tipoRoboSchema", tipoRoboSchemaInstance);

        let tipoRoboRepoClass = require("../src/repos/tipoRoboRepo").default;
        let tipoRoboRepoInstance = Container.get(tipoRoboRepoClass);
        Container.set("TipoRoboRepo", tipoRoboRepoInstance);

        let tipoRoboServiceClass = require("../src/services/tipoRoboService").default;
        let tipoRoboServiceInstance = Container.get(tipoRoboServiceClass);
        Container.set("TipoRoboService", tipoRoboServiceInstance);

    });

    afterEach(function () {
        sandbox.restore();
    });

    it('createTipoRobo: tipoRoboController + tipoRoboService integration test using spy on tipoRoboService, success case', async function () {
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


        let tipoRoboRepoInstance = Container.get("TipoRoboRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        sinon.stub(tipoRoboRepoInstance, "findByDesignacao").resolves(null);

        sinon.stub(tarefaRepoInstance, "findByDesignacao").onCall(0).resolves(tarefa1).onCall(1).resolves(tarefa2);

        let tipoRoboServiceInstance = Container.get("TipoRoboService");
        const roboServiceSpy = sinon.spy(tipoRoboRepoInstance, "createTipoRobo");

        const ctrl = new TipoRoboController(tipoRoboServiceInstance as ITipoRoboService);

        // Act
        await ctrl.createTipoRobo(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "designacao": "Polivalente",
            "marca": "Marca 1",
            "modelo": "Modelo 1",
            "tarefas": [tarefa1.tipoTarefa, tarefa2.tipoTarefa]
        }));
        sinon.assert.calledOnce(roboServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(roboServiceSpy, sinon.match({ name: req.body.name }));
    });
});