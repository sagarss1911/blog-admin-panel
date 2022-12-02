import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterHeadingManagementComponent } from './footer-heading-management/footer-heading-management.component';
import { FooterHeadingComponent } from './footer-heading/footer-heading.component';
import { FooterOptionsComponent } from './footer-options/footer-options.component';
import { LinkManagementComponent } from './link-management/link-management.component';
import { WebsiteInfoLinksComponent } from './website-info-links/website-info-links.component';

const routes: Routes = [
  {
    path: '',
    component: FooterOptionsComponent,
    children: [
      {
        path: '',
        redirectTo: '/websitefooter/websiteLinks',
        pathMatch: 'full',
      },
      { path: 'websiteLinks', component: LinkManagementComponent },
      { path: 'edit-footer-links/:id', component: WebsiteInfoLinksComponent },
      { path: 'add-footer-links', component: WebsiteInfoLinksComponent },
      { path: 'footer-Headings', component: FooterHeadingManagementComponent },
      { path: 'edit-footer-headings/:id', component: FooterHeadingComponent },
      { path: 'add-footer-headings', component: FooterHeadingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteFooterRoutingModule {}
