import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SharedPaginationModule } from '../shared-components/shared-pagination/shared-pagination.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SettingsComponent } from './settings/settings.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@NgModule({
  declarations: [
    UserRegisterComponent,
    UserLoginComponent,
    UpdateUserComponent,
    SettingsComponent,
    DeleteUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
  ],
  providers: [UserRegisterComponent],
})
export class UserModule {}
