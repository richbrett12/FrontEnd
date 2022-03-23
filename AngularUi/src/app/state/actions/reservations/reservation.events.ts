import { createAction, props } from "@ngrx/store";


export const reservationRequested = createAction('[reservation] event reservation requested',
props<{payload: ReservationRequest}>());

export interface ReservationRequest {
  siteId: string;
  total: number;
  startDate: string;
  endDate: string;
}
