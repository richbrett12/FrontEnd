import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers } from './state';
import { SitesComponent } from './components/sites/sites.component';
import { EffectsModule } from '@ngrx/effects';
import { SiteEffects } from './state/effects/site.effects';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationEffects } from './state/effects/reservations.effects';
import { NavComponent } from './components/nav/nav.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UserComponent } from './components/user/user.component';
import { PricingEffects } from './state/effects/pricing.effects';

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    SiteDetailsComponent,
    NavComponent,
    ReservationsComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    EffectsModule.forRoot([SiteEffects, ReservationEffects, PricingEffects]),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
