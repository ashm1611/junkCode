import {
  SUBMIT_TELL_A_FRIEND,
  SUBMIT_TELL_A_FRIEND_SUCCESS,
  SUBMIT_TELL_A_FRIEND_ERROR,
} from '../constants';

import { tellAFriend, tellAFriendSuccess, tellAFriendError } from '../actions';

describe(__filename, () => {
  it('should dispatch action tellAFriend', () => {
    const formdata = { firstName: 'test', lastName: 'test' };
    const expectedResult = {
      type: SUBMIT_TELL_A_FRIEND,
      formdata,
    };
    expect(tellAFriend(formdata)).to.deep.equal(expectedResult);
  });

  it('should dispatch action sumitWeddingBookSuccess', () => {
    const data = {
      component: {},
      result: true,
    };
    const expectedResult = {
      type: SUBMIT_TELL_A_FRIEND_SUCCESS,
      data,
    };

    expect(tellAFriendSuccess(data)).to.deep.equal(expectedResult);
  });

  it('should dispatch action sumitWeddingBookError', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Address must be between 1 and 50 characters.',
      },
    ];
    const expectedResult = {
      type: SUBMIT_TELL_A_FRIEND_ERROR,
      error,
    };
    expect(tellAFriendError(error)).to.deep.equal(expectedResult);
  });
});
