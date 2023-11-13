import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Edificio } from '../../model/edificio';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class EdificioService {

	private WarehouseAPI_URL = 'https://localhost:5001/api/edificios';  // URL to web api
  
	constructor(private http: HttpClient, private messageService: MessageService) { }
  
	createEdificio(edificio: Edificio) {
	 
	  const headers = {'content-type': 'application/json'};
	  
	  const body = JSON.stringify(edificio);
	  
	  return this.http.post<Edificio>(this.WarehouseAPI_URL, body, {'headers':headers , observe: 'response'})
	  
	}
  
	updateEdificio(edificio: Edificio) {   
	  
  
	  const headers = {'content-type': 'application/json'};
	  
	  const body = JSON.stringify(edificio);
		const updateURL = this.WarehouseAPI_URL + "/"+ edificio.codigoEdificio;
	  console.log(body);
	  this.http.put<Edificio>(updateURL, body, {'headers':headers , observe: 'response'})
	  .subscribe(
		response => {
		console.log(response);
	  }
	  );
	}
  
	getEdificioByID(id: string): Observable<Edificio> {
	  const edificioById = this.WarehouseAPI_URL + "/" + id;
	  const edificio = this.http.get<Edificio>(edificioById)!;
	  return edificio;
	}
	
	listEdificios(): Observable<Edificio[]>{
		const edificios = this.http.get<Edificio[]>(this.WarehouseAPI_URL);
		return edificios;
	}
    
    deleteEdificio(id:string):Observable<Edificio>{
		const edificioById = this.WarehouseAPI_URL + "/" + id;
        const edificio = this.http.delete<Edificio>(edificioById)!;
        return edificio;
    }
    
	private log(message: string) {
	  this.messageService.add(`HeroService: ${message}`);
	}
  }