import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { BlogComponent } from './blog/blog.component';
import { ShowBlogComponent } from './show-blog/show-blog.component';

const routes: Routes = [
  { path: '', component: BlogManagementComponent },
  { path: 'edit-blog/:id', component: BlogComponent },
  { path: 'add-blog', component: BlogComponent },
  { path: 'showBlog/:id', component: ShowBlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
