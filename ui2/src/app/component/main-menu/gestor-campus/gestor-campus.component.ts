import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestor-campus',
  templateUrl: './gestor-campus.component.html',
  styleUrls: ['./gestor-campus.component.css']
})
export class GestorCampusComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  openAboutUs(){
    this.router.navigate(['/aboutUs']);
  }

  createEdificio(){
    this.router.navigate(['edificioCreate']);
  }

  listEdificios(){
    this.router.navigate(['edificioList']);
  }

  updateEdificio(){
    this.router.navigate(['edificioCreate']);
  }

  createPiso(){
    this.router.navigate(['edificioCreate']);
  }

  listPisos(){
    this.router.navigate(['edificioCreate']);
  }

  updatePiso(){
    this.router.navigate(['edificioCreate']);
  }

  createPassagem(){
    this.router.navigate(['edificioCreate']);
  }

  listPassagens(){
    this.router.navigate(['edificioCreate']);
  }

  updatePassagem(){
    this.router.navigate(['edificioCreate']);
  }

  createElevador(){
    this.router.navigate(['edificioCreate']);
  }

  listElevadores(){
    this.router.navigate(['edificioCreate']);
  }

  updateElevador(){
    this.router.navigate(['edificioCreate']);
  }

}
