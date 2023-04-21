import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchListPageRoutingModule } from './branch-list-routing.module';

import { BranchListPage } from './branch-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchListPageRoutingModule
  ],
  declarations: [BranchListPage]
})
export class BranchListPageModule {}
