import { createSelector } from 'reselect';
import { RECOGNIZED_USER_SIGNIN_KEY } from './constants';

export const makeSelectTYMSignIn = state =>
  state.get(RECOGNIZED_USER_SIGNIN_KEY);

export const getSignInStatus = () =>
  createSelector(makeSelectTYMSignIn, status => status.get('loggedIn'));

export const getErrorMessage = () =>
  createSelector(makeSelectTYMSignIn, status => status.get('error'));
