import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { MapaPisoService } from '../../../service/mapaPiso/mapaPiso.service';
@Component({
  selector: 'app-mapa-piso-create',
  templateUrl: './mapa-piso-create.component.html',
  styleUrls: ['./mapa-piso-create.component.css']
})
export class MapaPisoCreateComponent implements OnInit {

  mapaPiso = {piso : "", mapa : ""}

  constructor(
    private location: Location,
    private MapaPisoService: MapaPisoService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createMapaPiso() {
    let errorOrSuccess: any = this.MapaPisoService.createMapaPiso(this.mapaPiso);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Mapa Piso creation!");
        this.finalMessage = "Success Mapa Piso creation!";
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