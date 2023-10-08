import { Component } from '@angular/core';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent {
  productosEnCarrito: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {
    this.productosEnCarrito = this.carritoService.obtenerProductos();
    for (let i = 0; i < this.productosEnCarrito.length; i++) {
      this.total += (this.productosEnCarrito[i].producto.precio * this.productosEnCarrito[i].cantidad);
    }
  }

  eliminarDelCarrito(producto: any) {
    this.carritoService.eliminarProducto(producto._id)
  }

  realizarPago(){
  }
  
}
