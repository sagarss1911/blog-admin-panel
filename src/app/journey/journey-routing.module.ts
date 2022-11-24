import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JourneyOptionsComponent } from './journey-options/journey-options.component';
import { AddJourneycardsComponent } from './add-journeycards/add-journeycards.component';
import { AddJourneyIconsComponent } from './add-journey-icons/add-journey-icons.component';
import { JourneyIconManagementComponent } from './journey-icon-management/journey-icon-management.component';
import { JourneyCardManagementComponent } from './journey-card-management/journey-card-management.component';

const routes: Routes = [
  {
    path: '',
    component: JourneyOptionsComponent,
    children: [
      {
        path: '',
        redirectTo: '/journeys/journeyIconManagement',
        pathMatch: 'full',
      },
      {
        path: 'journeyIconManagement',
        component: JourneyIconManagementComponent,
      },
      { path: 'edit-journey/:id', component: AddJourneyIconsComponent },
      { path: 'add-journey', component: AddJourneyIconsComponent },
      {
        path: 'journeyCardManagement',
        component: JourneyCardManagementComponent,
      },
      { path: 'edit-journey-card/:id', component: AddJourneycardsComponent },
      { path: 'add-journey-card', component: AddJourneycardsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JourneyRoutingModule {}
