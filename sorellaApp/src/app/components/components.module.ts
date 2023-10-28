import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';


@NgModule({
  declarations: [
    ProductoComponent,
    ProductosComponent,
  ],
  exports: [
    ProductoComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
