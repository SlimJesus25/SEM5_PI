import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Piso } from '../../model/piso';

@Injectable({
    providedIn: 'root'
})
export class PisoService {
    private LogisticAPI_URL = 'http://localhost:3000/api/piso';  // URL to web api

    constructor(private http: HttpClient, private messageService: MessageService) { }

    //Metodo para criar piso
    createPiso(piso: Piso) {
        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(piso);
        console.log(body);

        return this.http.post<Piso>(this.LogisticAPI_URL + "/createPiso", body, { 'headers': headers, observe: 'response' })
    }

/*
    listPisos(codigoEdificio: string) {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(codigoEdificio);
        console.log(body);

        return this.http.get<Piso[]>(this.LogisticAPI_URL + "/listPisos", body, { 'headers': headers, observe: 'response' })
    }
    

    listPisos(codigoEdificio: string): Observable<Piso[]> {
        const url = `${this.LogisticAPI_URL}/listPisos`;
        
        // Set up headers (if necessary)
        const headers = { 'Content-Type': 'application/json' };
    
        // Make the GET request with parameters in the URL
        const pisos =  this.http.get<Piso[]>(url, { params: { codigoEdificio }, headers });
        return pisos;
      }

*/
    //Metodo para listar pisos de um edificio
    listPisos(codigoEdificio: string): Observable<Piso[]> {
        const listPisosEdificio = this.LogisticAPI_URL + "/listPisos/" +codigoEdificio;
        console.log(listPisosEdificio);
        const pisos =  this.http.get<Piso[]>(listPisosEdificio);
        return pisos;
    }



    //Metodo para listar min e max de pisos
    listMinMax(min: string, max: string): Observable<Piso[]> {
        const listPisosMinMax = this.LogisticAPI_URL + "/listMinMax?min=" + min+ "&max=" +max;
        const pisos = this.http.get<Piso[]>(listPisosMinMax)!;
        console.log(this.LogisticAPI_URL + "/listMinMax?min=" + min+ "&max=" +max);
        return pisos;
    }


    //Metodo para atualizar piso
    updatePiso(piso: Piso) {
        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(piso);
        console.log(body);
        return this.http.put<Piso>(this.LogisticAPI_URL + "/updatePiso", body, { 'headers': headers, observe: 'response' })
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    //Metodo para listar min e max de pisos

    //Metodo para listar pisos geral
    listPisosGeral(): Observable<Piso[]> {
        console.log("Vai ate ao serviço");
        const pisos = this.http.get<Piso[]>(this.LogisticAPI_URL + "/listPisosGeral");
        return pisos;
    }

}