import { Component, OnInit, Input, Output} from '@angular/core';
import { Location } from '@angular/common';
import { RoboService } from '../../../service/robo/robo.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-robo-inhibit',
  templateUrl: './robo-inhibit.component.html',
  styleUrls: ['./robo-inhibit.component.css']
})
export class RoboInhibitComponent implements OnInit {

  constructor(private roboService: RoboService, private location: Location, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  @Input() codigo: string = '';
  @Output() finalMessage: string = '';

  inhibitRobo() {
    let errorOrSuccess: any = this.roboService.inhibitRobo(this.codigo);

    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Robo inhibition!");
        this.finalMessage = "Success Robo inhibition!";
        this.location.back();
      },

      (error: any) => {
        //error
        this.messageService.add("Failed robo inhibition!");
        this.finalMessage = "Failed robo inhibition!";
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}