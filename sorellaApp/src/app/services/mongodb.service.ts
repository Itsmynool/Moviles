import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { URL_SERVICIOS } from 'src/config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getProductosComo(unComo:string){
    return this.http.get(`${URL_SERVICIOS}/buscar/productos/${unComo}`, {}).pipe(
      map((res: any) => {
        console.log('Productos',res);
        return res;
      })
    );
  }


  getBuscarCategorias(): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/categorias/`, {}).pipe(
      map((res: any) => {
        console.log('Categorias', res);
        return res;
      })
    );
  }
  

}
