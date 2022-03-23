import { createReducer, on } from '@ngrx/store';
import * as documents from '../actions/pricing/pricing.documents';
export interface PricingState {
  baseAmount: number;
  waterDaily: number;
  electricalDaily: number;
  lakeFrontDaily: number;
}

const initialState: PricingState = {
  baseAmount: 0,
  waterDaily: 0,
  electricalDaily: 0,
  lakeFrontDaily: 0,
};

export const reducer = createReducer(
  initialState,
  on(documents.pricing, (_, a) => a.payload)
);
