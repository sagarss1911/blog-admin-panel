import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryRoutingModule } from './category-routing.module';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [AddCategoryComponent, CategoryManagementComponent],
  imports: [
    SharedModule,

    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
    CategoryRoutingModule,
    DropdownModule,
  ],
  providers: [AddCategoryComponent],
})
export class CategoryModule {}
