import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action } from '@ngrx/store';

export interface PendingReservationEntity {
  id: string; // the site id.
  bookings: string[];
}

export interface PendingReservationState
  extends EntityState<PendingReservationEntity> {}

export const adapter = createEntityAdapter<PendingReservationEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(initialState);
