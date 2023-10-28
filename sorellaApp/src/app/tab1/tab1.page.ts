import { Component } from '@angular/core';
import { MongodbService } from '../services/mongodb.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  navCtrl: any;

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

  navigateToOtherPage() {
    // Replace 'other' with the name of the page you want to navigate to
    this.navCtrl.navigateForward('.../tab2/tab2.module.ts');
  }
}


