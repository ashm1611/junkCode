import { fromJS } from 'immutable';

import { SIGN_IN_USER_SUCCESS, SIGN_IN_USER_ERROR } from './constants';

const initialState = fromJS({
  loggedIn: false,
  error: '',
});

function TYMSignInReducer(state = initialState, { type, error }) {
  switch (type) {
    case SIGN_IN_USER_SUCCESS:
      return state.set('loggedIn', true);
    case SIGN_IN_USER_ERROR:
      return state.set('loggedIn', false).set('error', error);
    default:
      return state;
  }
}

export default TYMSignInReducer;
