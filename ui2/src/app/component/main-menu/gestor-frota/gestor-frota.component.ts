import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestor-frota',
  templateUrl: './gestor-frota.component.html',
  styleUrls: ['./gestor-frota.component.css']
})
export class GestorFrotaComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  openRobo(){
    this.router.navigate(['/robos']);
  }
}
