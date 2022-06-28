import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParqueaderosReservasPage } from './parqueaderos-reservas.page';

const routes: Routes = [
  {
    path: '',
    component: ParqueaderosReservasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParqueaderosReservasPageRoutingModule {}
