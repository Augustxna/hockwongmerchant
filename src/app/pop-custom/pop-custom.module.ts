import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopCustomPageRoutingModule } from './pop-custom-routing.module';

import { PopCustomPage } from './pop-custom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopCustomPageRoutingModule
  ],
  declarations: [PopCustomPage]
})
export class PopCustomPageModule {}
