import * as sinon from 'sinon';
import { Elevador } from '../src/domain/elevador'
import { error } from 'console';
import { Edificio } from '../src/domain/edificio';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { Piso } from '../src/domain/piso';

describe('Elevador', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('Elevador succeeds', () => {
	
		const edificio = Edificio.create({
			dimensaoMaximaPiso: [100, 100],
			descricaoEdificio: "Edificio Acolhe Malucos",
			nomeOpcionalEdificio: "Departamento de Engenharia Informática",
			codigoEdificio: CodigoEdificio.create("B").getValue(),
		}).getValue();
	
		const dummyPiso = Piso.create({
			"descricao": "Piso de gabinetes e aulas teórica-práticas",
			"designacao": "B1",
			"edificio": edificio
		}).getValue();
	
		const dummyPiso2 = Piso.create({
			"descricao": "Piso de gabinetes e aulas laboratoriais",
			"designacao": "B2",
			"edificio": edificio
		}).getValue();
	
		const b = {
			id: 't12345',
			descricao: "Elevador super rápido",
			numeroSerie: "11111",
			modelo: "Azur",
			marca: "Otis",
			pisosServidos: [dummyPiso, dummyPiso2],
			numeroIdentificativo: 155,
			edificio: edificio,
		};

        const elevador = Elevador.create(b);

        sinon.assert.match(elevador.getValue().descricao, "Elevador super rápido");
        sinon.assert.match(elevador.getValue().numeroSerie, "11111");
        sinon.assert.match(elevador.getValue().modelo, "Azur");
        sinon.assert.match(elevador.getValue().marca, "Otis");
        sinon.assert.match(elevador.getValue().pisosServidos, ["B1", "B2"]);
        sinon.assert.match(elevador.getValue().numeroIdentificativo, 155);
    });

    it('numeroSerie not empty', () => {
        const body = {
            "id": "12345",
            "descricao": "Elevador super rápido",
            "numeroSerie": "",
            "modelo": "Azal",
            "marca": "Otis",
            "pisosServidos": ["1", "2", "3"],
            "numeroIdentificativo": 100
        };

        //sinon.assert.throw(Elevador.create(body), "Numero série vazio");
    });
});