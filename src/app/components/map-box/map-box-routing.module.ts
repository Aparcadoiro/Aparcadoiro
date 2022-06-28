//importacion del nucleo de angular
import { NgModule } from '@angular/core';
//importacion de de la ruta de angular
import { Routes, RouterModule } from '@angular/router';
//importacion del componente map-box TS
import { MapBoxPage } from './map-box.page';

const routes: Routes = [
  {
    path: '',
    component: MapBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
//exportar la clase mapBox 
export class MapBoxPageRoutingModule {}
