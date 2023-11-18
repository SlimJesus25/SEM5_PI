import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asist',
  templateUrl: './asist.component.html',
  styleUrls: ['./asist.component.css']
})
export class AsistComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
}
