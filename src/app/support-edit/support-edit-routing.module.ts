import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportEditPage } from './support-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SupportEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportEditPageRoutingModule {}
