import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarReservaPageRoutingModule } from './pagar-reserva-routing.module';

import { PagarReservaPage } from './pagar-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagarReservaPageRoutingModule
  ],
  declarations: [PagarReservaPage]
})
export class PagarReservaPageModule {}
