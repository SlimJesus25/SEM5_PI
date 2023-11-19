import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main.menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  openAboutUs(){
    this.router.navigate(['/aboutUs']);
  }
  //Edificio
  createEdificio(){
    this.router.navigate(['edificioCreate']);
  }
  listEdificios(){
    this.router.navigate(['edificioList']);
  }
  updateEdificio(){
    this.router.navigate(['edificioUpdate']);
  }
  //Piso
  createPiso(){
    this.router.navigate(['pisoCreate']);
  }
  listPisos(){
    this.router.navigate(['edificioCreate']);
  }
  updatePiso(){
    this.router.navigate(['pisoUpdate']);
  }
  //Passagem
  createPassagem(){
    this.router.navigate(['passagemCreate']);
  }
  listPassagens(){
    this.router.navigate(['passagemList']);
  }
  updatePassagem(){
    this.router.navigate(['passagemUpdate']);
  }
  //Elevador
  createElevador(){
    this.router.navigate(['elevadorCreate']);
  }
  listElevadores(){
    this.router.navigate(['edificioCreate']);
  }
  updateElevador(){
    this.router.navigate(['edificioCreate']);
  }
  //MapaPiso
  createMapaPiso(){
    this.router.navigate(['mapaPisoCreate']);
  }
  //TipoRobo
  createTipoRobo(){
    this.router.navigate(['tipoRoboCreate']);
  }
  //Sala
  createSala(){
    this.router.navigate(['salaCreate']);
  }
}
