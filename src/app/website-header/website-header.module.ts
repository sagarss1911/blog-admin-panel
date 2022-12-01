import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteHeaderRoutingModule } from './website-header-routing.module';
import { MainHeadingComponent } from './main-heading/main-heading.component';
import { HeaderOptionsComponent } from './header-options/header-options.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SharedPaginationModule } from '../shared-components/shared-pagination/shared-pagination.module';
import { MainHeadingManagementComponent } from './main-heading-management/main-heading-management.component';
import { SubHeadingManagementComponent } from './sub-heading-management/sub-heading-management.component';
import { SubHeadingComponent } from './sub-heading/sub-heading.component';

@NgModule({
  declarations: [MainHeadingComponent, HeaderOptionsComponent, MainHeadingManagementComponent, SubHeadingManagementComponent, SubHeadingComponent],
  imports: [
    CommonModule,
    WebsiteHeaderRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
    NgxSummernoteModule,
  ],
})
export class WebsiteHeaderModule {}
