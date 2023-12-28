import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../../model/user';
import { CreateUser } from '../../model/createUser';
import { AtualizarUtente } from '../../model/atualizarUtente';

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

  deleteUser() {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.delete(this.LogisticAPI_URL + "/deleteUser", { headers });
  }

  atualizarUser(utente: AtualizarUtente) {
    const updateURL = this.LogisticAPI_URL + "/updateUser";
    const headers = {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem("token")
    };
    const body = JSON.stringify(utente);
    console.log(localStorage.getItem("token"));
    return this.http.put<AtualizarUtente>(updateURL, body, { 'headers': headers, observe: 'response' })
  }

  downloadInfo(): Observable<HttpResponse<Blob>> {
    const downloadUrl = this.LogisticAPI_URL + "/getUserByEmail";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get(downloadUrl, {
      headers: headers,
      observe: 'response',
      responseType: 'blob' // Important: Set the response type to 'blob'
    });
  }


}
