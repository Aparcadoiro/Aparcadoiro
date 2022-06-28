//importacion del nucleo de angular
import { NgModule } from '@angular/core';
//importacion del modulo COMMON para exportar directrices 
import { CommonModule } from '@angular/common';
//importacion del modulo del formulario reactivo
import { FormsModule } from '@angular/forms';
//importacion del modulo de aionic de angular 
import { IonicModule } from '@ionic/angular';
//importacion de las rutas del modulo de rutas de angular 
import { AdminPageRoutingModule } from './admin-routing.module';
//importacion del admin page ts
import { AdminPage } from './admin.page';

//importacion del NGMODULE
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage]
})
//exportacion de la clase admin
export class AdminPageModule {}
