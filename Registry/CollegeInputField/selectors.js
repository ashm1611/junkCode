import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { SELECT_COLLEGE_STATE_KEY } from './constants';

export const selectCollegeData = state =>
  state.get(SELECT_COLLEGE_STATE_KEY, Map());

export const makeSelectCollegeList = () =>
  createSelector(selectCollegeData, selectCollegeList =>
    selectCollegeList.get('collegeList')
  );
