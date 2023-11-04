import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';
import { MapaPiso } from '../src/domain/mapaPiso';


describe('MapaPiso', () => {

    afterEach(() => {
        sinon.restore();
    });

    const dummyEdificio = Edificio.create({
        codigoEdificio: CodigoEdificio.create("B").getValue(),
        nomeOpcionalEdificio: "Informatica",
        descricaoEdificio: "Grande",
        dimensaoMaximaPiso: [100,100]
      }).getValue();

    const bodypiso = {
        descricao: "Primeiro piso do edificio B",
        designacao: "Piso 1",
        edificio: dummyEdificio
    }

    const pisodummy = Piso.create(bodypiso);
    

    it('MapaPiso succeeds', () =>{
      const body = {
       mapa : "MAPA DE PISO 100 X 100 COM 5 ENTRADAS E 1 SAÍDA E COM UMA PROFUNDIDADE DE 2" ,
       piso : pisodummy.getValue()
      };

      // Venancio: Comentei isto para conseguir correr os testes.
        const mapaPiso = MapaPiso.create({
            mapa : body.mapa,
            piso : body.piso
        });

        sinon.assert.match(mapaPiso.getValue().mapa, "MAPA DE PISO 100 X 100 COM 5 ENTRADAS E 1 SAÍDA E COM UMA PROFUNDIDADE DE 2");
        sinon.assert.match(mapaPiso.getValue().piso.descricao, pisodummy.getValue().descricao);
    });
});