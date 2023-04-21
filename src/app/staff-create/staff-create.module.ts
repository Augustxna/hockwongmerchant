import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffCreatePageRoutingModule } from './staff-create-routing.module';

import { StaffCreatePage } from './staff-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffCreatePageRoutingModule
  ],
  declarations: [StaffCreatePage]
})
export class StaffCreatePageModule {}
