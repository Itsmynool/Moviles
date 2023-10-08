import { Component } from '@angular/core';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent {
  productosEnCarrito: any[] = [];

  constructor(private carritoService: CarritoService) {
    this.productosEnCarrito = this.carritoService.obtenerProductos();
    console.log("PRODUCTOS: ", this.productosEnCarrito)
  }

  eliminarDelCarrito(producto: any) {
    const index = this.productosEnCarrito.indexOf(producto);
    if (index !== -1) {
      this.carritoService.eliminarProducto(index);
      this.productosEnCarrito.splice(index, 1);
    }
  }
  
}
