import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileWorkshopPageRoutingModule } from './profile-workshop-routing.module';

import { ProfileWorkshopPage } from './profile-workshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileWorkshopPageRoutingModule
  ],
  declarations: [ProfileWorkshopPage]
})
export class ProfileWorkshopPageModule {}
