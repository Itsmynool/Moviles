import { Component, OnInit } from '@angular/core';
import { MongodbService } from '../services/mongodb.services';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../carrito.service'; // Asegúrate de usar la ruta correcta


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  selectedGender: string = '';
  productos: any[] = []; // Aquí almacenaremos los productos
  currentPage: number = 1;
  pageSize: number = 6;

  constructor(
    private mongodbService: MongodbService,
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    // Obtén el género de la URL
    this.route.params.subscribe((params) => {
      this.selectedGender = params['genero'];
      console.log("GENERO: ", this.selectedGender)

      this.mongodbService.getProductosXGenero(this.selectedGender).subscribe(
        (data) => {
          // Guarda los productos en la variable 'productos'
          this.productos = data.productos;

          // Configura la cantidad inicial en 0 para todos los productos
          this.productos.forEach((producto) => {
            producto.selectedQuantity = 0;
          });
        },
        (error) => {
          console.error('Error al obtener productos', error);
        }
      );
    });
  }

  // Función para agregar al carrito
  addToCart(producto: any, cantidad: number) {
    console.log("CANTIDAD: ", cantidad);
    const productoEnCarrito = this.carritoService.obtenerItemDelCarrito(producto);
  
    if (!productoEnCarrito) {
      console.log("NO");
      this.carritoService.agregarProducto(producto, cantidad);
      // El producto no está en el carrito, agrégalo
    } else {
      console.log("SI");
      // El producto ya está en el carrito, actualiza la cantidad
      this.carritoService.agregarProducto(producto, cantidad);
    }
  }


  // Función para ver detalles
  comprar(producto: any) {
    // Aquí puedes implementar la lógica para ver detalles
  }

  getProductosPaginados(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productos.slice(startIndex, endIndex);
  }

  anteriorPagina() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  siguientePagina() {
    if (this.currentPage < this.totalPaginas()) {
      this.currentPage++;
    }
  }
  
  totalPaginas(): number {
    return Math.ceil(this.productos.length / this.pageSize);
  }
  
}
