import { put, takeLatest } from 'redux-saga/effects';
import { weddingBook, weddingBookSaga } from '../sagas';
import { SUBMIT_WEDDING_BOOK } from '../constants';
import { submitWeddingBookSuccess, submitWeddingBookError } from '../actions';

describe('#weddingBookSaga', () => {
  describe('', () => {
    const formdata = {
      formdata: {
        firstName: 'ABC',
        lastName: 'XYZ',
        addressLine1: '123',
        addressLine2: 'JKL',
        city: 'NY',
        selectedState: 'New York',
      },
    };
    let weddingBookGenerator;
    beforeEach(() => {
      weddingBookGenerator = weddingBook({ formdata });
      weddingBookGenerator.next();
    });
    it('should call weddingBookSaga correctly', () => {
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: null,
          body: { response: {} },
        },
      };
      const putDescriptor = weddingBookGenerator.next(response).value;

      expect(putDescriptor).to.deep.equal(put(submitWeddingBookSuccess()));
    });
    it('should call weddingBookSaga correctly', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: null,
          body: { error: {} },
        },
      };
      const errorMessages = null;
      const putDescriptor = weddingBookGenerator.next(response).value;

      expect(putDescriptor).to.deep.equal(
        put(submitWeddingBookError(errorMessages))
      );
    });
    it('should call weddingBookSaga correctly', () => {
      const error = new Error('new error');
      const response = { body: error };
      const putDescriptor = weddingBookGenerator.throw(response).value;

      expect(putDescriptor).to.deep.equal(put(submitWeddingBookError(error)));
    });
  });
  describe('#weddingBookSaga', () => {
    let weddingBookSagaGenerator;

    beforeEach(() => {
      weddingBookSagaGenerator = weddingBookSaga();
    });
    it('should start task to watch for SUBMIT_WEDDING_BOOK action', () => {
      const takeLatestDescriptor = weddingBookSagaGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(SUBMIT_WEDDING_BOOK, weddingBook)
      );
    });
  });
});
