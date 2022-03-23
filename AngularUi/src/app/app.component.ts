import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { applicationStarted } from './state/actions/app/app.events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(store: Store) {
    store.dispatch(applicationStarted());
  }
}
