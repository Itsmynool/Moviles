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
  
    if (productoEnCarrito) {
      console.log("SI");
      //this.carritoService.actualizarCantidad(producto, cantidad)
      // El producto ya está en el carrito, actualiza la cantidad
      // Implementa la lógica para actualizar la cantidad
    } else {
      console.log("NO");
      this.carritoService.agregarProducto(producto, cantidad);
      // El producto no está en el carrito, agrégalo
      // Implementa la lógica para agregar el producto al carrito
    }
  }

  // Función para ver detalles
  viewDetails(producto: any) {
    // Aquí puedes implementar la lógica para ver detalles
  }

  // Función para agregar a favoritos
  addToFavorites(producto: any) {
    // Aquí puedes implementar la lógica para agregar a favoritos
  }
}
