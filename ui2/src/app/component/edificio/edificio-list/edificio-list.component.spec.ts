import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Edificio } from '../../../model/edificio';
import { EdificioListComponent } from './edificio-list.component';
import { of } from 'rxjs';

describe('EdificioListComponent', () => {
  let component: EdificioListComponent;
  let fixture: ComponentFixture<EdificioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ EdificioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list edificios', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeLiveAnnouncer = TestBed.inject(LiveAnnouncer);

    let edificio: Edificio[] = [{
      codigoEdificio : "K",
      dimensaoMaximaPiso : "[200,200]",
      descricaoEdificio : "Edificio de Magia",
      nomeOpcionalEdificio : "Edificio Julio de Matos"

    }]

    const observable = of(edificio);

    const fakeService = jasmine.createSpyObj('EdificioService', ['getEdificios']);
    fakeService.getTrucks.and.returnValue(observable);

    component = new EdificioListComponent(fakeService,fakeLocation,fakeLiveAnnouncer);

    component.ngOnInit();

    expect(component.dataSource.data).toBe(edificio);
  })
});