import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

const routes: Routes = [
  { path: '', redirectTo: 'suggestionUser', pathMatch: 'full' },
  {
    path: 'suggestionUser',
    component: SuggestionsComponent,
  },

  {
    path: 'login',
    loadChildren: () =>
      import('src/app/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
