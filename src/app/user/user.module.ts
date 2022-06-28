//Importaciones para usar la rutas, de angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Importacion para usar Ionic
import { IonicModule } from '@ionic/angular';

//Importacion para usar la clase exportada de las rutas
import { UserPageRoutingModule } from './user-routing.module';

//Importacion para la usar la clase exportada del archivo .ts
import { UserPage } from './user.page';
import { MapsModule } from '../maps/maps.module';

//Importaciones para usar los modulos
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    MapsModule
  ],
  declarations: [UserPage]
})

//Funcion para exportar la clase UserPageModule
export class UserPageModule {}
