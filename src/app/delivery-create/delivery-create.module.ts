import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryCreatePageRoutingModule } from './delivery-create-routing.module';

import { DeliveryCreatePage } from './delivery-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryCreatePageRoutingModule
  ],
  declarations: [DeliveryCreatePage]
})
export class DeliveryCreatePageModule {}
