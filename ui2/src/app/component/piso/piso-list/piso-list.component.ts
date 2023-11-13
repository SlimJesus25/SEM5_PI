import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Piso } from '../../../model/piso';
import { PisoService } from '../../../service/piso/piso.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-piso-list',
  templateUrl: './piso-list.component.html',
  styleUrls: ['./piso-list.component.css']
})
export class PisoListComponent {
  @Input() codigoEdificio: string = '';
  @Input() min : string = '';
  @Input() max : string = '';
  selectOption :number = 0;

  displayedColumns: string[] = ['Designacao', 'Descricao', 'Edificio'];
  dataSource: MatTableDataSource<Piso> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private pisoService: PisoService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
  }

  listPisos() {
    this.selectOption = 1;
  }

  submitCode() {
    this.pisoService.listPisos(this.codigoEdificio)
        .subscribe(pisos => {
          this.dataSource = new MatTableDataSource(pisos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }

  listMinMax() {
    this.selectOption = 2;
    this.pisoService.listMinMax(this.min,this.max)
      .subscribe(pisos => {
        this.dataSource = new MatTableDataSource(pisos);
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