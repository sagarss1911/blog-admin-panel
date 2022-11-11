import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryManagementComponent } from './category-management/category-management.component';

const routes: Routes = [
  { path: '', component: CategoryManagementComponent },
  { path: 'edit-category/:id', component: AddCategoryComponent },
  { path: 'add-category', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
