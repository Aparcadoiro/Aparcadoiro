//importaciones de angular 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//importacion de la ruta de parqueaderos 
import { ParqueaderosPageRoutingModule } from './parqueaderos-routing.module';
//importacion de parqueaderos TS
import { ParqueaderosPage } from './parqueaderos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParqueaderosPageRoutingModule
  ],
  declarations: [ParqueaderosPage]
})
export class ParqueaderosPageModule {}
