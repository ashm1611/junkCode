import { fromJS } from 'immutable';

import { selectCollegeReducer } from '../reducer';
import { fetchCollegeListSuccess } from '../actions';

describe('selectCollegeReducer', () => {
  const state = fromJS({
    isFetching: false,
    collegeList: [],
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(selectCollegeReducer(undefined, {})).to.deep.equal(expectedResult);
  });

  it('should set submitSuccessFlag', () => {
    const data = [
      {
        college_name: 'Maharishi University of Management (Fairfield, IA)',
      },
    ];
    const expectedResult = state.set('collegeList', data);
    expect(
      selectCollegeReducer(state, fetchCollegeListSuccess(data))
    ).to.deep.equal(expectedResult);
  });
});
