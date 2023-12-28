import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aprovacao } from '../../model/aprovacao';

@Injectable({
  providedIn: 'root'
})
export class AprovacaoService {
  private LogisticAPI_URL = 'http://localhost:3000/api/aprovacao';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
  getAprovacao(): Observable<Aprovacao[]>{
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const requisicoes = this.http.get<Aprovacao[]>(this.LogisticAPI_URL + "/listarTarefasNaoAprovadas",{headers});

    return requisicoes;
    
    /*const aprovacaos = this.http.get<Aprovacao[]>(this.LogisticAPI_URL+ "/listarTarefasNaoAprovadas");
    return aprovacaos;*/
  }
  
  getAprovacaoEstado(estado: string): Observable<Aprovacao[]>{
    const listAprovacaoEstado = this.LogisticAPI_URL + "/pesquisarRequisicaoPorEstado" + "?estado=" + estado;
        const aprovacao =  this.http.get<Aprovacao[]>(listAprovacaoEstado);
        return aprovacao;
  }
  
  getAprovacaoUtente(utente: string): Observable<Aprovacao[]>{
    const listAprovacaoUtente = this.LogisticAPI_URL + "/pesquisarRequisicaoPorUtente" + "?utente=" + utente;
        const aprovacao =  this.http.get<Aprovacao[]>(listAprovacaoUtente);
        return aprovacao;
  }
  
  getAprovacaoTipoDispositivo(tipoDispositivo: string): Observable<Aprovacao[]>{
    
    const listAprovacaoTipoDispositivo = this.LogisticAPI_URL + "/pesquisarRequisicaoPorTipoDispositivo/" + "?tipoDispositivo=" + tipoDispositivo;
        const aprovacao =  this.http.get<Aprovacao[]>(listAprovacaoTipoDispositivo);
        return aprovacao;
  }
  
  aceitarRequisicao(requisicao: Aprovacao){

    const aprovarRequisicao = this.LogisticAPI_URL + "/aceitarRequisicao";
    const body = JSON.stringify(requisicao.tarefa);
    const pedidoReq = this.http.patch<Aprovacao>(aprovarRequisicao, body);
    return pedidoReq;
  }
  
  recusarRequisicao(requisicao: Aprovacao){
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(requisicao);
    console.log(body);
    
    return this.http.patch<Aprovacao>(this.LogisticAPI_URL + "/recusarRequisicao", body, {'headers':headers, observe: 'response'})
  }
  
  
}