import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GaleriaUsuarioPage } from './galeria-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriaUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GaleriaUsuarioPage]
})
export class GaleriaUsuarioPageModule {}
