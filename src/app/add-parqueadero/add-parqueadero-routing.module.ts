import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importacion del  add-parqueadero TS
import { AddParqueaderoPage } from './add-parqueadero.page';

const routes: Routes = [
  {
    path: '',
    component: AddParqueaderoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddParqueaderoPageRoutingModule {}
