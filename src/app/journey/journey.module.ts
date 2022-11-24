import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneyRoutingModule } from './journey-routing.module';
import { JourneyOptionsComponent } from './journey-options/journey-options.component';
import { AddJourneycardsComponent } from './add-journeycards/add-journeycards.component';
import { AddJourneyIconsComponent } from './add-journey-icons/add-journey-icons.component';
import { JourneyIconManagementComponent } from './journey-icon-management/journey-icon-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { JourneyCardManagementComponent } from './journey-card-management/journey-card-management.component';
import { NgxSummernoteModule } from 'ngx-summernote';
@NgModule({
  declarations: [
    JourneyOptionsComponent,
    AddJourneycardsComponent,
    AddJourneyIconsComponent,
    JourneyIconManagementComponent,
    JourneyCardManagementComponent,
  ],
  imports: [
    CommonModule,
    JourneyRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
})
export class JourneyModule {}
