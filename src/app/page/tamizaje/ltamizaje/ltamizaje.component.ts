import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfimService } from './../../component/confirm/confim.service';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { Exportacion } from 'src/app/_model/tamizaje/exportacion';
import { TamizajeService } from 'src/app/_service/tamizaje.service';


@Component({
  selector: 'app-ltamizaje',
  templateUrl: './ltamizaje.component.html',
  styleUrls: ['./ltamizaje.component.css']
})
export class LtamizajeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private tamizajeService : TamizajeService,
  ) { }

  dataSource: Exportacion[] = [];
  displayedColumns: string[] = ['pac_num_documento', 'pac_ape_paterno','pac_ape_materno','pac_nombres','pac_edad','pac_telefono', 'pac_celular'];
  loading = true;
  existRegistro = false;
  countRegistro = 0;

  data? : string;
  
  fechaInicio?: Date;
  fechaSelectInicio?: Date;

  fechaFin?: Date;
  fechaSelectFin?: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit(data: string='', finicio: Date, ffin: Date) {
    this.tamizajeService = new TamizajeService(this.http);
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.tamizajeService!.listar(
            data,
            finicio,
            ffin,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(res => {

           this.loading = false;
           this.existRegistro = res === null;

          if (res === null) {
            return [];
          }

          this.countRegistro = res.pagination.total;
          return res.items;
        }),
      ).subscribe(data => (this.dataSource = data));
  }

}
