import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MongodbService } from './services/mongodb.services';

import { HttpClientModule } from '@angular/common/http';

import { CarritoComponent } from './carrito/carrito.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [AppComponent, CarritoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MongodbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
