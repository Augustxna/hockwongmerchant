import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductLinkPage } from './product-link.page';

const routes: Routes = [
  {
    path: '',
    component: ProductLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductLinkPageRoutingModule {}
