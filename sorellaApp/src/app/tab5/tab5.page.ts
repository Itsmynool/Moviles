import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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

  async scanBarcode() {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.processBarcode(result.content);
        this.presentToast("Código escaneado correctamente");
      }
    } catch (error) {
      this.presentToast("Error al escanear el código");
      console.error('Error', error);
    }
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
