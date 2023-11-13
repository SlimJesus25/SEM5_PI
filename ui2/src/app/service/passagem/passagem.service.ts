import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Passagem } from '../../model/passagem';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {
  private LogisticAPI_URL = 'http://localhost:3000/api/passagem';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createPassagem(passagem: Passagem) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(passagem);
    console.log(body);

    return this.http.post<Passagem>(this.LogisticAPI_URL + "/createPassagem", body, {'headers':headers , observe: 'response'})

  }

  private log(message: string) {
    this.messageService.add(`PassagemService: ${message}`);
  }


}
