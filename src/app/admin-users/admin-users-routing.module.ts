import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersManagementComponent } from './admin-users-management/admin-users-management';
import { AddAdminUsersComponent } from 'src/app/admin-users/add-admin-users/add-admin-users';



const routes: Routes = [
  {path: '', component: AdminUsersManagementComponent},
  {path:'edit-user/:id', component:AddAdminUsersComponent},
  {path:'add-user', component:AddAdminUsersComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
