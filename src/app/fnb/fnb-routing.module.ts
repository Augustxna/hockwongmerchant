import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FnbPage } from './fnb.page';

const routes: Routes = [
  {
    path: '',
    component: FnbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FnbPageRoutingModule {}
