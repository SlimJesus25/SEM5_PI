import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user';
import { CreateUser } from '../../model/createUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LogisticAPI_URL = 'http://localhost:3000/api/users';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  criarUser(user: CreateUser) {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    const body = JSON.stringify(user);
    return this.http.post<User>(this.LogisticAPI_URL + "/criarUser", body, { 'headers': headers, observe: 'response' })

  }

  login(email: string, password: string) {
    const loginUrl = this.LogisticAPI_URL + "/login/" + email+ "/"+ password;
    const login = this.http.get(loginUrl);
    return login;
  }
}
