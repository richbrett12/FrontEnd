import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as documents from '../actions/reservations/reservation.documents';
export interface ReservationEntity {
  id: string;
  user: string;
  siteId: string;
  created: string;
  startDate: string;
  endDate: string;
  total: number;
  status: 'pending' | 'approved' | 'denied';
  denialReason?: string;
}

export interface ReservationsState extends EntityState<ReservationEntity> {}

export const adapter = createEntityAdapter<ReservationEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(documents.reservation, (s, a) => adapter.upsertOne(a.payload, s)),
  on(documents.reservations, (s, a) => adapter.upsertMany(a.payload, s))
);
