import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LogisticAPI_URL = 'http://localhost:5000/api/Users';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  criarUser(user: User) {
    const headers = {'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
    
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<User>(this.LogisticAPI_URL + "/User", body, {'headers':headers , observe: 'response'})

  }
}
