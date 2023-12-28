import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../../model/pedido';
import { CriarPedido } from '../../model/criarPedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private LogisticAPI_URL = 'http://localhost:3000/api/pedidos';  // URL to web api

  constructor(private http: HttpClient) { }

  getPedidosPendentes(): Observable<Pedido[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const pedidos = this.http.get<Pedido[]>(this.LogisticAPI_URL + "/getAllPedidosPendentes",{headers});

    return pedidos;
  }

  aprovarPedido(pedido: Pedido) {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const aprovarPedido = this.LogisticAPI_URL + "/aprovarPedido/" + pedido.id;
    console.log(aprovarPedido);
    console.log(localStorage.getItem("token"));
    const pedidoReq = this.http.patch<Pedido>(aprovarPedido, {headers});
    return pedidoReq;
  }

  recusarPedido(pedido: Pedido) {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const recusarPedido = this.LogisticAPI_URL + "/recusarPedido/" + pedido.id;
    const pedidoReq = this.http.patch<Pedido>(recusarPedido, {headers});
    return pedidoReq;
  }

  criarPedido(utente: CriarPedido) {
    const headers = {'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
    
    const body = JSON.stringify(utente);
    console.log(body);
    return this.http.post<CriarPedido>(this.LogisticAPI_URL + "/criarPedido", body, {'headers':headers , observe: 'response'})
  }
}
