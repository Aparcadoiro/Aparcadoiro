//Importaciones para usar la rutas de angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importacion para usar la pagina .ts de verify email
import { VerifyEmailPage } from './verify-email.page';

//Constante para definir la variable Routes y poder usar la ruta
const routes: Routes = [
  {
    path: '',
    component: VerifyEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// funcion para exportar la clase VerifyEmailPageRoutingModule
export class VerifyEmailPageRoutingModule {}
