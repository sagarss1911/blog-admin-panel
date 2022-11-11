import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';

import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogManagementComponent } from './blog-management/blog-management.component';

import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [BlogManagementComponent, BlogComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    DropdownModule,
    NgSelectModule,
    FormsModule,
    NgxLoadingModule,
    SharedPaginationModule,
    SharedModule,
  ],
  providers: [BlogComponent],
})
export class BlogsModule {}
