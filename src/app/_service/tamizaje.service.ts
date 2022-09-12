import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';


@Injectable({
  providedIn: 'root'
})
export class TamizajeService {

  constructor(private http: HttpClient) {} 

  private url: string = `${environment.UrlApi}/tamizaje`;

  listar(data: string, fechaIni: Date, fechaFin: Date, page: number,pages: number, column: string, order: SortDirection ) {

    column = (column==undefined)?'':column;
    let finicio = (fechaIni==undefined)?'':fechaIni.toDateString();
    let ffin = (fechaFin==undefined)?'':fechaFin.toDateString();
    let secingreso = 0;
    
    let href = `${this.url}/GetAllTamizaje`;
    let urls = `${href}?nroDocumento=${data}&secingreso=${secingreso}&fechaIni=${finicio}&fechaFin=${ffin}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

}
