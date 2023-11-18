import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Carpeta de Referencia para el servicio HTTP
import { HttpClientModule } from '@angular/common/http';

import { CarritoComponent } from './components/carrito/carrito.component'; // Asegúrate de que la ruta sea correcta

import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

@NgModule({
  declarations: [AppComponent,CarritoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule,AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativeGeocoder],
  bootstrap: [AppComponent],
})
export class AppModule {}
