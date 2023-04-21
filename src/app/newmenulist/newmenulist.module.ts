import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewmenulistPageRoutingModule } from './newmenulist-routing.module';

import { NewmenulistPage } from './newmenulist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewmenulistPageRoutingModule
  ],
  declarations: [NewmenulistPage]
})
export class NewmenulistPageModule {}
