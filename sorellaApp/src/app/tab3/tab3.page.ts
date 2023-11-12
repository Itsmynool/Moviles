// tab3.page.ts
import { Component } from '@angular/core';
import { MongodbService } from '../services/mongodb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../components/carrito.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  parametro: string = '';
  terminoBusqueda: string = '';
  misArticulos: any = [];
  todosLosProductos: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mongodb: MongodbService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('Parametro: ', params['categoria']);
      this.parametro = params['categoria'];
      this.cargarArticulos().then(() => {
        console.log('Lista con filtro', this.misArticulos);
        this.filtrarLista();
      });
    });
  }

  async cargarArticulos() {
    await this.mongodb
      .getProductos()
      .toPromise()
      .then((resp: any) => {
        this.todosLosProductos = resp.productos;
        this.misArticulos = this.todosLosProductos;
        console.log('Artículos cargados:', this.misArticulos);
      });
  }

  buscarArticulos() {
    this.misArticulos = this.todosLosProductos.filter((producto: any) =>
      producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
    this.filtrarLista();
  }

  filtrarLista() {
    // Filtra solo si hay un parámetro de categoría presente
    if (this.parametro) {
      this.misArticulos = this.misArticulos.filter(
        (producto: any) => producto.categoria.nombre.toLowerCase() === this.parametro.toLowerCase()
      );
    }
  }

  onSearch(event: any) {
    this.terminoBusqueda = event.target.value;
    if (this.terminoBusqueda.trim() === '') {
      this.cargarArticulos().then(() => {
        this.filtrarLista();
      });
    } else {
      this.buscarArticulos();
    }
  }

  agregarAlCarrito(producto: any) {
    // Asegúrate de que la propiedad 'cantidad' existe en cada artículo antes de agregar al carrito
    if (!producto.cantidad) {
      producto.cantidad = 1;
    }

    // Llama a la función de tu servicio para agregar el producto al carrito
    this.carritoService.agregarProducto(producto, producto.cantidad);
  }

  quitarFiltro() {
    // Limpiar el filtro y recargar los productos
    this.parametro = '';
    this.cargarArticulos().then(() => {
      this.filtrarLista();
    });
  }

  verCategorias() {
    // Navegar al tab2
    this.router.navigate(['/tabs/tab2']);
  }
}
