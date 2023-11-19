import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoboInhibitComponent } from './robo-inhibit.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


describe('RoboInhibitComponent', () => {
  let component: RoboInhibitComponent;
  let fixture: ComponentFixture<RoboInhibitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatTableModule],
      declarations: [ RoboInhibitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboInhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});