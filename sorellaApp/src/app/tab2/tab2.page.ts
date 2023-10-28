import { Component, OnInit } from '@angular/core';
import { MongodbService } from '../services/mongodb.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  misCategorias: any = []; // Inicializa el arreglo de categorías

  constructor(private router:Router,private mongodb: MongodbService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

   cargarCategorias() {
     this.mongodb.getBuscarCategorias().subscribe(
      (res:any)=>{
        this.misCategorias =res.categorias;
        console.log('CATEGORIAS', this.misCategorias);
      },
      (error: any)=> {
        console.error("error", error);
      }
     );
  }  
}
