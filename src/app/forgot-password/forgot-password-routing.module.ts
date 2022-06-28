//importaciones de angular 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//importacion de la validacion de contraseña ts
import { ForgotPasswordPage } from './forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPageRoutingModule {}
