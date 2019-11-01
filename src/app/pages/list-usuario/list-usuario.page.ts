import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any;

  constructor(
    protected usuarioService: UsuarioService,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.atualizar()
  }

  editar(key) {
    this.router.navigate(['/addUsuario', key]);
  }

  atualizar() {
    this.usuarios = this.usuarioService.getAll();
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    await this.atualizar()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  //Alerts ------------------------------------------

  async remover(key) {
    const alert = await this.alertController.create({
      header: 'Apagar!',
      message: 'Deseja apagar pdados definitivamente?',
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
            this.usuarioService.remover(key);
          }
        }
      ]
    });
    await alert.present();
  }
}