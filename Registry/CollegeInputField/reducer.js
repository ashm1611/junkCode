import { fromJS } from 'immutable';
import { FETCH_COLLEGE_LIST_SUCCESS } from './constants';

const initialState = fromJS({
  isFetching: false,
  collegeList: [],
});

export function selectCollegeReducer(state = initialState, { type, data }) {
  switch (type) {
    case FETCH_COLLEGE_LIST_SUCCESS:
      return state.set('collegeList', data);
    default:
      return state;
  }
}
