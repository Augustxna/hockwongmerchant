import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmenulistPage } from './newmenulist.page';

const routes: Routes = [
  {
    path: '',
    component: NewmenulistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewmenulistPageRoutingModule {}
