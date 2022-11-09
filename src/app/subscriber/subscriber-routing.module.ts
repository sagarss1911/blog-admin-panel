import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { SubscriberManagementComponent } from './subscriber-management/subscriber-management.component';

const routes: Routes = [
  { path: '', component: SubscriberManagementComponent },
  { path: 'edit-subscriber/:id', component: AddSubscriberComponent },
  { path: 'add-subscriber', component: AddSubscriberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberRoutingModule {}
