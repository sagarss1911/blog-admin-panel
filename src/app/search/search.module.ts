import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import { BlogSearchComponent } from './blog-search/blog-search.component';
// mat

@NgModule({
  declarations: [BlogSearchComponent],
  imports: [CommonModule, SearchRoutingModule, FormsModule],
})
export class SearchModule {}
