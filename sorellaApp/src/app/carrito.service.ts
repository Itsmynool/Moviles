import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {
    // Obtener los datos del carrito almacenados en localStorage (si los hay)
    const carritoLocalStorage = localStorage.getItem('carrito');
    if (carritoLocalStorage) {
      this.carrito = JSON.parse(carritoLocalStorage);
    }
  }

  agregarProducto(producto: any) {
    this.carrito.push(producto);
    this.actualizarLocalStorage();
  }

  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);
    this.actualizarLocalStorage();
  }

  obtenerProductos() {
    return this.carrito;
  }

  obtenerItemDelCarrito(producto: any): boolean {
    const index = this.carrito.findIndex((item) => item[0] === producto);
    return index !== -1;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
