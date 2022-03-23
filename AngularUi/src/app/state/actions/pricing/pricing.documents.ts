import { createAction, props } from '@ngrx/store';
import { PricingState } from '../../reducers/pricing.reducer';

export const pricing = createAction(
  '[pricing] document pricing',
  props<{ payload: PricingState }>()
);
