import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as v from './validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import {
  selectAvailabilityForSite,
  selectPricingForSite,
  selectPricingInformation,
  selectSiteDetails,
} from 'src/app/state';
import { SiteEntity } from 'src/app/state/reducers/sites.reducer';
import * as dayjs from 'dayjs';
import {
  siteAvailabilityChecked,
  siteAvailabilityCleared,
} from 'src/app/state/actions/availability/availability.events';
import { PricingState } from 'src/app/state/reducers/pricing.reducer';
import { reservationRequested } from 'src/app/state/actions/reservations/reservation.events';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css'],
})
export class SiteDetailsComponent implements OnInit, OnDestroy {
  // id: string | null = '';
  subs: Subscription[] = [];
  siteEntity$!: Observable<SiteEntity | undefined>;
  pricingInfo$!: Observable<PricingState>;
  summary$!: Observable<
    | {
        numberOfDays: number;
        basePrice: number;
        waterPrice: number;
        electricalPrice: number;
        lakeFrontPrice: number;
        total: number;
      }
    | undefined
  >;
  siteAvailable$!: Observable<
    | {
        available: boolean;
        bookedDays: dayjs.Dayjs[];
        numberOfDays: number;
      }
    | undefined
  >;
  form = new FormGroup(
    {
      siteId: new FormControl(),
      startDate: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, v.todayOrLaterValidator],
      }),
      endDate: new FormControl('', {
        updateOn: 'blur',
        validators: [v.todayOrLaterValidator],
      }),
    },
    { validators: [v.endDateAfterStartDate] }
  );
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  get startDate() {
    return this.form.get('startDate');
  }
  get endDate() {
    return this.form.get('endDate');
  }
  get siteId() {
    return this.form.get('siteId');
  }
  ngOnInit(): void {
    const s = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.updateRoutingInfo();
      }
    });
    this.subs.push(s);

    const s2 = this.form.valueChanges
      .pipe(
        tap((form: { startDate: string; endDate: string; siteId: string }) => {
          if (!this.form.valid) {
            this.store.dispatch(siteAvailabilityCleared());
          } else {
            this.store.dispatch(
              siteAvailabilityChecked({
                payload: {
                  siteId: form.siteId,
                  startDate: form.startDate.toString(),
                  endDate: form.endDate.toString(),
                },
              })
            );
          }
        })
      )
      .subscribe();
    this.subs.push(s2);
    this.updateRoutingInfo();
  }

  private updateRoutingInfo() {
    const id = this.route.snapshot.paramMap.get('siteId');
    this.siteEntity$ = this.store.select(selectSiteDetails(id || ''));
    const today = dayjs();
    const tomorrow = today.add(1, 'day');
    this.startDate?.setValue(formatDate(today.valueOf(), 'yyyy-MM-dd', 'en'));
    this.endDate?.setValue(formatDate(tomorrow.valueOf(), 'yyyy-MM-dd', 'en'));
    this.form.controls['siteId'].setValue(id);
    this.pricingInfo$ = this.store.select(selectPricingInformation);
    this.siteAvailable$ = this.store.select(selectAvailabilityForSite);
    this.summary$ = this.store.select(selectPricingForSite);
  }

  bookIt(siteId: string, total: number) {
    const startDate = this.startDate?.value;
    const endDate = this.endDate?.value;
    if (startDate && endDate) {
      this.store.dispatch(
        reservationRequested({
          payload: {
            siteId,
            startDate,
            endDate,
            total,
          },
        })
      );
    }
  }
}
