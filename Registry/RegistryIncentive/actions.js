import {
  FETCH_MY_REGISTRIES,
  FETCH_MY_REGISTRIES_SUCCESS,
  FETCH_MY_REGISTRIES_ERROR,
} from './constants';

export function fetchMyRegistriesInfo(registryId) {
  return {
    type: FETCH_MY_REGISTRIES,
    payload: { registryId },
  };
}

export function fetchMyRegistriesInfoSuccess(data) {
  return {
    type: FETCH_MY_REGISTRIES_SUCCESS,
    data,
  };
}

export function fetchMyRegistriesInfoError(error) {
  return {
    type: FETCH_MY_REGISTRIES_ERROR,
    error,
  };
}
