import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSummernoteModule } from 'ngx-summernote';
import { WebsiteFooterRoutingModule } from './website-footer-routing.module';
import { FooterOptionsComponent } from './footer-options/footer-options.component';
import { WebsiteInfoLinksComponent } from './website-info-links/website-info-links.component';
import { LinkManagementComponent } from './link-management/link-management.component';
import { FooterHeadingComponent } from './footer-heading/footer-heading.component';
import { FooterHeadingManagementComponent } from './footer-heading-management/footer-heading-management.component';

@NgModule({
  declarations: [
    FooterOptionsComponent,
    WebsiteInfoLinksComponent,
    LinkManagementComponent,
    FooterHeadingComponent,
    FooterHeadingManagementComponent,
  ],
  imports: [
    CommonModule,
    WebsiteFooterRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
    NgxSummernoteModule,
  ],
})
export class WebsiteFooterModule {}
