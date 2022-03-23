import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserInformation } from 'src/app/state';
import { UserState } from 'src/app/state/reducers/user.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userInfo$!: Observable<UserState>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userInfo$ = this.store.select(selectUserInformation);
  }
}
