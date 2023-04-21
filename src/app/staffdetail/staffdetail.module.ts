import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffdetailPageRoutingModule } from './staffdetail-routing.module';

import { StaffdetailPage } from './staffdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffdetailPageRoutingModule
  ],
  declarations: [StaffdetailPage]
})
export class StaffdetailPageModule {}
