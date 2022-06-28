//importacion de angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//importacion de los formularios reactivos de angular
import { FormsModule } from '@angular/forms';
//importacion del hom.pagen TS
import { HomePage } from './home.page';
//importacion de la ruta de home 
import { HomePageRoutingModule } from './home-routing.module';
import { MapsModule } from '../maps/maps.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MapsModule
  ],
  declarations: [HomePage]
})

export class HomePageModule {}
