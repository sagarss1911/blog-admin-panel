import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminAuthGuard } from './admin-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: NavbarComponent,
    // canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'admin-users',
        loadChildren: () =>
          import('src/app/admin-users/admin-users.module').then(
            (m) => m.AdminUsersModule
          ),
      },
      {
        path: 'places',
        loadChildren: () =>
          import('src/app/place/place.module').then((m) => m.PlaceModule),
      },

      {
        path: 'blogs',
        loadChildren: () =>
          import('src/app/blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('src/app/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'subscriber',
        loadChildren: () =>
          import('src/app/subscriber/subscriber.module').then(
            (m) => m.SubscriberModule
          ),
      },
      {
        path: 'aboutus',
        loadChildren: () =>
          import('src/app/about-us/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      },
      {
        path: 'journeys',
        loadChildren: () =>
          import('src/app/journey/journey.module').then((m) => m.JourneyModule),
      },
      {
        path: 'websitefooter',
        loadChildren: () =>
          import('src/app/website-footer/website-footer.module').then(
            (m) => m.WebsiteFooterModule
          ),
      },
      {
        path: 'websiteheader',
        loadChildren: () =>
          import('src/app/website-header/website-header.module').then(
            (m) => m.WebsiteHeaderModule
          ),
      },
    ],
  },

  {
    path: 'contributors',
    loadChildren: () =>
      import('src/app/contributors/contributors.module').then(
        (m) => m.ContributorsModule
      ),
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
