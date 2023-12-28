import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { AprovacaoService } from '../../../service/aprovacao/aprovacao.service';
import { Aprovacao } from '../../../model/aprovacao';

@Component({
  selector: 'app-tarefa-nao-aprovada',
  templateUrl: './tarefa-nao-aprovada.component.html',
  styleUrls: ['./tarefa-nao-aprovada.component.css']
})
export class TarefaNaoAprovadaComponent {

  displayedColumns: string[] = ['tipoDispositivo', 'requisitante', 'estado', 'tarefa'];
  dataSource: MatTableDataSource<Aprovacao> = new MatTableDataSource();
  selectedItems: Aprovacao[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aprovacaoService: AprovacaoService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.listAprovacao();
  }

  listAprovacao() {
    let errorOrSuccess = this.aprovacaoService.getAprovacao();
    errorOrSuccess.subscribe(
      aprovacao => {
        this.dataSource = new MatTableDataSource(aprovacao);
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