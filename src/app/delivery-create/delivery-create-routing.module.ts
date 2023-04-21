import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryCreatePage } from './delivery-create.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryCreatePageRoutingModule {}
