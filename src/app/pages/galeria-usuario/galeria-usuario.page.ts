import { Component, OnInit } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-galeria-usuario',
  templateUrl: './galeria-usuario.page.html',
  styleUrls: ['./galeria-usuario.page.scss'],
})
export class GaleriaUsuarioPage implements OnInit {

  protected preview: any[] = [];

  constructor(
    private photoLibrary: PhotoLibrary,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.permitir()
  }

  async pegarFoto() {
    this.photoLibrary.requestAuthorization().then(() => {

      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(l => {
            this.preview.push(l)
          })
          console.log("Preview: ", this.preview);
          console.log("Library: ", library);

          // library.forEach(function (libraryItem) {
          //   console.log(libraryItem.id);          // ID of the photo
          //   console.log(libraryItem.photoURL);    // Cross-platform access to photo
          //   console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
          //   console.log(libraryItem.fileName);
          //   console.log(libraryItem.width);
          //   console.log(libraryItem.height);
          //   console.log(libraryItem.creationDate);
          //   console.log(libraryItem.latitude);
          //   console.log(libraryItem.longitude);
          //   console.log(libraryItem.albumIds);
          // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          //});
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
      .catch(err => console.log('permissions weren\'t granted'));
  }

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
