import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoRobo } from '../../model/tipoRobo';

@Injectable({
  providedIn: 'root'
})
export class TipoRoboService {
  private LogisticAPI_URL = 'http://localhost:3000/api/tipoRobo';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createTipoRobo(tipoRobo: TipoRobo) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(tipoRobo);
    console.log(body);

    return this.http.post<TipoRobo>(this.LogisticAPI_URL + "/createTipoRobo", body, {'headers':headers , observe: 'response'})

  }

  getTipoRobo(): Observable<TipoRobo[]> {
    const tiposRobo = this.http.get<TipoRobo[]>(this.LogisticAPI_URL+ "/listTipoRobo");

    return tiposRobo;
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

    updateTipoRobo(tipoRobo: TipoRobo) {

        const updateURL = this.LogisticAPI_URL;

        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(tipoRobo);
        console.log(body);
       return this.http.put<TipoRobo>(updateURL + "/updateTipoRobo", body, { 'headers': headers, observe: 'response' })
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}
