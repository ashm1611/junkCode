import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { SITE_VIEWPORT_STATE_KEY } from '@bbb-app/redux/viewport-configuration/constants';
import { WEDDING_BOOK_STATE_KEY, MOBILE_SCREEN_STATE_KEY } from './constants';

export const weddingBook = state => state.get(WEDDING_BOOK_STATE_KEY, Map());
export const isMobile = state => state.get(MOBILE_SCREEN_STATE_KEY, Map());
export const viewportSiteConfig = state =>
  state.get(SITE_VIEWPORT_STATE_KEY, Map());

export const makeWeddingBookError = () =>
  createSelector(weddingBook, weddingookError => weddingookError.get('error'));

export const makeWeddingBookSuccess = () =>
  createSelector(weddingBook, weddingookError => weddingookError.get('data'));
export const isMobileStatus = () =>
  createSelector(isMobile, state => state.get('isMobileScreen'));
