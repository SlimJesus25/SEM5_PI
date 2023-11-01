import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';

describe('Piso', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Piso succeeds', () => {

    const dummyEdificio = Edificio.create({
      codigoEdificio: CodigoEdificio.create("B").getValue(),
      nomeOpcionalEdificio: "Informatica",
      descricaoEdificio: "Grande",
      dimensaoMaximaPiso: 100
    }).getValue();

    const p = {
      descricao: "Primeiro piso do edificio B",
      designacao: "Piso 1",
      edificio: dummyEdificio
    };

    const piso = Piso.create(p);

    sinon.assert.match(piso.getValue().descricao, "Primeiro piso do edificio B");
    sinon.assert.match(piso.getValue().designacao, "Piso 1");
    sinon.assert.match(piso.getValue().edificio.codigo, "B");
  });
});