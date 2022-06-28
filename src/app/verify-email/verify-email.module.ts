//Importaciones para usar la rutas, de angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Importacion para usar Ionic
import { IonicModule } from '@ionic/angular';

//Importacion para usar la clase exportada de las rutas
import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';

//Importacion para la usar la clase exportada del archivo .ts
import { VerifyEmailPage } from './verify-email.page';

//Importaciones para usar los modulos
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmailPageRoutingModule
  ],
  declarations: [VerifyEmailPage]
})

//Funcion para exportar la clase VerifyEmailPageModule
export class VerifyEmailPageModule {}
