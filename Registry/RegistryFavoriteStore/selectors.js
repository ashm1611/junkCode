import { createSelector } from 'reselect';
import { Map } from 'immutable';

import { SET_FAV_STOREID_KEY, SET_FAV_STORE_KEY } from './constants';

export const selectFavStore = state => state.get(SET_FAV_STORE_KEY, Map());

export const makeSelectFavStoreId = () =>
  createSelector(selectFavStore, registryFavStoreSection =>
    registryFavStoreSection.get(SET_FAV_STOREID_KEY)
  );
