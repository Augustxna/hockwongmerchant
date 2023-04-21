import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffdetailPage } from './staffdetail.page';

const routes: Routes = [
  {
    path: '',
    component: StaffdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffdetailPageRoutingModule {}
