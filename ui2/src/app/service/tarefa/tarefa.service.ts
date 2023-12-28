import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarefa } from '../../model/tarefa';
import { Aprovacao } from '../../model/aprovacao';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private LogisticAPI_URL = 'http://localhost:3000/api/tarefaAprovacao';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createTarefa(tarefa: Tarefa) {
    const headers = { 'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*', 'authorization': 'Bearer ' + localStorage.getItem("token") };

    const body = JSON.stringify(tarefa);
    console.log(body);

    return this.http.post<Tarefa>(this.LogisticAPI_URL + "/requisitar", body, {'headers':headers , observe: 'response'})

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getTarefas(): Observable<Tarefa[]> {
    const edificios = this.http.get<Tarefa[]>(this.LogisticAPI_URL+ "/listTarefas");

    return edificios;
  }
  
  


}
