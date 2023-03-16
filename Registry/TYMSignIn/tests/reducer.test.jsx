import { fromJS } from 'immutable';

import { signInUser, signInUserSuccess, signInUserError } from '../actions';

import TYMSignInReducer from '../reducer';

describe('TYMSignInReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      loggedIn: false,
      error: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(TYMSignInReducer(undefined, {})).to.deep.equal(expectedResult);
  });

  it('should handle initiate recognized user signin', () => {
    const loggedIn = false;

    const expectedResult = state.set('loggedIn', loggedIn);
    const args = {
      username: 'foo@bar.com',
      password: 'password',
    };

    expect(TYMSignInReducer(state, signInUser(args))).to.deep.equal(
      expectedResult
    );
  });

  it('should set loggedIn status to true if login succeeds', () => {
    const loggedIn = true;

    const expectedResult = state.set('loggedIn', loggedIn);
    const args = {
      username: 'foo@bar.com',
      password: 'password',
    };

    expect(TYMSignInReducer(state, signInUserSuccess(args))).to.deep.equal(
      expectedResult
    );
  });

  it('should set loggedIn status to false if login fails', () => {
    const loggedIn = false;

    const expectedResult = state.set('loggedIn', loggedIn);
    const error = '';

    expect(TYMSignInReducer(state, signInUserError(error))).to.deep.equal(
      expectedResult
    );
  });
});
