import { Component } from '@angular/core';
import { MongodbService } from '../services/mongodb.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  ngOnInit(){
    this.cargarArticulos()
  }
  misArticulos : any = [];
  constructor(private mongodb:MongodbService) {}

  async cargarArticulos() {
    //this.cargando = true;
    await this.mongodb
      .getProductosComo("Collar")
      .toPromise()
      .then((resp: any) => {
        this.misArticulos = resp.results;

        console.log('Articulos', this.misArticulos);
      });
  }

}
