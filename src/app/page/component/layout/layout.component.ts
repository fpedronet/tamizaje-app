import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { LogeoService } from 'src/app/_service/configuracion/logeo.service';
import { MenuService } from 'src/app/_service/menu.service';
import { Menu } from 'src/app/_model/menu';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {


  constructor(
    private router: Router,
    private logeoService : LogeoService,
    private menuService : MenuService,
  ) { }

  codigo?:string;
  panelOpenState = false;
  count=false;
  empresa?: string = "";
  logo?: string =environment.UrlImage + "logoMenu.png";
  user?: string =environment.UrlImage + "userMenu.png";
  username: string = "";
  userdni: string = "";
  isshow: boolean = false;
  interval:any;

  menus: Menu[] = [];

  ngOnInit(): void {
    this.listar();   
  }

  listar(){
 
    let session = this.logeoService.sessionUsuario();

    if(session!=null){
      this.username= session.nombreConocido.toUpperCase();
      this.userdni =  session.documento;

      this.menus = this.menuService.getListarMenu();
    }else{
      localStorage.clear();
      this.router.navigate(['']);
    }  
  }

  clearLocalStore(){
    this.isshow = false;
    localStorage.setItem(environment.CODIGO_FILTRO, "");    
  }

  closeLogin(){
    this.isshow = false;
    localStorage.clear();
    window.location.reload();
  }


  abrirmenu(){

    if(this.isshow){
      this.isshow = false; 
    }else{
      this.isshow = true;  
    }
  }
}
