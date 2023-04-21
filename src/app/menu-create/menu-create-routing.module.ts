import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCreatePage } from './menu-create.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCreatePageRoutingModule {}
