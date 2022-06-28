//importaciones de angular 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//importacion de ionic angular
import { IonicModule } from '@ionic/angular';
//importacion del modulo de detail 
import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule
  ],
  declarations: [DetailComponent]
})
export class DetailPageModule {}
