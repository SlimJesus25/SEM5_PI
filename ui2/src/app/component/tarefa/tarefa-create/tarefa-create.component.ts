import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { TarefaService } from '../../../service/tarefa/tarefa.service';
import { SalaService } from '../../../service/sala/sala.service';
@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrls: ['./tarefa-create.component.css']
})
export class TarefaCreateComponent implements OnInit {

  requisicao = {tipoDispositivo: "", user:"", estado:"pendente", tarefa:""}
  tarefa = {tipoTarefa: "", origem: "", destino: "", requisicao:this.requisicao}
  
  options = ["pick up & delivery", "vigilância", "limpeza"];
  
  origens: string[] = [];
  destinos: string[] = [];

  constructor(
    private location: Location,
    private TarefaService: TarefaService,
    private messageService: MessageService,
    private salaService: SalaService,
  ) { 
    this.salaService.getSalas().subscribe(salas => this.origens = salas.map(sala => sala.designacao));
    this.salaService.getSalas().subscribe(salas => this.destinos = salas.map(sala => sala.designacao));
  }


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