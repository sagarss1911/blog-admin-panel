import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceManagementComponent } from './place-management/place-management.component';
import { AddPlaceComponent } from './add-place/add-place.component';
const routes: Routes = [
  { path: '', component: PlaceManagementComponent },
  { path: 'edit-place/:id', component: AddPlaceComponent },
  { path: 'add-place', component: AddPlaceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceRoutingModule {}
