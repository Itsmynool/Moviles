// src/app/services/mongodb.services.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; // Cambié 'rxjs' por 'rxjs/operators'
import { URL_SERVICIOS } from '../config/url.servicios'; // Ruta corregida

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http: HttpClient) { }

  getProductosXGenero(genero: string) {
    return this.http.get(`${URL_SERVICIOS}/productos/genero/${genero}`, {}).pipe(
      map((res: any) => {
        console.log('Productos', res);
        return res;
      })
    );
  }
}
