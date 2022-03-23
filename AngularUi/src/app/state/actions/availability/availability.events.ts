import { createAction, props } from '@ngrx/store';
import { AvailabilityState } from '../../reducers/availability.reducer';

export const siteAvailabilityChecked = createAction(
  '[availability] event site availability checked',
  props<{ payload: AvailabilityState }>()
);

export const siteAvailabilityCleared = createAction(
  '[availability] event site availability cleared'
);
