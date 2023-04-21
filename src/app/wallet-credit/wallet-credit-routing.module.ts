import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletCreditPage } from './wallet-credit.page';

const routes: Routes = [
  {
    path: '',
    component: WalletCreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletCreditPageRoutingModule {}
