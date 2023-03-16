import { fromJS } from 'immutable';
import { maketellAFriendError, maketellAFriendSuccess } from '../selectors';

describe(__filename, () => {
  it('maketellAFriendError', () => {
    const state = fromJS({
      tellAFriend: {
        isFetching: false,
        data: null,
        error: {},
      },
    });
    const selector = maketellAFriendError();
    expect(selector(state)).to.be.a('object');
  });

  it('maketellAFriendSuccess', () => {
    const state = fromJS({
      tellAFriend: {
        isFetching: false,
        data: {},
        error: false,
      },
    });
    const selector = maketellAFriendSuccess();
    expect(selector(state)).to.be.a('object');
  });
});
