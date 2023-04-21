import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductVariationsPageRoutingModule } from './product-variations-routing.module';

import { ProductVariationsPage } from './product-variations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductVariationsPageRoutingModule
  ],
  declarations: [ProductVariationsPage]
})
export class ProductVariationsPageModule {}
