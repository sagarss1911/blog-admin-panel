import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HeaderComponent } from './header/header.component';
import { FeaturedPlaceComponent } from './featured-place/featured-place.component';
import { WebsitePlacesComponent } from './website-places/website-places.component';
@NgModule({
  declarations: [
    HomeComponent,
    HomeCardComponent,
    HomeFooterComponent,
    HeaderComponent,
    FeaturedPlaceComponent,
    WebsitePlacesComponent,
  ],
  imports: [CommonModule, HomepageRoutingModule],
})
export class HomepageModule {}
