import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchEditPageRoutingModule } from './branch-edit-routing.module';

import { BranchEditPage } from './branch-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchEditPageRoutingModule
  ],
  declarations: [BranchEditPage]
})
export class BranchEditPageModule {}
