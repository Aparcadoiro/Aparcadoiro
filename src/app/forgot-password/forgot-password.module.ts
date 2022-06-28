//importacion del nucleo de angular 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//importacion de los formularios de angular 
import { FormsModule } from '@angular/forms';
//importacion de modulo de recuperacion de contraseña 
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';
//importacion de recuperacion decontraseña  
import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
