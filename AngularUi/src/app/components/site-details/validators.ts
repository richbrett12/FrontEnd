import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as dayjs from 'dayjs';

export function todayOrLaterValidator(
  control: AbstractControl
): ValidationErrors | null {
  const d = dayjs(control.value);
  const today = dayjs();
  if (!d.isValid()) {
    return {
      todayOrLater: {
        invalidDate: true,
      },
    };
  } else {
    if (d.diff(today, 'day') < 0) {
      return {
        todayOrLater: {
          beforeToday: true,
        },
      };
    } else {
      return null;
    }
  }
}

export function endDateAfterStartDate(control: AbstractControl) {
  const st = dayjs(control.get('startDate')?.value);
  const ed = dayjs(control.get('endDate')?.value);

  return !st.isBefore(ed, 'day')
    ? {
        tooShortReservation: true,
      }
    : null;
}
