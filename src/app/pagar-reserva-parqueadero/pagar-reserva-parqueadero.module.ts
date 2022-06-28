import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarReservaParqueaderoPageRoutingModule } from './pagar-reserva-parqueadero-routing.module';

import { PagarReservaParqueaderoPage } from './pagar-reserva-parqueadero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagarReservaParqueaderoPageRoutingModule
  ],
  declarations: [PagarReservaParqueaderoPage]
})
export class PagarReservaParqueaderoPageModule {}
