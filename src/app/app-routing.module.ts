import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/login/login.module').then((m) => m.LoginModule),
  },
  // {
  //   path: 'reset-password',
  //   loadChildren: () =>
  //     import('src/app/reset-password/reset-password.module').then(
  //       (m) => m.ResetPasswordModule
  //     ),
  // },
  {
    path: '',
    component: NavbarComponent,
    canActivateChild: [AuthGuard],
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
    ],
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
