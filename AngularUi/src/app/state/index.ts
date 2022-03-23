import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromSites from './reducers/sites.reducer';
import * as fromUser from './reducers/user.reducer';
import * as fromPricing from './reducers/pricing.reducer';
import * as fromReservations from './reducers/reservations.reducer';
import * as fromPendingReservations from './reducers/pending-reservations.reducer';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import * as fromAvailability from './reducers/availability.reducer';
import { ReservationItemModel } from '../models';
export interface AppState {
  sites: fromSites.SiteState;
  availability: fromAvailability.AvailabilityState;
  user: fromUser.UserState;
  pricing: fromPricing.PricingState;
  reservations: fromReservations.ReservationsState;
  pendingReservations: fromPendingReservations.PendingReservationState;
}

export const reducers: ActionReducerMap<AppState> = {
  sites: fromSites.reducer,
  availability: fromAvailability.reducer,
  user: fromUser.reducer,
  pricing: fromPricing.reducer,
  reservations: fromReservations.reducer,
  pendingReservations: fromPendingReservations.reducer,
};

const selectSitesBranch = createFeatureSelector<fromSites.SiteState>('sites');
const selectPendingReservationsBranch =
  createFeatureSelector<fromPendingReservations.PendingReservationState>(
    'pendingReservations'
  );
const selectAvailabilityBranch =
  createFeatureSelector<fromAvailability.AvailabilityState>('availability');
const selectUserBranch = createFeatureSelector<fromUser.UserState>('user');
const selectPricingBranch =
  createFeatureSelector<fromPricing.PricingState>('pricing');
const selectReservationsBranch =
  createFeatureSelector<fromReservations.ReservationsState>('reservations');

const { selectAll: selectAllSitesArray, selectEntities: selectSitesEntities } =
  fromSites.adapter.getSelectors(selectSitesBranch);

export const selectUserInformation = createSelector(selectUserBranch, (b) => b);
export const selectAllSites = selectAllSitesArray;
export const selectPricingInformation = createSelector(
  selectPricingBranch,
  (b) => b
);
export const selectSiteDetails = (siteId: string) =>
  createSelector(selectAllSitesArray, (sites) => {
    const site = sites.find((s) => s.id === siteId);
    return site;
  });

export const selectAvailabilityForSite = createSelector(
  selectAvailabilityBranch,
  selectSitesEntities,
  (avail, entities) => {
    const id = avail.siteId ?? 'none';
    if (id === 'none') return undefined;
    const bookings = entities[id]?.bookings ?? [];

    const requestedStartDate = dayjs.utc(avail.startDate);
    const requestedEndDate = dayjs.utc(avail.endDate).subtract(1, 'day');

    const isOneDayReservation =
      requestedEndDate.diff(requestedStartDate, 'day') === 0;

    const requestedDays = [requestedStartDate];

    if (!isOneDayReservation) {
      const dayCount = requestedEndDate.diff(requestedStartDate, 'day');
      for (let t = 1; t < dayCount; t++) {
        requestedDays.push(requestedStartDate.add(t, 'days'));
      }
    }

    const bookingsUtc: dayjs.Dayjs[] = bookings.map((b) => dayjs.utc(b));

    var initialState: dayjs.Dayjs[] = [];
    const bookedDays = requestedDays.reduce(
      (s: dayjs.Dayjs[], r: dayjs.Dayjs) => {
        const day = bookingsUtc.find((d) => d.isSame(r, 'day'));
        return day ? [day, ...s] : s;
      },
      initialState
    );
    return {
      siteId: id,
      available: bookedDays.length === 0,
      bookedDays: bookedDays,
      numberOfDays: requestedDays.length,
    };
  }
);

export const selectPricingForSite = createSelector(
  selectAvailabilityForSite,
  selectSitesEntities,
  selectPricingBranch,
  (availability, siteEntities, pricing) => {
    if (!availability || !availability.siteId) return undefined;
    const site = siteEntities[availability.siteId] as fromSites.SiteEntity;

    const basePrice = availability.numberOfDays * pricing.baseAmount;
    const waterPrice = site.water
      ? availability.numberOfDays * pricing.waterDaily
      : 0;
    const electricalPrice = site.electrical
      ? availability.numberOfDays * pricing.electricalDaily
      : 0;
    const lakeFrontPrice = site.lakeFront
      ? availability.numberOfDays * pricing.electricalDaily
      : 0;
    return {
      numberOfDays: availability.numberOfDays,
      basePrice,
      waterPrice,
      electricalPrice,
      lakeFrontPrice,
      total: basePrice + waterPrice + electricalPrice + lakeFrontPrice,
    };
  }
);

const { selectAll: selectAllReservationsArray } =
  fromReservations.adapter.getSelectors(selectReservationsBranch);

export const selectAllReservations = createSelector(
  selectAllReservationsArray,
  selectAllSitesArray,
  (reservations, sites) => {
    return reservations.map((res) => {
      const siteName = sites.find((s) => s.id === res.siteId)?.name;
      return {
        ...res,
        siteName,
      } as ReservationItemModel;
    });
  }
);
