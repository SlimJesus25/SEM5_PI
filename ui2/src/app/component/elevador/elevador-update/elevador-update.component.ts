import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { ElevadorService } from '../../../service/elevador/elevador.service';
@Component({
  selector: 'app-edificio-update',
  templateUrl: './elevador-update.component.html',
  styleUrls: ['./elevador-update.component.css']
})
export class ElevadorUpdateComponent implements OnInit {

  elevador = {numeroIdentificativo: "", descricao: "", numeroSerie: "",  modelo:"", marca: "", pisosServidos: "", edificio: ""};

  constructor(
    private location: Location,
    private ElevadorService: ElevadorService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  updateElevador() {
    let errorOrSuccess: any = this.ElevadorService.updateElevador(this.elevador);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success elevador update!");
        this.finalMessage = "Success elevador update!";
        this.location.back();
      },

      (error: any) => {
        //error
        this.messageService.add(error.error);
        this.finalMessage = error.error;
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}