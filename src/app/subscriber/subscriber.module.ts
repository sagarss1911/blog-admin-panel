import { NgModule } from '@angular/core';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { SubscriberManagementComponent } from './subscriber-management/subscriber-management.component';
import { SubscriberRoutingModule } from './subscriber-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [SubscriberManagementComponent, AddSubscriberComponent],
  imports: [
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    NgSelectModule,
    DropdownModule,
    SubscriberRoutingModule,
  ],
  providers: [AddSubscriberComponent],
})
export class SubscriberModule {}
