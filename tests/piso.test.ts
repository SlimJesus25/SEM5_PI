import * as sinon from 'sinon';
import { Edificio } from '../src/domain/edificio'
import { error } from 'console';
import { Elevador } from '../src/domain/elevador';
import { Piso } from '../src/domain/piso';
import { CodigoEdificio } from '../src/domain/codigoEdificio';
import { MapaEdificio } from '../src/domain/mapaEdificio';
import { Sala } from '../src/domain/sala';
import { CategoriaSala } from '../src/domain/categoriaSala';

describe('Piso', () => {

    afterEach(() => {
        sinon.restore();
    });

   

    it('Piso succeeds', () =>{
     

        const dummySala  = Sala.create({descricaoSala :"descricao", categoriaSala: CategoriaSala.laboratorio, designacaoSala: "designacao"});
        const dummySala2  = Sala.create({descricaoSala :"descricao", categoriaSala: CategoriaSala.laboratorio, designacaoSala: "designacao2"});

      const body3 = {
        "id": "1",
        "descricao": "gandapiso",
        "designacao": "gandadesignacao",
        "salas": [dummySala.getValue(), dummySala2.getValue()]
      }

      const piso = Piso.create(body3).getValue();
     


        sinon.assert.match(piso.descricao, "gandapiso");
        sinon.assert.match(piso.salas, [dummySala.getValue(), dummySala2.getValue()]);
        sinon.assert.match(piso.designacao, "gandadesignacao");
        
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