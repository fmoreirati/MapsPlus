import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})


export class AddProdutoPage implements OnInit {

  protected produto: Produto = new Produto;
  protected id: string = null;
  protected preview: string[] = null;
  protected perfil: number = 0;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 6,
    speed: 400
  };

  constructor(
    protected produtoService: ProdutoService,
    protected alertController: AlertController,
    protected router: Router,
    protected activedRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.localAtual()
  }

  //função chamada toda vez que a pagina recebe foco;
  ionViewWillEnter() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.produtoService.get(this.id).subscribe(
        res => {
          this.produto = res
        },
        erro => this.id = null
      )
    }
  }

  onsubmit(form) {
    if (!this.preview) {
      this.presentAlert("Ops!", "Tire sua foto!")
    } else {
      this.produto.foto = this.preview[this.perfil];
      this.produto.galeria = this.preview;
      if (this.id) {
        this.produtoService.update(this.produto, this.id).then(
          res => {
            this.presentAlert("Aviso", "Atualizado!");
            this.router.navigate(['/listProduto']);
            this.produto = new Produto;
            //form.reset();
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Erro ao atualizar!");
          }
        )
      } else {
        this.produtoService.save(this.produto).then(
          res => {
            this.presentAlert("Aviso", "Cadastrado!");
            this.router.navigate(['/listProduto']);
            this.produto = new Produto;
            //form.reset();
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Erro ao cadastrar!");
          }
        )
      }
    }
  }

  localAtual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.produto.lat = resp.coords.latitude
      this.produto.lng = resp.coords.longitude
      //this.loadMap()
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (!this.preview) this.preview = []
      this.preview.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  async removerFoto(index) {
    const alert = await this.alertController.create({
      header: 'Apagar foto!',
      message: 'Apagar foto do Game',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.preview.splice(index, 1);
          }
        }
      ]
    });
    await alert.present();
  }

  /* 
    loadMap() {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.produto.lat,
            lng: this.produto.lng
          },
          zoom: 18,
          tilt: 30
        }
      };
  
      this.map = GoogleMaps.create('map_canvas', mapOptions);
  
      let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.produto.lat,
          lng: this.produto.lng
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        marker.showInfoWindow;
        marker.setTitle("Titulo")
        marker.setSnippet("Descrição")
      });
  
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
        res => {
          console.log(res);
          marker.setPosition(res[0]);
          this.produto.lat = res[0].lat;
          this.produto.lng = res[0].lng;
        }
      ) */


  // Alerts ----------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
}