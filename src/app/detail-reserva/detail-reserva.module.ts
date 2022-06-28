import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailReservaPageRoutingModule } from './detail-reserva-routing.module';

import { DetailReservaPage } from './detail-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailReservaPageRoutingModule
  ],
  declarations: [DetailReservaPage]
})
export class DetailReservaPageModule {}
