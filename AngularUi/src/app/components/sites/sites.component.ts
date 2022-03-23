import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllSites } from 'src/app/state';
import { SiteEntity } from 'src/app/state/reducers/sites.reducer';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent implements OnInit {
  sites$!: Observable<SiteEntity[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sites$ = this.store.select(selectAllSites);
  }
}
