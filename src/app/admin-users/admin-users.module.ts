import { NgModule } from '@angular/core';
import { AdminUsersManagementComponent } from './admin-users-management/admin-users-management';
import { AddAdminUsersComponent } from './add-admin-users/add-admin-users';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AdminUsersManagementComponent,
    AddAdminUsersComponent
  ],
  imports: [
    SharedModule,
    AdminUsersRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule
  ],
  providers: [
    AddAdminUsersComponent
  ],
})
export class AdminUsersModule {}
