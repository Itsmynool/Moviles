import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CarritoService } from '../components/carrito.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {
  manualBarcode: string = '';

  constructor(
    private barcodeScanner: BarcodeScanner, 
    private carritoService: CarritoService,
    private toastController: ToastController
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000 // 3000 ms = 3 segundos
    });
    toast.present();
  }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        this.processBarcode(barcodeData.text);
        this.presentToast("Código escaneado correctamente");
      }
    }).catch(err => {
        console.error('Error', err);
    });
  }

  submitManualBarcode() {
    this.processBarcode(this.manualBarcode);
    this.presentToast("Código ingresado correctamente");
    this.manualBarcode = '';
  }

  processBarcode(data: string) {
    if (this.carritoService.aplicarDescuento(data)) {
      console.log('Descuento aplicado con éxito');
    } else {
      console.log('Código de barras no válido para descuentos');
    }
  }
}
