import { createReducer, on } from '@ngrx/store';
import * as events from '../actions/availability/availability.events';
export interface AvailabilityState {
  siteId?: string;
  startDate?: string;
  endDate?: string;
}

const initialState: AvailabilityState = {
  siteId: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const reducer = createReducer(
  initialState,
  on(events.siteAvailabilityChecked, (_, a) => a.payload),
  on(events.siteAvailabilityCleared, () => initialState)
);
