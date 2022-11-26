import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login/login.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserModule } from './user.module';

const routes: Routes = [
  // { path: '', component: UserRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  // { path: '/', component: LoginComponent },
  {
    path: 'update',
    component: UpdateUserComponent,
  },
  {
    path: 'setting',
    component: SettingsComponent,
  },
  { path: 'delete', component: DeleteUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
