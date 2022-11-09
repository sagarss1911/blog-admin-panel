import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceRoutingModule } from './place-routing.module';
import { AddPlaceComponent } from './add-place/add-place.component';
import { PlaceManagementComponent } from './place-management/place-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [AddPlaceComponent, PlaceManagementComponent],
  imports: [
    CommonModule,
    PlaceRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
  ],
  providers: [AddPlaceComponent],
})
export class PlaceModule {}
