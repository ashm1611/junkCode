import { fromJS } from 'immutable';

import {
  SUBMIT_WEDDING_BOOK,
  SUBMIT_WEDDING_BOOK_ERROR,
  SUBMIT_WEDDING_BOOK_SUCCESS,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  error: null,
  data: null,
});

function WeddingBookReducer(state = initialState, { type, data, error }) {
  switch (type) {
    case SUBMIT_WEDDING_BOOK:
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('data', null);

    case SUBMIT_WEDDING_BOOK_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', data);

    case SUBMIT_WEDDING_BOOK_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('data', null);
    default:
      return state;
  }
}

export default WeddingBookReducer;
