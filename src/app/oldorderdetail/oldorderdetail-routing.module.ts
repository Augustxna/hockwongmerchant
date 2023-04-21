import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldorderdetailPage } from './oldorderdetail.page';

const routes: Routes = [
  {
    path: '',
    component: OldorderdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldorderdetailPageRoutingModule {}
