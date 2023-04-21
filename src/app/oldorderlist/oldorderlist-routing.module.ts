import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldorderlistPage } from './oldorderlist.page';

const routes: Routes = [
  {
    path: '',
    component: OldorderlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldorderlistPageRoutingModule {}
