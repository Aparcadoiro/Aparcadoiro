//Importaciones de angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//Importacion de ionic de angular
import { IonicModule } from '@ionic/angular';
//importacion de la ruta de mapbox
import { MapBoxPageRoutingModule } from './map-box-routing.module';

import { MapBoxPage } from './map-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapBoxPageRoutingModule
  ],
  declarations: [MapBoxPage]
})
export class MapBoxPageModule {}
