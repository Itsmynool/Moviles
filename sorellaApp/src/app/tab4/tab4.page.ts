import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MongodbService } from '../services/mongodb.service';
import { CarritoService } from '../components/carrito.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  titulo:string = 'Mi Titulo';
  
  imagenes = [1,2,3,4,5,6];
    
  misProductos: any = [];

  constructor(private router: Router, 
              private mongodb:MongodbService) { 

              }

  ngOnInit() {
    let otroTitulo = 'Otro Titulo';
    this.cambiarTitulo(otroTitulo);

    this.cargarProductos()
  }

  cambiarTitulo(otroTitulo:string){
    this.titulo = otroTitulo;    
  }

  navegar(){
    this.router.navigate(['/tabs/tab3'])
  }  


  async cargarProductos() {
    //this.cargando = true;
    await this.mongodb
      .getProductosComo("Collar")
      .toPromise()
      .then((resp: any) => {
        this.misProductos = resp.results;

        console.log('PRODUCTOS', this.misProductos);
      });
  }

  guardaStorage(){

  }

}
