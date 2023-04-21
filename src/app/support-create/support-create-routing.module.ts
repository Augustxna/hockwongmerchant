import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportCreatePage } from './support-create.page';

const routes: Routes = [
  {
    path: '',
    component: SupportCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportCreatePageRoutingModule {}
