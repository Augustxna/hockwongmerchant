import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OldorderlistPageRoutingModule } from './oldorderlist-routing.module';

import { OldorderlistPage } from './oldorderlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OldorderlistPageRoutingModule
  ],
  declarations: [OldorderlistPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OldorderlistPageModule {}
