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
       mapaProfundidade : 100 ,
       mapaLargura : 100 ,
       mapaPiso : [[100, 100]] ,
       mapaSaidaLocalizacao : [12] ,
       mapaElevador :[10, 10] ,
       mapaSaidas : [[10, 10]],
       piso : pisodummy.getValue()
      };

      // Venancio: Comentei isto para conseguir correr os testes.
        const mapaPiso = MapaPiso.create({
            mapaProfundidade : body.mapaProfundidade,
            mapaLargura : body.mapaLargura,
            mapaPiso : body.mapaPiso,
            mapaSaidaLocalizacao : body.mapaSaidaLocalizacao,
            mapaElevador :body.mapaElevador,
            mapaSaidas : body.mapaSaidas,
            piso : body.piso
        });

        sinon.assert.match(mapaPiso.getValue().largura, 100);
        sinon.assert.match(mapaPiso.getValue().profundidade, 100);
        sinon.assert.match(mapaPiso.getValue().saidaLocalizacao, [12]);


    });
});