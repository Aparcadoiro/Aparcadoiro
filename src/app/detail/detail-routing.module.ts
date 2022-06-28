//importaciones de angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//importacion de Detail ts
import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
