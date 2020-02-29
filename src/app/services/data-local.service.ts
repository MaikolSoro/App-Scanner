import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

   constructor(private storage: Storage, private navCtrl: NavController, private iab: InAppBrowser) {
        this.cargarStorage();
   }

   // cargo la información del storage
   async cargarStorage() {
    this.guardados = await this.storage.get('registros') || [];
   }

   // guardo el registro 
   async guardarRegistro(format: string, text: string) {

    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift( nuevoRegistro);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }
  
  // abro el registro en el navegador
  abrirRegistro(registro: Registro) {
  this.navCtrl.navigateForward('/tabs/tab2');

  switch (registro.type) {
    
    case 'http':
      // abrir en el navegador web
      this.iab.create(registro.text, '_system');
      break;
  }
  }
}
