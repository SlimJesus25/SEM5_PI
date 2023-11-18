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

  createEdificio(){
    this.router.navigate(['edificioCreate']);
  }

  listEdificios(){
    this.router.navigate(['edificioList']);
  }

  updateEdificio(){
    this.router.navigate(['edificioUpdate']);
  }

  createPiso(){
    this.router.navigate(['pisoCreate']);
  }

  listPisos(){
    this.router.navigate(['edificioCreate']);
  }

  updatePiso(){
    this.router.navigate(['edificioCreate']);
  }

  createPassagem(){
    this.router.navigate(['passagemCreate']);
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

  createMapaPiso(){
    this.router.navigate(['mapaPisoCreate']);
  }

}
