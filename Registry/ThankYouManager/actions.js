import {
  FETCH_TYM_DATA_SUCCESS,
  FETCH_TYM_DATA_ERROR,
  REVEAL_THANK_YOU_LIST,
  REVEAL_THANK_YOU_LIST_SUCCESS,
  LOGIN_MODAL_VISIBILITY,
  CHANGE_LIST_UPDATED_STATUS,
  UPDATE_TYM_TAB_CLICK_STATUS,
} from './constants';

export function fetchTymDataSuccess(data, registryId) {
  return {
    type: FETCH_TYM_DATA_SUCCESS,
    data,
    registryId,
  };
}

export function fetchTymDataError(error) {
  return {
    type: FETCH_TYM_DATA_ERROR,
    error,
  };
}

export function revealThankYouList(registryId) {
  return {
    type: REVEAL_THANK_YOU_LIST,
    registryId,
  };
}

export function updateTymTabClickStatus(tymClickParam) {
  return {
    type: UPDATE_TYM_TAB_CLICK_STATUS,
    tymClickParam,
  };
}

export function revealThankYouListSuccess(data) {
  return {
    type: REVEAL_THANK_YOU_LIST_SUCCESS,
    data,
  };
}

export function revealThankYouListError(error) {
  return {
    type: FETCH_TYM_DATA_ERROR,
    error,
  };
}

export function displayLoginModalVisibility(visiblity) {
  return {
    type: LOGIN_MODAL_VISIBILITY,
    visiblity,
  };
}

export function changeListUpdatedStatus() {
  return {
    type: CHANGE_LIST_UPDATED_STATUS,
  };
}
