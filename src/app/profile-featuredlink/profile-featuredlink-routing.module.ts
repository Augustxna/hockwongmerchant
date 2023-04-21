import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileFeaturedlinkPage } from './profile-featuredlink.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileFeaturedlinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileFeaturedlinkPageRoutingModule {}
