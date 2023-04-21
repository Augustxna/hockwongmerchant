import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileWorkshopPage } from './profile-workshop.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileWorkshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileWorkshopPageRoutingModule {}
