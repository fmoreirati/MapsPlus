import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'addUsuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  { path: 'perfilUsuario/:id', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'listUsuario', loadChildren: './pages/list-usuario/list-usuario.module#ListUsuarioPageModule' },
  { path: 'galeriaUsuario', loadChildren: './pages/galeria-usuario/galeria-usuario.module#GaleriaUsuarioPageModule' },
  { path: 'addProduto', loadChildren: './pages/add-produto/add-produto.module#AddProdutoPageModule' },
  { path: 'perfilProduto', loadChildren: './pages/perfil-produto/perfil-produto.module#PerfilProdutoPageModule' },
  { path: 'listProduto', loadChildren: './pages/list-produto/list-produto.module#ListProdutoPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
