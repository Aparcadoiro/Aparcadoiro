import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailReservaParqPageRoutingModule } from './detail-reserva-parq-routing.module';

import { DetailReservaParqPage } from './detail-reserva-parq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailReservaParqPageRoutingModule
  ],
  declarations: [DetailReservaParqPage]
})
export class DetailReservaParqPageModule {}
