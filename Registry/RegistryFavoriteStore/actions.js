import { injectReducerInStore } from '@bbb-app/utils/asyncInjectors';
import {
  SET_FAVORITE_STOREID,
  REMOVE_FAVORITE_STOREID,
  SET_FAV_STORE_KEY,
} from './constants';
import reducer from './reducer';

/**
 * Dispatch an action to set fav store id to be set in store, which can be used by both create and edit registry forms
 * @param {string} data Fav Store Id
 *
 * @return {object} An action object with a type of SET_FAVORITE_STOREID and data payload
 */

const injectReducer = () => {
  injectReducerInStore({ key: SET_FAV_STORE_KEY, reducer });
};
export function setFavoriteStoreId(data) {
  injectReducer();
  return {
    type: SET_FAVORITE_STOREID,
    data,
  };
}

export function removeFavoriteStoreId() {
  injectReducer();
  return {
    type: REMOVE_FAVORITE_STOREID,
  };
}
