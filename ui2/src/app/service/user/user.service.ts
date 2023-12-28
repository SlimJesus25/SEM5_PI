import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user';
import { CreateUser } from '../../model/createUser';
import { Utente } from '../../model/Utente';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private LogisticAPI_URL = 'http://localhost:3000/api/users';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  criarUser(user: CreateUser) {
    const headers = {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem("token"),
      'Access-Control-Allow-Origin': '*',
    };

    const body = JSON.stringify(user);
    return this.http.post<User>(this.LogisticAPI_URL + "/criarUser", body, { 'headers': headers, observe: 'response' })
  }

  login(email: string, password: string) {
    const loginUrl = this.LogisticAPI_URL + "/login/" + email + "/" + password;
    const login = this.http.get(loginUrl);
    return login;
  }

  deleteUser(email: string) {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.delete(this.LogisticAPI_URL + "/deleteUser/" + email, { headers });
  }

  atualizarUser(utente: Utente, email: string) {
    const updateURL = this.LogisticAPI_URL + "updateUser/"+ email;
    const headers = {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem("token")
    };
    const body = JSON.stringify(utente);
    return this.http.put<Utente>(updateURL, body, { 'headers': headers, observe: 'response' })
  }


}
