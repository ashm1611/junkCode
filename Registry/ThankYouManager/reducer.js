import { fromJS } from 'immutable';

import {
  FETCH_TYM_DATA,
  FETCH_TYM_DATA_SUCCESS,
  FETCH_TYM_DATA_ERROR,
  REVEAL_THANK_YOU_LIST_SUCCESS,
  LOGIN_MODAL_VISIBILITY,
  CHANGE_LIST_UPDATED_STATUS,
} from './constants';

const initialState = fromJS({
  isFetching: true,
  loginModalVisibility: false,
  data: {},
  listUpdated: false,
});

function RegistryTymDetailReducer(
  state = initialState,
  { type, error, data, registryId, visiblity }
) {
  switch (type) {
    case FETCH_TYM_DATA:
      return state.set('isFetching', true).set('listUpdated', false);
    case FETCH_TYM_DATA_SUCCESS:
      return state
        .set('isFetching', false)
        .set('thankYouListDynamicContent', data.giftSurpriseEnabled)
        .set('registryId', registryId)
        .set('error', null)
        .set('data', data)
        .set('listUpdated', true);
    case FETCH_TYM_DATA_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('data', null);
    case REVEAL_THANK_YOU_LIST_SUCCESS:
      return state
        .set('isFetching', false)
        .set('thankYouListDynamicContent', data.giftSurpriseEnabled)
        .set('error', null)
        .set('data', data);
    case LOGIN_MODAL_VISIBILITY:
      return state.set('loginModalVisibility', visiblity);
    case CHANGE_LIST_UPDATED_STATUS:
      return state.set('listUpdated', false);
    default:
      return state;
  }
}

export default RegistryTymDetailReducer;
