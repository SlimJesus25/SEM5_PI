import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { PisoService } from '../../service/piso/piso.service';
import { MapaPisoService } from '../../service/mapaPiso/mapaPiso.service';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  pisos: string[] = [];
  caminhoEntrePisos = { origem: "", posicaoOrigem: [], destino: "", posicaoDestino: [] }


  constructor(
    private location: Location,
    private pisoService: PisoService,
    private mapaPisoService : MapaPisoService,
  ) { this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao)); }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  calcularCaminho() {
    let errorOrSuccess: any = this.mapaPisoService.calcularCaminho(this.caminhoEntrePisos);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Edificio criado");
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