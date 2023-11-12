import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../../service/message/message.service';
import { TipoRoboService } from '../../../../service/tipoRobo/tipoRobo.service';
@Component({
  selector: 'app-tipo-robo-create',
  templateUrl: './tipo-robo-create.component.html',
  styleUrls: ['./tipo-robo-create.component.css']
})
export class TipoRoboCreateComponent implements OnInit {

  tipoRobo = {tarefas: '[" "]', designacao: "", marca: "",  modelo:""}

  constructor(
    private location: Location,
    private TipoRoboService: TipoRoboService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createTipoRobo() {
    let errorOrSuccess: any = this.TipoRoboService.createTipoRobo(this.tipoRobo);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Tipo Robo creation!");
        this.finalMessage = "Success Tipo Robo creation!";
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