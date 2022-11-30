import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContibutorsComponent } from './add-contibutors/add-contibutors.component';
import { ContributorRequestsComponent } from './contributor-requests/contributor-requests.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'add', component: AddContibutorsComponent },
  { path: 'request', component: ContributorRequestsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributorsRoutingModule {}
