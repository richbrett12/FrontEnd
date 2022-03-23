import { ReservationEntity } from '../state/reducers/reservations.reducer';

export interface ReservationItemModel extends ReservationEntity {
  siteName: string;
}
