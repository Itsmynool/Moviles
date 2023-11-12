import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { URL_SERVICIOS } from 'src/config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/categorias/`, {}).pipe(
      map((res: any) => {
        //console.log('Categorias', res);
        return res;
      })
    );
  }

  getBuscarCategorias(terminoBusqueda: string): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/buscar/categorias/${terminoBusqueda}`, {}).pipe(
      map((res: any) => {
        //console.log('Categorias', res);
        return res;
      })
    );
  }

  getProductos(): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/productos`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getProductosComo(terminoBusqueda: string): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/buscar/productos/${terminoBusqueda}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

    getBuscarProductosPorCategoria(termino: string, categoria: string): Observable<any> {
    const url = `${URL_SERVICIOS}/buscar/productos/${termino}/${categoria}`;
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        // console.log('Productos por categoría', res);
        return res;
      })
    );
  }
}
