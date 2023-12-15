import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import AprovacaoController from '../src/controllers/aprovacaoController';
import IAprovacaoService from '../src/services/IServices/IAprovacaoService';
import IAprovacaoDTO from '../src/dto/IAprovacaoDTO';
import { Tarefa } from '../src/domain/tarefa'
import { Aprovacao } from '../src/domain/aprovacao'

describe('aprovacao controller', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {

        Container.reset();

        // Tarefa
        let tarefaSchemaInstance = require("../src/persistence/schemas/tarefaSchema").default;
        Container.set("tarefaSchema", tarefaSchemaInstance);

        let tarefaRepoClass = require("../src/repos/tarefaRepo").default;
        let tarefaRepoInstance = Container.get(tarefaRepoClass);
        Container.set("TarefaRepo", tarefaRepoInstance);

        // Aprovacao
        let aprovacaoSchemaInstance = require("../src/persistence/schemas/aprovacaoSchema").default;
        Container.set("aprovacaoSchema", aprovacaoSchemaInstance);

        let aprovacaoRepoClass = require("../src/repos/aprovacaoRepo").default;
        let aprovacaoRepoInstance = Container.get(aprovacaoRepoClass);
        Container.set("AprovacaoRepo", aprovacaoRepoInstance);

        let aprovacaoServiceClass = require("../src/services/aprovacaoService").default;
        let aprovacaoServiceInstance = Container.get(aprovacaoServiceClass);
        Container.set("AprovacaoService", aprovacaoServiceInstance);

    });

    afterEach(function () {
        sandbox.restore();
    });


    it('aprovacaoController for aprovar returns status 403 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.body = 'Erro: Tarefa não encontrada!'

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "aceitarRequisicao").resolves(Result.fail<IAprovacaoDTO>("Erro: Tarefa não encontrada!"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
        sinon.assert.calledWith(obj, req.body);
    });

    it('aprovacaoController for rejeitar returns status 403 unsuccess case', async function () {
        let req: Partial<Request> = {};
        req.body = 'Erro: Tarefa não encontrada!'

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        const obj = sinon.stub(aprovacaoServiceInstace, "recusarRequisicao").resolves(Result.fail<IAprovacaoDTO>("Erro: Tarefa não encontrada!"));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
        sinon.assert.calledWith(obj, req.body);
    });

    it('aprovacaoController for aprovar returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IAprovacaoDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "aceitarRequisicao").resolves(Result.ok<IAprovacaoDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('aprovacaoController for rejeitar returns status 200 success case', async function () {
        let req: Partial<Request> = {};
        req.body = {
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let res: Partial<Response> = {
            status: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };

        let aprovacaoServiceInstace = Container.get("AprovacaoService");

        let dto = req.body as IAprovacaoDTO;

        const obj = sinon.stub(aprovacaoServiceInstace, "recusarRequisicao").resolves(Result.ok<IAprovacaoDTO>(dto));

        const ctrl = new AprovacaoController(aprovacaoServiceInstace as IAprovacaoService);
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });


    it('aprovarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "não aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(null);

        // Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
        sinon.stub(aprovacaoRepoInstance, "save").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1",
        }));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

    it('recusarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, success', async function () {
        // Arrange
        let body = {
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T1",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "não aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(null);

        // Não interessa o que retorna o null, o serviço não dá uso e desta forma é possível assegurar que funciona corretamente.
        sinon.stub(aprovacaoRepoInstance, "save").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "recusarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.recusarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "estado": "não aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        }));
        sinon.assert.calledOnce(aprovacaoServiceSpy);
        //sinon.assert.calledTwice(roleServiceSpy);
        sinon.assert.calledWith(aprovacaoServiceSpy, sinon.match({ name: req.body.name }));
    });

    it('aceitarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case tarefa already answered', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T2",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        const aprovacao = Aprovacao.create(b).getValue();

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(tarefa);

        sinon.stub(aprovacaoRepoInstance, "findByTarefaName").resolves(aprovacao);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        //const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
    });

    it('aceitarRequisicao: aprovacaoController + aprovacaoService integration test using spy on aprovacaoService, unsuccess case tarefa doesnt exist', async function () {
        // Arrange
        let body = {
            "estado": "aceite",
            "requisitante": "João Dias",
            "tipoDispositivo": "Polivalente",
            "tarefa": "T1"
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let aprovacaoRepoInstance = Container.get("AprovacaoRepo");
        let tarefaRepoInstance = Container.get("TarefaRepo");

        const tarefa = Tarefa.create({
            "designacaoTarefa": "T3",
            "tipoTarefa": "pick up and delivery",
            "pontoInicial": "B203T",
            "pontoTermino": "C101T"
        }).getValue();

        const b = {
            estado: "aceite",
            requisitante: "João Dias",
            tipoDispositivo: "Polivalente",
            tarefa: tarefa,
        };

        sinon.stub(tarefaRepoInstance, "findByDesignacao").resolves(null);

        let aprovacaoServiceInstance = Container.get("AprovacaoService");
        //const aprovacaoServiceSpy = sinon.spy(aprovacaoServiceInstance, "aceitarRequisicao");

        const ctrl = new AprovacaoController(aprovacaoServiceInstance as IAprovacaoService);

        // Act
        await ctrl.aceitarRequisicao(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 403);
    });

});


