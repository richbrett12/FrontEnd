import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReservationItemModel } from 'src/app/models';
import { selectAllReservations } from 'src/app/state';
import { loadReservationsForUser } from 'src/app/state/actions/reservations/reservation.commands';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations$!: Observable<ReservationItemModel[]>;
  constructor(private store: Store) {
    store.dispatch(loadReservationsForUser());
  }

  ngOnInit(): void {
    this.reservations$ = this.store.select(selectAllReservations);
  }
}
