import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-galeria-usuario',
  templateUrl: './galeria-usuario.page.html',
  styleUrls: ['./galeria-usuario.page.scss'],
})
export class GaleriaUsuarioPage implements OnInit {

  protected preview: any[] = [];
  protected imageSrc: string;

  constructor(
    private photoLibrary: PhotoLibrary,
    private androidPermissions: AndroidPermissions,
    private camera: Camera
  ) { }


  ngOnInit() {
    this.permitir()
  }


  async pegarFoto() {
    await this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(l => {
            this.preview.push(l)
          })
          console.log("Preview: ", this.preview);
          console.log("Library: ", library);
        },
        error: err => { console.log('could not get photos : ', err); },
        complete: () => { console.log('done getting photos'); }
      });
    })
      .catch(err => console.log('permissions weren\'t granted'));
  }


  async openGallery() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }
   await this.camera.getPicture(cameraOptions).then(
      file_uri => {
        this.imageSrc = file_uri
        //console.log(file_uri);
      },
      err => console.log(err)
    );
    console.log(this.imageSrc);
    
  }


  async tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    await this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(base64Image);
      }, (err) => {
        console.log(err);
      });
  }


  //------------------------------------------------------------------
  permitir() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.STORAGE)
    );
  }

}
