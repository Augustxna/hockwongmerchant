import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchListPage } from './branch-list.page';

const routes: Routes = [
  {
    path: '',
    component: BranchListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchListPageRoutingModule {}
