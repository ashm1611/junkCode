import {
  SIGN_IN_USER,
  SIGN_IN_USER_ERROR,
  SIGN_IN_USER_SUCCESS,
} from './constants';

export function signInUser(args) {
  return {
    type: SIGN_IN_USER,
    args,
  };
}

export function signInUserSuccess(args) {
  return {
    type: SIGN_IN_USER_SUCCESS,
    args,
  };
}

export function signInUserError(error) {
  return {
    type: SIGN_IN_USER_ERROR,
    error,
  };
}
