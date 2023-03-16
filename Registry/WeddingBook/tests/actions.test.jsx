import {
  SUBMIT_WEDDING_BOOK,
  SUBMIT_WEDDING_BOOK_SUCCESS,
  SUBMIT_WEDDING_BOOK_ERROR,
} from '../constants';

import {
  submitWeddingBook,
  submitWeddingBookSuccess,
  submitWeddingBookError,
} from '../actions';

describe(__filename, () => {
  it('should dispatch action submitWeddingBook', () => {
    const formdata = { firstName: 'test', lastName: 'test' };
    const expectedResult = {
      type: SUBMIT_WEDDING_BOOK,
      formdata,
    };
    expect(submitWeddingBook(formdata)).to.deep.equal(expectedResult);
  });

  it('should dispatch action sumitWeddingBookSuccess', () => {
    const data = {
      component: {},
      result: true,
    };
    const expectedResult = {
      type: SUBMIT_WEDDING_BOOK_SUCCESS,
      data,
    };

    expect(submitWeddingBookSuccess(data)).to.deep.equal(expectedResult);
  });

  it('should dispatch action sumitWeddingBookError', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Address must be between 1 and 50 characters.',
      },
    ];
    const expectedResult = {
      type: SUBMIT_WEDDING_BOOK_ERROR,
      error,
    };
    expect(submitWeddingBookError(error)).to.deep.equal(expectedResult);
  });
});
