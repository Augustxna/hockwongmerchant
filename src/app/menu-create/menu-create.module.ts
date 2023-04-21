import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCreatePageRoutingModule } from './menu-create-routing.module';

import { MenuCreatePage } from './menu-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCreatePageRoutingModule
  ],
  declarations: [MenuCreatePage]
})
export class MenuCreatePageModule {}
