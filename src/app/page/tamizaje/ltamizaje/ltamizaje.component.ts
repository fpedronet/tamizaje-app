import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Exportacion } from 'src/app/_model/tamizaje/exportacion';
import { TamizajeService } from 'src/app/_service/tamizaje.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ltamizaje',
  templateUrl: './ltamizaje.component.html',
  styleUrls: ['./ltamizaje.component.css']
})
export class LtamizajeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private tamizajeService : TamizajeService,
    private spinnerService: SpinnerService,
  ) { }

   dataSource: Exportacion[] = [];
  displayedColumns: string[] = ['pac_num_documento', 'pac_ape_paterno','pac_ape_materno','pac_nombres','pac_edad','pac_telefono', 'pac_celular', 'pac_direccion', 'hpa_edad_gestacion', 'spac_fec_registro', 'hpa_ape_paterno', 'hpa_ape_materno', 'hpa_nombres', 'hpa_fec_nacimiento', 'hpa_hora_nacimiento', 'hpa_genero', 'hpa_prematuro', 'hpa_transfundido', 'hpa_peso', 'hpa_talla', 'hpa_hor_lactancia', 'shpa_fec_registro', 'mue_num_tarjeta', 'mue_num_muestra', 'mue_observaciones', 'mue_sec_ingreso', 'mue_redirigido', 'smue_fec_registro', 'mue_pruebas', 'mue_control', 'rpe_resultado', 'cen_nombre', 'zco_descripcion', 'mue_usu_responsable'];
  loading = true;
  existRegistro = false;
  countRegistro = 0;

  data? : string;
  
  fecha = new Date();

  fechaInicio = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), 1);
  fechaSelectIni = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), 1);

  fechaFin = new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);
  fechaSelectFin = new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    this.tamizajeService = new TamizajeService(this.http);
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.tamizajeService!.listar(
            this.data!,
            this.fechaSelectIni!,
            this.fechaSelectFin!,
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

  applyFilter(event: Event) {
    this.data = (event.target as HTMLInputElement).value;
  }

  buscar(){
    this.ngAfterViewInit();
  }

  exportar(){
    this.spinnerService.showLoading();
    this.tamizajeService
      .eportar(this.data!,this.fechaSelectIni!,this.fechaSelectFin!)
      .subscribe(
        data => {
          this.spinnerService.hideLoading();

          let anio = this.fechaSelectFin.getFullYear()+""+this.fechaSelectFin.getMonth()+1+""+this.fechaSelectFin.getDay();

          let NomFile = "BackupTamizajeNeonatal" + anio + ".xlsx";

          let byteChar = atob(data);
          let byteArray = new Array(byteChar.length);
          for(let i = 0; i < byteChar.length; i++){
            byteArray[i] = byteChar.charCodeAt(i);
          }
          let uIntArray = new Uint8Array(byteArray);
          let blob = new Blob([uIntArray], {type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, `${NomFile}.xlsx`);
        }
      );
  }

}

