import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-galeria-usuario',
  templateUrl: './galeria-usuario.page.html',
  styleUrls: ['./galeria-usuario.page.scss'],
})
export class GaleriaUsuarioPage implements OnInit {

  protected preview: any[] = [];

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  getPhoto(local) {
    if (local == "galeria")
      local = this.camera.PictureSourceType.PHOTOLIBRARY;
    else
      local = this.camera.PictureSourceType.CAMERA;
    let cameraOptions = {
      sourceType: local,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(cameraOptions).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.preview.push(base64Image);
        //console.log(this.preview);
      },
      err => console.log(err)
    );
  }

  //Alertas -------------------------------------------------------
  async escolher() {
    const actionSheet = await this.actionSheetController.create({
      //header: '',
      translucent: true,

      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.getPhoto("")
        }
      }, {
        text: 'Galeria',
        role: 'destructive',
        icon: 'photos',
        handler: () => {
          this.getPhoto("galeria")
        }
      }]
    });
    await actionSheet.present();
  }
}
