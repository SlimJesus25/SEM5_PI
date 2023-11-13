import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { RoboService } from '../../../service/robo/robo.service';
import { MessageService } from '../../../service/message/message.service';
@Component({
  selector: 'app-robo-create',
  templateUrl: './robo-create.component.html',
  styleUrls: ['./robo-create.component.css']
})
export class RoboCreateComponent implements OnInit {

  robo = {marca: "", codigo: "",  numeroSerie:"", nickname: "", tipoRobo: ""}

  constructor(
    private location: Location,
    private RoboService: RoboService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createRobo() {
    let errorOrSuccess: any = this.RoboService.createRobo(this.robo);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Robo creation!");
        this.finalMessage = "Success Robo creation!";
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