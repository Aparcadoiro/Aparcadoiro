//importaciones de angular 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//importacion de home.page TS
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

//expotacion de la calse HomePAGE
export class HomePageRoutingModule {}
