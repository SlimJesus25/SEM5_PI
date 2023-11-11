import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Edificio } from '../../../model/edificio';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-edificio-list',
  templateUrl: './edificio-list.component.html',
  styleUrls: ['./edificio-list.component.css']
})
export class EdificioListComponent {

  displayedColumns: string[] = ['Codigo', 'Dimensao Maxima Piso', 'Descricao', 'Nome Opcional'];
  dataSource: MatTableDataSource<Edificio> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private edificioService: EdificioService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    this.edificioService.getEdificios()
      .subscribe(edificios => {
        this.dataSource = new MatTableDataSource(edificios);
        this.dataSource.paginator = this.paginator;
      });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  goBack(): void {
    this.location.back();
  }
}