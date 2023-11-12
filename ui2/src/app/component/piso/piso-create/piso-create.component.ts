import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PisoService } from '../../../service/piso/piso.service';
@Component({
  selector: 'app-piso-create',
  templateUrl: './piso-create.component.html',
  styleUrls: ['./piso-create.component.css']
})
export class PisoCreateComponent implements OnInit {

  piso = {designacao: "", descricao: "", edificio:""}

  constructor(
    private location: Location,
    private PisoService: PisoService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createPiso() {
    let errorOrSuccess: any = this.PisoService.createPiso(this.piso);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success piso creation!");
        this.finalMessage = "Success piso creation!";
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