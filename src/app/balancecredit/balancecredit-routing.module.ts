import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalancecreditPage } from './balancecredit.page';

const routes: Routes = [
  {
    path: '',
    component: BalancecreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalancecreditPageRoutingModule {}
