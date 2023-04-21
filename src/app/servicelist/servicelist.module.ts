import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicelistPageRoutingModule } from './servicelist-routing.module';

import { ServicelistPage } from './servicelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicelistPageRoutingModule
  ],
  declarations: [ServicelistPage]
})
export class ServicelistPageModule {}
