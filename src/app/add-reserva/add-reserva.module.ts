import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReservaPageRoutingModule } from './add-reserva-routing.module';

import { AddReservaPage } from './add-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddReservaPageRoutingModule
  ],
  declarations: [AddReservaPage]
})
export class AddReservaPageModule {}
