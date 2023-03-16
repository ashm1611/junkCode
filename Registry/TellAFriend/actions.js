import {
  SUBMIT_TELL_A_FRIEND,
  SUBMIT_TELL_A_FRIEND_ERROR,
  SUBMIT_TELL_A_FRIEND_SUCCESS,
} from './constants';

export function tellAFriend(formdata) {
  return {
    type: SUBMIT_TELL_A_FRIEND,
    formdata,
  };
}

export function tellAFriendSuccess(data) {
  return {
    type: SUBMIT_TELL_A_FRIEND_SUCCESS,
    data,
  };
}

export function tellAFriendError(error) {
  return {
    type: SUBMIT_TELL_A_FRIEND_ERROR,
    error,
  };
}
