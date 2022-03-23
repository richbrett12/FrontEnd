import { createAction, props } from '@ngrx/store';
import { ReservationEntity } from '../../reducers/reservations.reducer';

export const reservation = createAction(
  '[reservations] documents reservation',
  props<{ payload: ReservationEntity }>()
);

export const reservations = createAction(
  '[reservations] document reservations',
  props<{ payload: ReservationEntity[] }>()
);
