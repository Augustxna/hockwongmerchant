import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectormanyPage } from './selectormany.page';

const routes: Routes = [
  {
    path: '',
    component: SelectormanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectormanyPageRoutingModule {}
