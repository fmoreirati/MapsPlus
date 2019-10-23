import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  //Alertas ----------------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Loanding ---------------------------------------------
  async loading() {
    return await this.loadingController.create({
      //message: 'Carregando...',
      spinner: "dots",
      //duration: 5000,
      translucent: true,
      cssClass: "amarelo",
    }).then(
      res => {
        res.present()
        console.log("Loading...", res);
      }
    )
  }

  async dismiss() {
    return await this.loadingController.dismiss()
      .then(() => console.log('... dismissed'));
  }

  //Avisos -----------------------------------------------
  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
