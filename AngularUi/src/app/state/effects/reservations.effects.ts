import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import * as events from '../actions/reservations/reservation.events';
import * as commands from '../actions/reservations/reservation.commands';
import * as documents from '../actions/reservations/reservation.documents';
import { Store } from '@ngrx/store';
import { selectUserInformation } from '..';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ReservationEntity } from '../reducers/reservations.reducer';
@Injectable()
export class ReservationEffects {
  readonly baseUrl = environment.bffApi + 'reservation-requests/';

  loadReservations$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(commands.loadReservationsForUser),
        concatLatestFrom(() => this.store.select(selectUserInformation)),
        map(([_, user]) => user.preferredUserName),
        switchMap((user) =>
          this.client
            .get<{ data: ReservationEntity[] }>(this.baseUrl + user)
            .pipe(
              map((r) => r.data),
              map((payload) => documents.reservations({ payload }))
            )
        )
      );
    },
    { dispatch: true }
  );

  addReservation$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(events.reservationRequested),
        concatLatestFrom(() => this.store.select(selectUserInformation)),
        map(([action, user]) => ({
          user: user.preferredUserName,
          details: action.payload,
        })),
        switchMap((payload) =>
          this.client.post<ReservationEntity>(this.baseUrl, payload).pipe(
            map((payload) => documents.reservation({ payload })),
            catchError((r) =>
              of({ type: 'ERROR_API', url: this.baseUrl, payload: r })
            )
          )
        )
      );
    },
    { dispatch: true }
  );
  constructor(
    private actions$: Actions,
    private client: HttpClient,
    private store: Store
  ) {}
}
