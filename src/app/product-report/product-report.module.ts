import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductReportPageRoutingModule } from './product-report-routing.module';

import { ProductReportPage } from './product-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductReportPageRoutingModule
  ],
  declarations: [ProductReportPage]
})
export class ProductReportPageModule {}
