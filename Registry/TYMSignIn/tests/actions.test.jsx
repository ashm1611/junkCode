import {
  SIGN_IN_USER,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_ERROR,
} from '../constants';

import { signInUser, signInUserSuccess, signInUserError } from '../actions';

describe('#signInUser', () => {
  it('should initiate recognized user sign in', () => {
    const args = {
      username: 'foo@bar.com',
      password: 'password',
    };

    const expectedResult = {
      type: SIGN_IN_USER,
      args,
    };

    expect(signInUser(args)).to.deep.equal(expectedResult);
  });
});

describe('#signInUserSuccess', () => {
  it('should succeed recognized user sign in', () => {
    const args = {
      username: 'foo@bar.com',
      password: 'password',
    };

    const expectedResult = {
      type: SIGN_IN_USER_SUCCESS,
      args,
    };

    expect(signInUserSuccess(args)).to.deep.equal(expectedResult);
  });
});

describe('#signInUserError', () => {
  it('should handle return error if login details are empty', () => {
    const error = '';

    const expectedResult = {
      type: SIGN_IN_USER_ERROR,
      error: '',
    };

    expect(signInUserError(error)).to.deep.equal(expectedResult);
  });
});
