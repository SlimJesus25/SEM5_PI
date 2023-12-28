import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { AprovacaoService } from '../../../service/aprovacao/aprovacao.service';
import { Aprovacao } from '../../../model/aprovacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit{
  @Input() estado: string = '';
  @Input() utente: string = '';
  @Input() tipoDispositivo: string = '';
  selectOption: number = 0;

  displayedColumns: string[] = ['tipoDispositivo', 'requisitante', 'estado', 'tarefa'];
  dataSource: MatTableDataSource<Aprovacao> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private aprovacaoService: AprovacaoService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
  }
  
  tarefaEstado(){
    this.selectOption = 1;
  }
  tarefaUtente(){
    this.selectOption = 2;
  }
  tarefaTipoDispositivo(){
    this.selectOption = 3;
  }

  listAprovacaoEstado() {
    let errorOrSuccess = this.aprovacaoService.getAprovacaoEstado(this.estado);
    errorOrSuccess.subscribe(
      aprovacao => {
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert(error.error);
      });
  }

  listAprovacaoUtente() {
    let errorOrSuccess = this.aprovacaoService.getAprovacaoUtente(this.utente);
    errorOrSuccess.subscribe(
      aprovacao => {
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert(error.error);
      });
  }
  
  listAprovacaoTipoDispositivo() {
    let errorOrSuccess = this.aprovacaoService.getAprovacaoTipoDispositivo(this.tipoDispositivo);
    errorOrSuccess.subscribe(
      (aprovacao: Aprovacao[]) => {
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
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