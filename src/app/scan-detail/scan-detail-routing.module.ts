import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanDetailPage } from './scan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ScanDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanDetailPageRoutingModule {}
