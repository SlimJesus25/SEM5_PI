import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { ElevadorService } from '../../../service/elevador/elevador.service';
@Component({
  selector: 'app-elevador-create',
  templateUrl: './elevador-create.component.html',
  styleUrls: ['./elevador-create.component.css']
})
export class ElevadorCreateComponent implements OnInit {

  elevador = {numeroIdentificativo: "", descricao: "", numeroSerie: "",  modelo:"", marca: "", pisosServidos: [""] , edificio: ""};

  constructor(
    private location: Location,
    private ElevadorService: ElevadorService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createElevador() {
    let errorOrSuccess: any = this.ElevadorService.createElevador(this.elevador);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success elevador creation!");
        this.finalMessage = "Success elevador creation!";
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