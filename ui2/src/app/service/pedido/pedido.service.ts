import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePedido } from '../../model/createPedido';
import { Pedido } from '../../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private LogisticAPI_URL = 'http://localhost:3000/api/pedidos';  // URL to web api

  constructor(private http: HttpClient) { }

  getPedidosPendentes(): Observable<Pedido[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const pedidos = this.http.get<Pedido[]>(this.LogisticAPI_URL + "/getAllPedidosPendentes", {headers});

    return pedidos;
  }

  aprovarPedido(pedido: Pedido) {
    
    const aprovarPedido = this.LogisticAPI_URL + "/aprovarPedido/" + pedido.id;
    const pedidoReq = this.http.patch<Pedido>(aprovarPedido, {});
    return pedidoReq;
  }

  recusarPedido(pedido: Pedido) {
    const recusarPedido = this.LogisticAPI_URL + "/recusarPedido/" + pedido.id;
    const pedidoReq = this.http.patch<Pedido>(recusarPedido, {});
    return pedidoReq;
  }

  criarPedido(utente: CreatePedido) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token"),
    'Access-Control-Allow-Origin': '*',
  };
    
    const body = JSON.stringify(utente);
    console.log(body);
    return this.http.post<CreatePedido>(this.LogisticAPI_URL + "/criarPedido", body, {'headers':headers , observe: 'response'})

  }
}
