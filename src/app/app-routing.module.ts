// import { AuthGuard } from './auth.guard';
// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { NotfoundComponent } from './notfound/notfound.component';
// import { NavbarComponent } from './navbar/navbar.component';

// const routes: Routes = [
//   {
//     path: 'login',
//     loadChildren: () =>
//       import('src/app/login/login.module').then((m) => m.LoginModule),
//   },

//   {
//     path: '',
//     component: NavbarComponent,
//     canActivateChild: [AuthGuard],
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       {
//         path: 'dashboard',
//         loadChildren: () =>
//           import('src/app/dashboard/dashboard.module').then(
//             (m) => m.DashboardModule
//           ),
//       },
//       {
//         path: 'admin-users',
//         loadChildren: () =>
//           import('src/app/admin-users/admin-users.module').then(
//             (m) => m.AdminUsersModule
//           ),
//       },
//       {
//         path: 'places',
//         loadChildren: () =>
//           import('src/app/place/place.module').then((m) => m.PlaceModule),
//       },

//       {
//         path: 'blogs',
//         loadChildren: () =>
//           import('src/app/blogs/blogs.module').then((m) => m.BlogsModule),
//       },
//       {
//         path: 'category',
//         loadChildren: () =>
//           import('src/app/category/category.module').then(
//             (m) => m.CategoryModule
//           ),
//       },
//       {
//         path: 'subscriber',
//         loadChildren: () =>
//           import('src/app/subscriber/subscriber.module').then(
//             (m) => m.SubscriberModule
//           ),
//       },
//     ],
//   },
//   {
//     path: 'search',
//     loadChildren: () =>
//       import('src/app/search/search.module').then((m) => m.SearchModule),
//   },
//   {
//     path: 'homepage',
//     loadChildren: () =>
//       import('src/app/homepage/homepage.module').then((m) => m.HomepageModule),
//   },
//   { path: '**', component: NotfoundComponent },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/login/login.module').then((m) => m.LoginModule),
  },

  {path:"suggestions",component:SuggestionsComponent},

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
    ],
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('src/app/homepage/homepage.module').then((m) => m.HomepageModule),
  },

  {
    path: 'search',
    loadChildren: () =>
      import('src/app/search/search.module').then((m) => m.SearchModule),
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
