import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { NotfoundComponent } from '../notfound/notfound.component';
import { FeaturedPlaceComponent } from './featured-place/featured-place.component';
import { HeaderComponent } from './header/header.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { HomeComponent } from './home/home.component';
import { WebsitePlacesComponent } from './website-places/website-places.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeCardComponent,
      },
      {
        path: 'places-featured',
        component: FeaturedPlaceComponent,
      },
      {
        path: 'home/places-featured',
        component: WebsitePlacesComponent,
      },
      {
        path: 'header',
        component: HeaderComponent,
      },
    ],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('src/app/login/login.module').then((m) => m.LoginModule),
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
