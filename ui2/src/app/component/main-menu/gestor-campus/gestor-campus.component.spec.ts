import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GestorCampusComponent } from './gestor-campus.component';

describe('GestorCampusComponent', () => {
  let component: GestorCampusComponent;
  let fixture: ComponentFixture<GestorCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GestorCampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
