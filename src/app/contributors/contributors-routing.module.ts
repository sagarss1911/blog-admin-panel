import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContibutorsComponent } from './add-contibutors/add-contibutors.component';
import { ContributorRequestsComponent } from './contributor-requests/contributor-requests.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'add', component: AddContibutorsComponent },
  { path: 'request', component: ContributorRequestsComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributorsRoutingModule {}
