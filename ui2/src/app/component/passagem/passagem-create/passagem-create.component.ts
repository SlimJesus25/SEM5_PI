import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PassagemService } from '../../../service/passagem/passagem.service';
@Component({
  selector: 'app-passagem-create',
  templateUrl: './passagem-create.component.html',
  styleUrls: ['./passagem-create.component.css']
})
export class PassagemCreateComponent implements OnInit {

  passagem = {designacao: "", edificioA: "", edificioB:"",pisoA:"",pisoB:""};

  constructor(
    private location: Location,
    private PassagemService: PassagemService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createPassagem() {
    let errorOrSuccess: any = this.PassagemService.createPassagem(this.passagem);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success passagem creation!");
        this.finalMessage = "Success passagem creation!";
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