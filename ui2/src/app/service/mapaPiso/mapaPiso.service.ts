import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapaPiso } from '../../model/mapaPiso';
import { SolucaoCaminho } from '../../model/solucaoCaminho';
import { CaminhoEntrePisos } from '../../model/caminhoEntrePisos';

@Injectable({
  providedIn: 'root'
})
export class MapaPisoService {
  private LogisticAPI_URL = 'http://localhost:3000/api/mapaPiso';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createMapaPiso(mapaPiso: MapaPiso) {
    const headers = {'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Este cabeçalho pode ser ajustado conforme necessário
  };
    
    const body = JSON.stringify(mapaPiso);
    console.log(body);

    return this.http.post<MapaPiso>(this.LogisticAPI_URL + "/createMapaPiso", body, {'headers':headers , observe: 'response'})

  }

  getMapasPiso(): Observable<MapaPiso[]> {
    const mapas = this.http.get<MapaPiso[]>(this.LogisticAPI_URL+ "/listMapasPiso");

    return mapas;
  }

    updateMapaPiso(mapaPiso: MapaPiso) {

        const updateURL = this.LogisticAPI_URL;

        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(mapaPiso);
        console.log(body);
       return this.http.put<MapaPiso>(updateURL + "/updateMapaPiso", body, { 'headers': headers, observe: 'response' })
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  calcularCaminho(caminhoEntrePisos: CaminhoEntrePisos): Observable<SolucaoCaminho> {
    const solucao = this.http.get<SolucaoCaminho>(this.LogisticAPI_URL+ "/caminhoEntrePisos/"+caminhoEntrePisos.destino+"/"+caminhoEntrePisos.posicaoOrigem+"/"+caminhoEntrePisos.origem+"/"+caminhoEntrePisos.posicaoDestino);
    return solucao;
  }


}
