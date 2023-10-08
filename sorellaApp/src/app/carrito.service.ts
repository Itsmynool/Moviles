// carrito.service.ts
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

  agregarProducto(producto: any, cantidad: number) {
    // Verificar si el producto ya existe en el carrito
    const index = this.carrito.findIndex((item) => item.producto._id === producto._id);
    console.log("PRODUCTO.ID: ", producto._id);

    if (index !== -1) {
      // Si el producto ya existe, actualizar la cantidad
      this.carrito[index].cantidad += cantidad;
    } else {
      // Si el producto no existe, agregarlo al carrito
      this.carrito.push({ producto, cantidad });
    }

    // Actualizar los datos del carrito en localStorage
    this.actualizarLocalStorage();
  }

  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);

    // Actualizar los datos del carrito en localStorage
    this.actualizarLocalStorage();
  }

  obtenerProductos() {
    return this.carrito;
  }

  obtenerItemDelCarrito(producto: any): boolean {
    const index = this.carrito.findIndex((item) => item.producto._id === producto._id);
    return index !== -1;
  }
  

  private actualizarLocalStorage() {
    // Actualizar los datos del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
