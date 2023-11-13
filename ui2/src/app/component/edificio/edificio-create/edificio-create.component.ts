import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-edificio-create',
  templateUrl: './edificio-create.component.html',
  styleUrls: ['./edificio-create.component.css']
})
export class EdificioCreateComponent implements OnInit {

  edificio = {codigoEdificio: "", dimensaoMaximaPiso: "", descricaoEdificio: "",  nomeOpcionalEdificio:""}

  constructor(
    private location: Location,
    private EdificioService: EdificioService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createEdificio() {
    let errorOrSuccess: any = this.EdificioService.createEdificio(this.edificio);
    console.log("Ponto 1");
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success edificio creation!");
        this.finalMessage = "Success edificio creation!";
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