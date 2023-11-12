import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-edificio-update',
  templateUrl: './edificio-update.component.html',
  styleUrls: ['./edificio-update.component.css']
})
export class EdificioUpdateComponent implements OnInit {

  edificio = {codigoEdificio: "", dimensaoMaximaPiso: "", descricaoEdificio: "",  nomeOpcionalEdificio:""}

  constructor(
    private location: Location,
    private EdificioService: EdificioService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  updateEdificio() {
    let errorOrSuccess: any = this.EdificioService.updateEdificio(this.edificio);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success edificio update!");
        this.finalMessage = "Success edificio update!";
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