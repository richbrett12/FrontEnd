import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as documents from '../actions/sites/site.documents';
export interface SiteEntity {
  id: string;
  name: string;
  description: string;
  water: boolean;
  electrical: boolean;
  lakeFront: boolean;
  bookings?: string[];
}

export interface SiteState extends EntityState<SiteEntity> {}

export const adapter = createEntityAdapter<SiteEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(documents.sites, (s, a) => adapter.setAll(a.payload, s))
);

export const { selectAll: selectAllSitesArray } = adapter.getSelectors();
