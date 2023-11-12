import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GestorFrotaComponent } from './gestor-frota.component';

describe('GestorFrotaComponent', () => {
  let component: GestorFrotaComponent;
  let fixture: ComponentFixture<GestorFrotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GestorFrotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
