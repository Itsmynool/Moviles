import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriasComponent } from './categorias/categorias.component';



@NgModule({
  declarations: [
  CategoriaComponent,
  CategoriasComponent
],
exports: [
  CategoriaComponent,
  CategoriasComponent
],
imports: [
  CommonModule,
  IonicModule
]

})
export class CategoriasModule { }
