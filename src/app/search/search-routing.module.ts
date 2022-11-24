import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogSearchComponent } from './blog-search/blog-search.component';

const routes: Routes = [{ path: '', component: BlogSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
