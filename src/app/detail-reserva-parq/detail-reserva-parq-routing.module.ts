import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailReservaParqPage } from './detail-reserva-parq.page';

const routes: Routes = [
  {
    path: '',
    component: DetailReservaParqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailReservaParqPageRoutingModule {}
