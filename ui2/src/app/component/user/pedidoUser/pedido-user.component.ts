import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Pedido } from '../../../model/pedido';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoService } from '../../../service/pedido/pedido.service';
@Component({
  selector: 'app-pedido-user',
  templateUrl: './pedido-user.component.html',
  styleUrls: ['./pedido-user.component.css']
})
export class PedidoUserComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Numero de telemovel', 'NIF', 'Estado', 'Data Pedido', 'Data Mudança Estado'];
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private location: Location,private pedidoService: PedidoService) { 
  }

  async ngOnInit(): Promise<void> {
    this.pedidoService.getPedidosPendentes()
      .subscribe(utentes => {
        this.dataSource = new MatTableDataSource(utentes);
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