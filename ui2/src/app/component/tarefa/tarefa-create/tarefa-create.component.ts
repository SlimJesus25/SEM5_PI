import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { TarefaService } from '../../../../service/tarefa/tarefa.service';
import { MessageService } from '../../../../service/message/message.service';
@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrls: ['./tarefa-create.component.css']
})
export class TarefaCreateComponent implements OnInit {

  tarefa = {tipoTarefa: ""}

  constructor(
    private location: Location,
    private TarefaService: TarefaService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createTarefa() {
    let errorOrSuccess: any = this.TarefaService.createTarefa(this.tarefa);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success tarefa creation!");
        this.finalMessage = "Success tarefa creation!";
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