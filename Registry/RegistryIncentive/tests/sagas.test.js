import { put, takeLatest } from 'redux-saga/effects';

import {
  fetchMyRegistriesInfoSuccess,
  fetchMyRegistriesInfoError,
} from '../actions';
import { FETCH_MY_REGISTRIES } from '../constants';

import { getMyRegistriesInfo, getMyRegistriesSaga } from '../sagas';

describe('myRegistriesSaga', () => {
  describe('#getMyRegistriesInfo Saga', () => {
    let myRegistriesInfoGenerator;
    const payload = {
      registryId: '12345',
    };
    beforeEach(() => {
      myRegistriesInfoGenerator = getMyRegistriesInfo({ payload });
      myRegistriesInfoGenerator.next();
    });

    it('should dispatch the "fetchMyRegistriesInfoSuccess" action for success response', () => {
      const myRegistriesIncentiveInfo = {
        atgResponse: {},
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: { message: '' },
          data: myRegistriesIncentiveInfo,
          type: fetchMyRegistriesInfoSuccess,
        },
      };
      const putDescriptor = myRegistriesInfoGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchMyRegistriesInfoSuccess(myRegistriesIncentiveInfo))
      );
    });

    it('should dispatch the "fetchMyRegistriesInfoError" action for error response', () => {
      const error = '';
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: [{ message: '' }],
          type: fetchMyRegistriesInfoError,
        },
      };

      const putDescriptor = myRegistriesInfoGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchMyRegistriesInfoError(error))
      );
    });

    it('should dispatch the "fetchMyRegistriesInfoError" action for api fail', () => {
      const err = {
        body: {
          response: { data: { errorMessages: [{ message: 'error' }] } },
        },
      };

      const putDescriptor = myRegistriesInfoGenerator.throw(err).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchMyRegistriesInfoError('error'))
      );
    });
  });

  describe('#getMyRegistriesSaga Saga', () => {
    let myRegistriesInfoGenerator;

    beforeEach(() => {
      myRegistriesInfoGenerator = getMyRegistriesSaga();
    });

    it('should start task to watch for FETCH_MY_REGISTRIES_INFO action', () => {
      const takeLatestDescriptor = myRegistriesInfoGenerator.next().value;

      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_MY_REGISTRIES, getMyRegistriesInfo)
      );
    });
  });
});
