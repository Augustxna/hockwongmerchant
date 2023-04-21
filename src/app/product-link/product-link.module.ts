import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductLinkPageRoutingModule } from './product-link-routing.module';

import { ProductLinkPage } from './product-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductLinkPageRoutingModule
  ],
  declarations: [ProductLinkPage]
})
export class ProductLinkPageModule {}
