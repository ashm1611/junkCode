import {
  FETCH_COLLEGE_LIST,
  FETCH_COLLEGE_LIST_SUCCESS,
  FETCH_COLLEGE_LIST_ERROR,
} from './constants';

export function fetchCollegeList(payload) {
  return {
    type: FETCH_COLLEGE_LIST,
    payload,
  };
}

export function fetchCollegeListSuccess(data) {
  return {
    type: FETCH_COLLEGE_LIST_SUCCESS,
    data,
  };
}

export function fetchCollegeListError(error) {
  return {
    type: FETCH_COLLEGE_LIST_ERROR,
    error,
  };
}
