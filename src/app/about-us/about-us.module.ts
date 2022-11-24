import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AddAboutUsComponent } from './add-about-us/add-about-us.component';
import { AboutUsManagementComponent } from './about-us-management/about-us-management.component';
import { AboutUsCardsComponent } from './about-us-cards/about-us-cards.component';
import { CardsManagementComponent } from './cards-management/cards-management.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AboutUsOptionsComponent } from './about-us-options/about-us-options.component';

@NgModule({
  declarations: [
    AddAboutUsComponent,
    AboutUsManagementComponent,
    AboutUsCardsComponent,
    CardsManagementComponent,
    AboutUsOptionsComponent,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
    NgxSummernoteModule,
  ],
})
export class AboutUsModule {}
