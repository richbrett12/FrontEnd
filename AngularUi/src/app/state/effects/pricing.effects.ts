import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { applicationStarted } from '../actions/app/app.events';
import { pricing } from '../actions/pricing/pricing.documents';
import { PricingState } from '../reducers/pricing.reducer';
@Injectable()
export class PricingEffects {
  readonly baseUrl = environment.pricingApi + 'pricing';

  loadPricingData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(applicationStarted),
      switchMap(() =>
        this.client.get<{ data: PricingState }>(this.baseUrl).pipe(
          map((r) => r.data),
          map((payload) => pricing({ payload })),
          catchError(() => of(pricing({ payload: environment.defaultPricing })))
        )
      )
    );
  });
  constructor(private client: HttpClient, private actions$: Actions) {}
}
