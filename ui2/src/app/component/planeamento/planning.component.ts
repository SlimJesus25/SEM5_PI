import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { PisoService } from '../../service/piso/piso.service';
import { MapaPisoService } from '../../service/mapaPiso/mapaPiso.service';
import { SalaService } from '../../service/sala/sala.service';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  salas: string[] = [];
  caminhoEntrePisos = { origem: "",  destino: "" }


  constructor(
    private location: Location,
    private salaService: SalaService,
    private mapaPisoService : MapaPisoService,
  ) { this.salaService.getSalas().subscribe(salas => this.salas = salas.map(sala => sala.designacao)); }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  calcularCaminho() {
    let errorOrSuccess: any = this.mapaPisoService.calcularCaminho(this.caminhoEntrePisos);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Caminho encontrado");
      },

      (error: any) => {
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}