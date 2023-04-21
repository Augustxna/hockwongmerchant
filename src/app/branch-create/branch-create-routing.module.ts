import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchCreatePage } from './branch-create.page';

const routes: Routes = [
  {
    path: '',
    component: BranchCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchCreatePageRoutingModule {}
