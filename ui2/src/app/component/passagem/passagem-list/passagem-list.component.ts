import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { Passagem } from '../../../model/passagem';
import { PassagemService } from '../../../service/passagem/passagem.service';
@Component({
  selector: 'app-passagem-list',
  templateUrl: './passagem-list.component.html',
  styleUrls: ['./passagem-list.component.css']
})
export class PassagemListComponent {

  displayedColumns: string[] = ['Designacao', 'EdificioA', 'EdificioB', 'PisoA','PisoB'];
  dataSource: MatTableDataSource<Passagem> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private passagemService: PassagemService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.listEdificios();
  }

  listEdificios() {
    let errorOrSuccess = this.passagemService.getPassagens();
    errorOrSuccess.subscribe(
      passagens => {
        this.dataSource = new MatTableDataSource(passagens);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        alert(error.error);
      });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  goBack(): void {
    this.location.back();
  }
}