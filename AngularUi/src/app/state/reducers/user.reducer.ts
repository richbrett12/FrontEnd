import { createReducer } from '@ngrx/store';

export interface UserState {
  token: string;
  preferredUserName: string;
  emailAddress: string;
}

const initialState: UserState = {
  token: 'aaaa.bbbb.cccc',
  preferredUserName: 'SueJones',
  emailAddress: 'sue@aol.com',
};

export const reducer = createReducer(initialState);
