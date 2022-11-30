import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContributorsRoutingModule } from './contributors-routing.module';
import { AddContibutorsComponent } from './add-contibutors/add-contibutors.component';
import { ContributorRequestsComponent } from './contributor-requests/contributor-requests.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AddContibutorsComponent, ContributorRequestsComponent, ListComponent],
  imports: [CommonModule, ContributorsRoutingModule, FormsModule],
})
export class ContributorsModule {}
