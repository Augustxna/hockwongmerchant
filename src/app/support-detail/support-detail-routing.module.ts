import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportDetailPage } from './support-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SupportDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportDetailPageRoutingModule {}
