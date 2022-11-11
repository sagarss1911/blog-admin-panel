import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AdminUsersManagementComponent } from 'src/app/admin-users/admin-users-management';
import { AddAdminUsersComponent } from 'src/app/admin-users/add-admin-users/add-admin-users';

const routes: Routes = [
  // { path: '', component: AdminUsersManagementComponent },
  { path: 'edit-place/:id', component: AddAdminUsersComponent },
  { path: 'add-place', component: AddAdminUsersComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
