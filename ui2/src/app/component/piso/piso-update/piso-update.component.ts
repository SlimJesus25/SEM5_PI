import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PisoService } from '../../../service/piso/piso.service';
@Component({
  selector: 'app-piso-update',
  templateUrl: './piso-update.component.html',
  styleUrls: ['./piso-update.component.css']
})
export class PisoUpdateComponent implements OnInit {

  piso = {designacao: "", descricao: "", edificio:""}
  
  constructor(
    private location: Location,
    private PisoService: PisoService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  updatePiso() {
    let errorOrSuccess: any = this.PisoService.updatePiso(this.piso);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success piso update!");
        this.finalMessage = "Success piso update!";
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