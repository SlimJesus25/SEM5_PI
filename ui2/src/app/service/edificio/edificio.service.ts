import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Edificio } from '../../model/edificio';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  private LogisticAPI_URL = 'http://localhost:3000/api/edificio';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createEdificio(edificio: Edificio) {
    console.log("Ponto 2");
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(edificio);
    console.log(body);

    return this.http.post<Edificio>(this.LogisticAPI_URL + "/createEdificio", body, {'headers':headers , observe: 'response'})

  }

  getEdificios(): Observable<Edificio[]> {
    const edificios = this.http.get<Edificio[]>(this.LogisticAPI_URL+ "/listEdificios");

    return edificios;
  }
/*
  getTruckByID(idNumber: string): Observable<Truck> {
    const truckById = this.LogisticAPI_URL + "/" + idNumber;
    const truck = this.http.get<Truck>(truckById)!;
 
    return truck;
  }

    getTruckByDistance(name: string): Observable<Truck[]> {
        const truckByName = this.LogisticAPI_URL + "/name/" + name;
        const truck = this.http.get<Truck[]>(truckByName)!;

        return truck;
    }
    */

    updateEdificio(edificio: Edificio) {

        const updateURL = this.LogisticAPI_URL;

        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(edificio);
        console.log(body);
        this.http.put<Edificio>(updateURL, body, { 'headers': headers, observe: 'response' })
            .subscribe(
                response => {
                    console.log(response);
                }
            );
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}
