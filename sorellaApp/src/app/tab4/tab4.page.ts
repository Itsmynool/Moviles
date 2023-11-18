import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../components/carrito.service';

import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  titulo: string = 'Carrito de Compras';
  nativegeocoder: any;
  ubicacion: string | undefined;
  coordenadas: any[] | undefined;

  constructor(
    private carritoService: CarritoService, 
    private nativeGeocoder: NativeGeocoder
  ) { this.nativegeocoder = nativeGeocoder; }

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

  get descuento() {
    return this.carritoService.obtenerValorDescuento();
  }

  get totalConDescuento() {
    const total = this.total;
    return total > 0 ? total - this.descuento : 0;
  }

  eliminarDelCarrito(producto: any) {
    if (producto && producto.producto && producto.producto._id) {
      this.carritoService.eliminarProducto(producto.producto._id);
    } else {
      console.error('Producto o su identificador (_id) es nulo o indefinido.');
    }
  }

  realizarPago() {
    this.carritoService.restablecerDescuento();
  }

  incrementarCantidad(item: any) {
    this.carritoService.incrementarCantidad(item.producto._id);
  }

  decrementarCantidad(item: any) {
    if (item.cantidad > 1) {
      this.carritoService.decrementarCantidad(item.producto._id);
    }
  }

  async obtenerUbicacion() {
    try {
      // Obtener la posición actual
      const position = await Geolocation.getCurrentPosition();

      // Opciones para el geocodificador
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
      };

      // Realizar geocodificación inversa para obtener la dirección
      this.nativegeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude, options)
        .then((results: NativeGeocoderResult[]) => {
          this.ubicacion = JSON.stringify(results[0]);
          console.log('Ubicación:', this.ubicacion);
        })
        .catch((error: any) => console.error('Error en geocodificación:', error));

      // Guardar las coordenadas
      this.coordenadas = [position.coords.latitude, position.coords.longitude];
    } catch (e) {
      console.error('Error al obtener la ubicación:', e);
    }
  }
}
