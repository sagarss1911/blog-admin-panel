import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsCardsComponent } from './about-us-cards/about-us-cards.component';
import { AboutUsManagementComponent } from './about-us-management/about-us-management.component';
import { AboutUsOptionsComponent } from './about-us-options/about-us-options.component';
import { AddAboutUsComponent } from './add-about-us/add-about-us.component';
import { CardsManagementComponent } from './cards-management/cards-management.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsOptionsComponent,
    children: [
      {
        path: '',
        redirectTo: '/aboutus/aboutUsManagement',
        pathMatch: 'full',
      },
      { path: 'aboutUsManagement', component: AboutUsManagementComponent },
      { path: 'edit-aboutUs/:id', component: AddAboutUsComponent },
      { path: 'add-aboutUs', component: AddAboutUsComponent },
      { path: 'aboutUsCardManagement', component: CardsManagementComponent },
      { path: 'add-aboutUs-card', component: AboutUsCardsComponent },
      { path: 'edit-aboutUs-card/:id', component: AboutUsCardsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
