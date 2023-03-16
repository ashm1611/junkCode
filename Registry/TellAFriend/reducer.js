import { fromJS } from 'immutable';

import {
  SUBMIT_TELL_A_FRIEND,
  SUBMIT_TELL_A_FRIEND_ERROR,
  SUBMIT_TELL_A_FRIEND_SUCCESS,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  error: null,
  data: null,
});

function TellAFriendReducer(state = initialState, { type, data, error }) {
  switch (type) {
    case SUBMIT_TELL_A_FRIEND:
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('data', null);

    case SUBMIT_TELL_A_FRIEND_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', data);

    case SUBMIT_TELL_A_FRIEND_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('data', null);
    default:
      return state;
  }
}

export default TellAFriendReducer;
