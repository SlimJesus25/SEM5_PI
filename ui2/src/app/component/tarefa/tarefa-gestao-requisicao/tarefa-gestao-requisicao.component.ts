import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { AprovacaoService } from '../../../service/aprovacao/aprovacao.service';
import { Aprovacao } from '../../../model/aprovacao';

@Component({
  selector: 'app-tarefa-gestao-requisicao',
  templateUrl: './tarefa-gestao-requisicao.component.html',
  styleUrls: ['./tarefa-gestao-requisicao.component.css']
})
export class TarefaGestaoRequisicaoComponent {

  displayedColumns: string[] = ['tipoDispositivo', 'requisitante', 'estado', 'tarefa', 'Resposta'];
  dataSource: MatTableDataSource<Aprovacao> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aprovacaoService: AprovacaoService, private location: Location) { }

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

  aceitarRequisicao(aprovacao: Aprovacao){
  console.log(aprovacao.tarefa);
    let errorOrSuccess: any = this.aprovacaoService.aceitarRequisicao(aprovacao.tarefa);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Requisição aceite");
        this.listAprovacao();
      },

      (error: any) => {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    );
  }

  recusarRequisicao(aprovacao: Aprovacao) {
    let errorOrSuccess: any = this.aprovacaoService.recusarRequisicao(aprovacao);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Requisição recusada");
        this.listAprovacao();
      },

      (error: any) => {
        alert(error.error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}