import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { TELL_A_FRIEND_STATE_KEY } from './constants';

export const tellAFriend = state => state.get(TELL_A_FRIEND_STATE_KEY, Map());

export const maketellAFriendError = () =>
  createSelector(tellAFriend, tellAFriendError =>
    tellAFriendError.get('error')
  );

export const maketellAFriendSuccess = () =>
  createSelector(tellAFriend, tellAFriendSuccess =>
    tellAFriendSuccess.get('data')
  );
