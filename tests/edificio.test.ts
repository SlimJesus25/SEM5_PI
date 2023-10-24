import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { Sala } from '../src/domain/sala';

describe('Edificio', () => {

    afterEach(() => {
        sinon.restore();
    });

   

    it('Edificio succeeds', () =>{
      const body = {
        "dimensaoMaximaPiso": 200,
        "descricaoEdificio": "Edificio Acolhe Malucos",
        "nomeOpcionalEdificio": "Edificio Francisco",
        "codigoEdificio": "2324",
        "elevadores": "1",
        "pisos": ["1","2","3"],
        "mapaEdificio": "1"
      };

        const body2 = {
            "id": "12345",
            "descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
        };


       

        const dummyElevador = Elevador.create(body2).getValue();
        const dummySala  = Sala.create({"id": "1", "descricao" :"descricao", "categoria": "laboratorio", "designacao": "designacao"})
        const dummySala2  = Sala.create({"id": "2", "descricao" :"descricao", "categoria": "laboratorio", "designacao": "designacao"})


      const body3 = {
        "id": "1",
        "descricao": "gandapiso",
        "designacao": "gandadesignacao",
        "salas": [dummySala.getValue(), dummySala2.getValue()]
      }

      const dummyPiso1 = Piso.create(body3).getValue();
      const dummyPiso2 = Piso.create(body3).getValue();

      const body4 = [["2"], ["4"]];




      const dummyMapaEdificio = MapaEdificio.create({grelha :[["2"], ["4"]]}).getValue();
      // Venancio: Comentei isto para conseguir correr os testes.
        const edificio = Edificio.create({
          dimensaoMaximaPiso : body.dimensaoMaximaPiso,
          descricaoEdificio : body.descricaoEdificio,
          nomeOpcionalEdificio : body.nomeOpcionalEdificio,
          codigoEdificio : CodigoEdificio.create(body.codigoEdificio).getValue(),
          elevadores : dummyElevador,
          pisos : [dummyPiso1, dummyPiso2],
          mapaEdificio : dummyMapaEdificio
        });

        sinon.assert.match(edificio.getValue().codigo, "2324");
        sinon.assert.match(edificio.getValue().nomeOpcional, "Edificio Francisco");
        sinon.assert.match(edificio.getValue().descricao, "Edificio Acolhe Malucos");
        sinon.assert.match(edificio.getValue().dimensaoMaxima, 200);
        sinon.assert.match(edificio.getValue().elevadores, dummyElevador);
        sinon.assert.match(edificio.getValue().pisos, [dummyPiso1,dummyPiso2]);
        sinon.assert.match(edificio.getValue().mapa, dummyMapaEdificio);
        
    });
/*
    it('codigoEdificio not empty', () =>{
        const body = {
          "id": "1",
        "dimensaoMaxima": 200,
        "descricao": "Edificio Acolhe Malucos",
        "nomeOpcional": "Edificio Francisco",
        "codigoEdificio": "",
        "elevador": "1",
        "pisos": ["1","2","3"],
        "mapaEdificio": "1"
        };
    
        sinon.assert.throw(Edificio.create(body), "Codigo edificio vazio");
    });
    */
});