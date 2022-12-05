import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconComponent } from './icon/icon.component';
import { ImageOptionsComponent } from './image-options/image-options.component';
import { LogoComponent } from './logo/logo.component';

const routes: Routes = [
  {
    path: '',
    component: ImageOptionsComponent,
    children: [
      {
        path: '',
        redirectTo: '/headerimage',
        pathMatch: 'full',
      },
      {
        path: 'logo',
        component: LogoComponent,
      },
      {
        path: 'icon',
        component: IconComponent,
      },
      { path: 'edit-logo/:id', component: LogoComponent },
      { path: 'edit-icon/:id', component: IconComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderImageRoutingModule {}
