import { fromJS } from 'immutable';
import {
  SUBMIT_WEDDING_BOOK,
  SUBMIT_WEDDING_BOOK_SUCCESS,
  SUBMIT_WEDDING_BOOK_ERROR,
} from '../constants';

import WeddingBookReducer from '../reducer';

describe(__filename, () => {
  const initialState = fromJS({
    isFetching: false,
    isAssociateloggedIn: false,
    error: null,
    data: null,
  });

  it('should reduce on SUBMIT_WEDDING_BOOK', () => {
    const data = { firstName: 'test', lastName: 'test' };
    const state = WeddingBookReducer(initialState, {
      type: SUBMIT_WEDDING_BOOK,
      data,
    });

    expect(state.get('isFetching')).to.equal(true);
  });

  it('should reduce on SUBMIT_WEDDING_BOOK_SUCCESS', () => {
    const data = { component: {}, result: true };
    const state = WeddingBookReducer(initialState, {
      type: SUBMIT_WEDDING_BOOK_SUCCESS,
      data,
    });

    expect(state.get('isFetching')).to.equal(false);
  });

  it('should reduce on SUBMIT_WEDDING_BOOK_ERROR', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Address must be between 1 and 50 characters.',
      },
    ];
    const state = WeddingBookReducer(initialState, {
      type: SUBMIT_WEDDING_BOOK_ERROR,
      error,
    });

    expect(state.get('isFetching')).to.equal(false);
  });
  it('should handle the default action correctly', () => {
    const state = WeddingBookReducer(initialState, { type: 'ABC_XYZ' });
    expect(state.get('isFetching')).to.equal(false);
  });
  it('should return intial state correctly', () => {
    const state = WeddingBookReducer(undefined, { type: 'ABC_XYZ' });
    expect(state.get('isFetching')).to.equal(false);
  });
});
