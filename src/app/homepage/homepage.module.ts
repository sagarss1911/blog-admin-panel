import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SharedPaginationModule } from '../shared-components/shared-pagination/shared-pagination.module';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';
import { FeaturedPlaceComponent } from './featured-place/featured-place.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDashboardComponent,
    FeaturedPlaceComponent,
    HomeComponent,
    HomeCardComponent,
    HomeFooterComponent,
  ],
  imports: [
    CommonModule,

    SharedModule,
    HomepageRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
  ],
  providers: [HeaderComponent],
})
export class HomepageModule {}
