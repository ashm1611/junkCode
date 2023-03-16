import {
  SUBMIT_WEDDING_BOOK,
  SUBMIT_WEDDING_BOOK_ERROR,
  SUBMIT_WEDDING_BOOK_SUCCESS,
} from './constants';

export function submitWeddingBook(formdata) {
  return {
    type: SUBMIT_WEDDING_BOOK,
    formdata,
  };
}

export function submitWeddingBookSuccess(data) {
  return {
    type: SUBMIT_WEDDING_BOOK_SUCCESS,
    data,
  };
}

export function submitWeddingBookError(error) {
  return {
    type: SUBMIT_WEDDING_BOOK_ERROR,
    error,
  };
}
