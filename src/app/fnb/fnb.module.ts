import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FnbPageRoutingModule } from './fnb-routing.module';

import { FnbPage } from './fnb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FnbPageRoutingModule
  ],
  declarations: [FnbPage]
})
export class FnbPageModule {}
