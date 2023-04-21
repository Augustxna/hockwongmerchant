import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopCustomPage } from './pop-custom.page';

const routes: Routes = [
  {
    path: '',
    component: PopCustomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopCustomPageRoutingModule {}
