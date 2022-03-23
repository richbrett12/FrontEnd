import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { SitesComponent } from './components/sites/sites.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'sites',
    component: SitesComponent,
    children: [
      {
        path: ':siteId',
        component: SiteDetailsComponent,
      },
    ],
  },

  {
    path: 'reservations',
    component: ReservationsComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: '**',
    redirectTo: 'sites',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
