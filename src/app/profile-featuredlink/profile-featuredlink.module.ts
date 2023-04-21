import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFeaturedlinkPageRoutingModule } from './profile-featuredlink-routing.module';

import { ProfileFeaturedlinkPage } from './profile-featuredlink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileFeaturedlinkPageRoutingModule
  ],
  declarations: [ProfileFeaturedlinkPage]
})
export class ProfileFeaturedlinkPageModule {}
