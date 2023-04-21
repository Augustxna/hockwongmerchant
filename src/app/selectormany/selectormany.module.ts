import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectormanyPageRoutingModule } from './selectormany-routing.module';

import { SelectormanyPage } from './selectormany.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectormanyPageRoutingModule
  ],
  declarations: [SelectormanyPage]
})
export class SelectormanyPageModule {}
