import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffCreatePage } from './staff-create.page';

const routes: Routes = [
  {
    path: '',
    component: StaffCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffCreatePageRoutingModule {}
