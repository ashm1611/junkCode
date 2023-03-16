import { fromJS } from 'immutable';
import {
  SUBMIT_TELL_A_FRIEND,
  SUBMIT_TELL_A_FRIEND_SUCCESS,
  SUBMIT_TELL_A_FRIEND_ERROR,
} from '../constants';

import TellAFriendReducer from '../reducer';

describe(__filename, () => {
  const initialState = fromJS({
    isFetching: false,
    error: null,
    data: null,
  });

  it('should reduce on SUBMIT_TELL_A_FRIEND', () => {
    const data = { firstName: 'test', lastName: 'test' };
    const state = TellAFriendReducer(initialState, {
      type: SUBMIT_TELL_A_FRIEND,
      data,
    });

    expect(state.get('isFetching')).to.equal(true);
  });

  it('should reduce on SUBMIT_TELL_A_FRIEND_SUCCESS', () => {
    const data = {
      component: {},
      result: true,
    };
    const state = TellAFriendReducer(initialState, {
      type: SUBMIT_TELL_A_FRIEND_SUCCESS,
      data,
    });

    expect(state.get('isFetching')).to.equal(false);
  });

  it('should reduce on SUBMIT_TELL_A_FRIEND_ERROR', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Address must be between 1 and 50 characters.',
      },
    ];
    const state = TellAFriendReducer(initialState, {
      type: SUBMIT_TELL_A_FRIEND_ERROR,
      error,
    });

    expect(state.get('isFetching')).to.equal(false);
  });
  it('should return the initial state', () => {
    const expectedResult = initialState;
    expect(TellAFriendReducer(undefined, {})).to.deep.equal(expectedResult);
  });
});
