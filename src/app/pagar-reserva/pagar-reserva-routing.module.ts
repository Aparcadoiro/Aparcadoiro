import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarReservaPage } from './pagar-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: PagarReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarReservaPageRoutingModule {}
