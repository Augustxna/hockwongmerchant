import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletCreditPageRoutingModule } from './wallet-credit-routing.module';

import { WalletCreditPage } from './wallet-credit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletCreditPageRoutingModule
  ],
  declarations: [WalletCreditPage]
})
export class WalletCreditPageModule {}
