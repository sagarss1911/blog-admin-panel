import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  { path: 'reset-password', loadChildren: () => import('src/app/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  {
    path: '', component: NavbarComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'category', loadChildren: () => import('src/app/category/category.module').then(m => m.CategoryModule) },
      { path: 'product-category', loadChildren: () => import('src/app/productcategory/productcategory.module').then(m => m.ProductCategoryModule) },
      { path: 'products', loadChildren: () => import('src/app/products/products.module').then(m => m.ProductsModule) },
      { path: 'admin-users', loadChildren: () => import('src/app/admin-users/admin-users.module').then(m => m.AdminUsersModule) }
    ]
  },
  { path: '**', component: NotfoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
