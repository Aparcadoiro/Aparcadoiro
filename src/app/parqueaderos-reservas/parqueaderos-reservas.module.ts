import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParqueaderosReservasPageRoutingModule } from './parqueaderos-reservas-routing.module';

import { ParqueaderosReservasPage } from './parqueaderos-reservas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParqueaderosReservasPageRoutingModule
  ],
  declarations: [ParqueaderosReservasPage]
})
export class ParqueaderosReservasPageModule {}
