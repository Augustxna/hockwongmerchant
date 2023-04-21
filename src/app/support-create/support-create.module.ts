import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportCreatePageRoutingModule } from './support-create-routing.module';

import { SupportCreatePage } from './support-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportCreatePageRoutingModule
  ],
  declarations: [SupportCreatePage]
})
export class SupportCreatePageModule {}
