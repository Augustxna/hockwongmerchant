import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancecreditPageRoutingModule } from './balancecredit-routing.module';

import { BalancecreditPage } from './balancecredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalancecreditPageRoutingModule
  ],
  declarations: [BalancecreditPage]
})
export class BalancecreditPageModule {}
