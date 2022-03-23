import { createAction, props } from '@ngrx/store';
import { SiteEntity } from '../../reducers/sites.reducer';
export const sites = createAction(
  '[sites] campsites',
  props<{ payload: SiteEntity[] }>()
);
