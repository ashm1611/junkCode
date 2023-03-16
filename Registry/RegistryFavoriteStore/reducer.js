import { fromJS } from 'immutable';
import { SUBMIT_ACCOUNT_SIGNOUT } from '@bbb-app/account-signin/containers/constants';

import {
  SET_FAV_STOREID_KEY,
  SET_FAVORITE_STOREID,
  REMOVE_FAVORITE_STOREID,
} from './constants';

const initialState = fromJS({
  favStoreId: '',
});

function registryFavoriteReducer(state = initialState, { type, data }) {
  switch (type) {
    case SET_FAVORITE_STOREID:
      return state.set(SET_FAV_STOREID_KEY, data);
    case REMOVE_FAVORITE_STOREID:
      return state.set(SET_FAV_STOREID_KEY, '');
    case SUBMIT_ACCOUNT_SIGNOUT:
      return state.set(SET_FAV_STOREID_KEY, '');
    default:
      return state;
  }
}

export default registryFavoriteReducer;
