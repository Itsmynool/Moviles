// tab4.page.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../components/carrito.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  titulo: string = 'Carrito de Compras';

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    console.log('Carrito: ', this.carritoService.obtenerProductos());
  }

  get productosEnCarrito() {
    return this.carritoService.obtenerProductos();
  }

  get total() {
    return this.productosEnCarrito.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );
  }

  eliminarDelCarrito(producto: any) {
    if (producto && producto.producto && producto.producto._id) {
      this.carritoService.eliminarProducto(producto.producto._id);
    } else {
      console.error('Producto o su identificador (_id) es nulo o indefinido.');
    }
  }

  realizarPago() {
    // Lógica para realizar el pago
  }

  incrementarCantidad(item: any) {
    this.carritoService.incrementarCantidad(item.producto._id);
  }

  decrementarCantidad(item: any) {
    if (item.cantidad > 1) {
      this.carritoService.decrementarCantidad(item.producto._id);
    }
  }
}
