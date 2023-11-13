import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EdificioService } from './edificio.service';
import { MessageService } from '../message/message.service';
import { Edificio } from '../../model/edificio';
import { of } from 'rxjs';

describe('EdificioService', () => {
  let service: EdificioService;

  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    service = TestBed.inject(EdificioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the edificio successfully', () => {
    let messageService: MessageService = TestBed.inject(MessageService);
	
	//Colocar de acordo com as regras de negócio
    let edificio: Edificio = { 
      id: "G", 
      dimensaoMaximaPiso: [100,100],
      descricaoEdificio: "Um edifcio muito bonito, tal com o Moshi",
      nomeOpcionalEdificio: 'naoSei',
      codigoEdificio: "2b2"
    }

    const fakeGet = jasmine.createSpyObj('HttpClient', ['post']);
    fakeGet.post.and.returnValue(of(new HttpResponse({
      body: edificio
    })));

    service = new EdificioService(fakeGet, messageService);

    let EdificioCreate = service.createEdificio(edificio);

    EdificioCreate.subscribe(response => expect(response.body).toBe(edificio))
  })

  it('should return a list of Edificios', () => {
    let messageService: MessageService = TestBed.inject(MessageService);
    
    //Colocar de acordo com as regras de negócio
    let Edificios: Edificio[] = [
      {
		id: "G", 
		dimensaoMaximaPiso: [100,100],
		descricaoEdificio: "Um edifcio muito bonito, tal com o Moshi",
		nomeOpcionalEdificio: 'naoSei',
		codigoEdificio: "2b2"
      }
    ];

    const fakeGet = jasmine.createSpyObj('HttpClient', ['get']);
    fakeGet.get.and.returnValue(of(Edificios));

    service = new EdificioService(fakeGet, messageService);

    let EdificioList = service.listEdificios();  

    EdificioList.subscribe(EdificioList => {expect(EdificioList).toBe(Edificios)})
  })

  it('should return the Edificio with that id', () => {
    let messageService: MessageService = TestBed.inject(MessageService);
    let Edificios: Edificio = 
      {
        id: "G", 
		dimensaoMaximaPiso: [100,100],
		descricaoEdificio: "Um edifcio muito bonito, tal com o Moshi",
		nomeOpcionalEdificio: 'naoSei',
		codigoEdificio: "2b2"
      };

    const fakeGet = jasmine.createSpyObj('HttpClient', ['get']);
    fakeGet.get.and.returnValue(of(Edificios));

    service = new EdificioService(fakeGet, messageService);

    let EdificioByName = service.getEdificioByID('G');  

    EdificioByName.subscribe(EdificioByName => {expect(EdificioByName).toBe(Edificios)})
  })

  it('should return the deletion of Edificio', () => {
    let messageService: MessageService = TestBed.inject(MessageService);
	let Edificios: Edificio = 
	{
	  id: "G", 
	  dimensaoMaximaPiso: [100,100],
	  descricaoEdificio: "Um edifcio muito bonito, tal com o Moshi",
	  nomeOpcionalEdificio: 'naoSei',
	  codigoEdificio: "2b2"
	};

    const fakeDelete = jasmine.createSpyObj('HttpClient', ['delete']);
    fakeDelete.get.and.returnValue(of(Edificios));

    service = new EdificioService(fakeDelete, messageService);

    let DeleteEdificio = service.deleteEdificio('G');  

    DeleteEdificio.subscribe(DeleteEdificio => {expect(DeleteEdificio).toBe(Edificios)})
  })
});