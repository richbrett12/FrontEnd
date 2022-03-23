import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { applicationStarted } from '../actions/app/app.events';
import { environment } from 'src/environments/environment';
import { SiteEntity } from '../reducers/sites.reducer';
import * as documents from '../actions/sites/site.documents';
@Injectable()
export class SiteEffects {
  readonly baseUrl = environment.sitesApi + 'sites';
  loadSites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(applicationStarted),
      switchMap(() =>
        this.client.get<{ data: SiteEntity[] }>(this.baseUrl).pipe(
          map((response) => response.data),
          map((payload) => documents.sites({ payload }))
        )
      )
    );
  });

  constructor(private actions$: Actions, private client: HttpClient) {}
}
