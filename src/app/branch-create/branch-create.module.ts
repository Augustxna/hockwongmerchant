import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchCreatePageRoutingModule } from './branch-create-routing.module';

import { BranchCreatePage } from './branch-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchCreatePageRoutingModule
  ],
  declarations: [BranchCreatePage]
})
export class BranchCreatePageModule {}
