//importacion del nucleo de angular
import { NgModule } from '@angular/core';
//importacion de las rutas de angular
import { Routes, RouterModule } from '@angular/router';
//importacion del componente page 
import { AdminPage } from './admin.page';

//constante de rutas 
const routes: Routes = [
  {
    path: '',
    component: AdminPage
  }
];

//importacion de los NGmodulos 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
//exportacion de la calse ADMINPAGE
export class AdminPageRoutingModule {}
