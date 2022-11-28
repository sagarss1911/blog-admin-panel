import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { SuggestionsComponent } from './suggestions/suggestions.component';

@NgModule({
  declarations: [SuggestionsComponent],
  imports: [CommonModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
