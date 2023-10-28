import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service'; // Asegúrate de usar la ruta correcta


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent  implements OnInit {
  @Input() producto : any;
  @Input() index!: any;



  constructor(private carritoService: CarritoService) { }

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

  comprar(producto: any) {
    // Aquí puedes implementar la lógica para ver detalles
  }

  ngOnInit() {}

}
