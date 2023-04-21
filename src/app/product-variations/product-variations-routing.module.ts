import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductVariationsPage } from './product-variations.page';

const routes: Routes = [
  {
    path: '',
    component: ProductVariationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductVariationsPageRoutingModule {}
