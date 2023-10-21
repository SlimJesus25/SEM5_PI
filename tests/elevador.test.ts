import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador'
import { error } from 'console';

describe('Elevador', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('Elevador succeeds', () =>{
        const body = {
            "id": "12345",
            "descricao": "Elevador super rápido",
			"numeroSerie": "11111",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
        };

        const elevador = Elevador.create(body);

        sinon.assert.match(elevador.getValue().descricao, "Elevador super rápido");
        sinon.assert.match(elevador.getValue().numeroSerie, "11111");
        sinon.assert.match(elevador.getValue().modelo, "Azal");
        sinon.assert.match(elevador.getValue().marca, "Otis");
        sinon.assert.match(elevador.getValue().pisosServidos, ["1", "2", "3"]);
        sinon.assert.match(elevador.getValue().numeroIdentificativo, 100);
    });

    it('numeroSerie not empty', () =>{
        const body = {
            "id": "12345",
            "descricao": "Elevador super rápido",
			"numeroSerie": "",
			 "modelo": "Azal",
			  "marca": "Otis",
			   "pisosServidos": ["1", "2", "3"],
				"numeroIdentificativo": 100
        };
    
        sinon.assert.throw(Elevador.create(body), "Numero série vazio");
    });
});