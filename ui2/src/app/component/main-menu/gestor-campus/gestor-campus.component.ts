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

  openEdificio() {
    this.router.navigate(['/edificios']);
  }

  openPiso() {
    this.router.navigate(['/pisos']);
  }

}
