import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarefa } from '../../model/tarefa';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private LogisticAPI_URL = 'http://localhost:3000/api/tarefa';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createTarefa(tarefa: Tarefa) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(tarefa);
    console.log(body);

    return this.http.post<Tarefa>(this.LogisticAPI_URL + "/createTarefa", body, {'headers':headers , observe: 'response'})

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getTarefas(): Observable<Tarefa[]> {
    const edificios = this.http.get<Tarefa[]>(this.LogisticAPI_URL+ "/listTarefas");

    return edificios;
  }


}
