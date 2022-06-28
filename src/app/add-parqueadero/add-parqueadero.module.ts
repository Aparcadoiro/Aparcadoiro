//importacion del nucleo de angular 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//importacion del modulo del formulario 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//importacion del modulo de ionic angular
import { IonicModule } from '@ionic/angular';
//importacion del modulo de parqueadero
import { AddParqueaderoPageRoutingModule } from './add-parqueadero-routing.module';
//importacion del add-parqueadero ts
import { AddParqueaderoPage } from './add-parqueadero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddParqueaderoPageRoutingModule
  ],
  declarations: [AddParqueaderoPage]
})
export class AddParqueaderoPageModule {}
