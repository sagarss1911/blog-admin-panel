import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderOptionsComponent } from './header-options/header-options.component';
import { MainHeadingManagementComponent } from './main-heading-management/main-heading-management.component';
import { MainHeadingComponent } from './main-heading/main-heading.component';
import { SubHeadingManagementComponent } from './sub-heading-management/sub-heading-management.component';
import { SubHeadingComponent } from './sub-heading/sub-heading.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderOptionsComponent,
    children: [
      {
        path: '',
        redirectTo: '/websiteheader/header-HeadingManagement',
        pathMatch: 'full',
      },

      {
        path: 'header-HeadingManagement',
        component: MainHeadingManagementComponent,
      },
      { path: 'websiteMainHeading', component: MainHeadingComponent },
      { path: 'edit-header-main/:id', component: MainHeadingComponent },
      {
        path: 'header-Subheading-management',
        component: SubHeadingManagementComponent,
      },

      { path: 'websiteSubheading', component: SubHeadingComponent },
      { path: 'edit-header-sub/:id', component: SubHeadingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteHeaderRoutingModule {}
