// carrito.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: any[] = [];
  private descuento = 5000; // Valor del descuento
  private codigosDescuentoValidos = ['12345', '67890', 'abcde'];
  private valorDescuento: number = 0;
  private codigosUsados: Set<string> = new Set();

  constructor() {
    // Obtener los datos del carrito almacenados en localStorage (si los hay)
    const carritoLocalStorage = localStorage.getItem('carrito');
    if (carritoLocalStorage) {
      this.carrito = JSON.parse(carritoLocalStorage);
    }
  }

  restablecerDescuento() {
    this.valorDescuento = 0;
    this.codigosUsados.clear();
    this.carrito = [];
    this.actualizarLocalStorage();
  }

  aplicarDescuento(codigo: string): boolean {
    if (this.codigosDescuentoValidos.includes(codigo) && 
        this.valorDescuento === 0 && 
        !this.codigosUsados.has(codigo)) {
      
      this.valorDescuento = 20000; // Establecer el valor del descuento
      this.codigosUsados.add(codigo); // Añadir código a la lista de usados
      return true;
    }
    return false;
  }

  obtenerValorDescuento(): number {
    return this.valorDescuento;
  }

  obtenerDescuento(): number {
    // Obtener el descuento del localStorage, si existe
    const descuentoLocalStorage = localStorage.getItem('descuento');
    return descuentoLocalStorage ? JSON.parse(descuentoLocalStorage) : 0;
  }

  agregarProducto(producto: any, cantidad: number) {
    // Verificar si el producto ya existe en el carrito
    const index = this.carrito.findIndex((item) => item.producto._id === producto._id);

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

  eliminarProducto(id: string) {
    // Buscar el índice del producto en el carrito por su id
    const index = this.carrito.findIndex((item) => item.producto?._id === id);

    if (index !== -1) {
      // Si se encuentra el producto por su id, eliminarlo del carrito
      this.carrito.splice(index, 1);

      // Actualizar los datos del carrito en localStorage
      this.actualizarLocalStorage();
    }
  }

  incrementarCantidad(id: string) {
    // Incrementar la cantidad del producto en el carrito
    const index = this.carrito.findIndex((item) => item.producto?._id === id);

    if (index !== -1) {
      this.carrito[index].cantidad += 1;

      // Actualizar los datos del carrito en localStorage
      this.actualizarLocalStorage();
    }
  }

  decrementarCantidad(id: string) {
    // Decrementar la cantidad del producto en el carrito
    const index = this.carrito.findIndex((item) => item.producto?._id === id);

    if (index !== -1 && this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad -= 1;

      // Actualizar los datos del carrito en localStorage
      this.actualizarLocalStorage();
    }
  }

  obtenerProductos() {
    return this.carrito;
  }

  obtenerItemDelCarrito(producto: any): boolean {
    const index = this.carrito.findIndex((item) => item.producto?._id === producto._id);
    return index !== -1;
  }

  private actualizarLocalStorage() {
    // Actualizar los datos del carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
