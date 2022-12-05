import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { ContactusManagementComponent } from './contactus-management/contactus-management.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';

@NgModule({
  declarations: [ContactusManagementComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    CommonModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
  ],
})
export class ContactUsModule {}
