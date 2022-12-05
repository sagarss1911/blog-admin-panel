import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusManagementComponent } from './contactus-management/contactus-management.component';

const routes: Routes = [
  {
    path: '',
    component: ContactusManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsRoutingModule {}
