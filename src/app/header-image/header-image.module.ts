import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderImageRoutingModule } from './header-image-routing.module';
import { ImageOptionsComponent } from './image-options/image-options.component';
import { LogoComponent } from './logo/logo.component';
import { IconComponent } from './icon/icon.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SharedPaginationModule } from '../shared-components/shared-pagination/shared-pagination.module';

@NgModule({
  declarations: [ImageOptionsComponent, LogoComponent, IconComponent],
  imports: [
    CommonModule,
    HeaderImageRoutingModule,
    SharedModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
    NgxSummernoteModule,
  ],
})
export class HeaderImageModule {}
