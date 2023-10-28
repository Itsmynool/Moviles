import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloComponent } from './articulo/articulo.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
  ArticuloComponent,
  ArticulosComponent
],
exports: [
  ArticuloComponent,
  ArticulosComponent
],
imports: [
  CommonModule,
  IonicModule
]

})
export class ArticulosModule { }
