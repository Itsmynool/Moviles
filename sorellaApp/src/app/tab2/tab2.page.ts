import { Component, OnInit } from '@angular/core';
import { MongodbService } from '../services/mongodb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  misCategorias: any = [];
  terminoBusqueda: string = '';

  constructor(private router: Router, private mongodb: MongodbService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.mongodb.getCategorias().subscribe(
      (res: any) => {
        this.misCategorias = res.categorias;
        //console.log('CATEGORIAS', this.misCategorias);
      },
      (error: any) => {
        console.error("error", error);
      }
    );
  }
  
  buscarCategorias() {
    this.mongodb.getBuscarCategorias(this.terminoBusqueda).subscribe(
      (res: any) => {
        if (Array.isArray(res.results)) {
          // Si la propiedad "results" es un array, asigna directamente
          this.misCategorias = res.results;
        } else {
          // Si la estructura no coincide, considera tratarlo de manera diferente según la respuesta
          console.error('Estructura de respuesta inesperada:', res);
        }

        console.log('CATEGORIAS', this.misCategorias);
      },
      (error: any) => {
        console.error("error", error);
      }
    );
  }

  onSearch(event: any) {
    this.terminoBusqueda = event.target.value;
    if (this.terminoBusqueda.trim() === '') {
      this.cargarCategorias();
    } else {
      this.buscarCategorias();
    }
  }

  verProductos(nombreCategoria: string) {
    this.router.navigate(['/tabs/tab3', { categoria: nombreCategoria }]);
  }
}
