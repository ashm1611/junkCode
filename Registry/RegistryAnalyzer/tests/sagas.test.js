import { put, takeLatest } from 'redux-saga/effects';

import {
  fetchRegAnalyzerDataSuccess,
  fetchRegAnalyzerDataError,
} from '../actions';
import { FETCH_REGISTRY_ANALYZER_DATA } from '../constants';

import { getRegAnalyzerData, regAnalyzerSaga } from '../sagas';

import { initiateInactivityModal } from '../../RegistryOwner/actions';

describe('RegAnalyzerSagas', () => {
  it('should dispatch the "fetchRegAnalyzerDataSuccess" action for success response', () => {
    const regId = '12345';
    const regType = 'BRD';
    const numberOfGuests = 13;

    const regAnalyzerGenerator = getRegAnalyzerData({
      regId,
      regType,
      numberOfGuests,
    });
    regAnalyzerGenerator.next();
    regAnalyzerGenerator.next();
    const data = {
      defaultNumberOfGuest: 100,
      giftMultiplier: 2.5,
      priceRangeList: [
        {
          addMoreLink:
            '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2',
          addedNoOfGifts: 0,
          displayString: 'Under $25',
          distributionPercent: 10,
          priceRangeMax: 25,
          priceRangeMin: 1,
          recommendedNoOfGifts: 0,
        },
        {
          addMoreLink:
            '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2',
          addedNoOfGifts: 0,
          displayString: '$25 - $50',
          distributionPercent: 25,
          priceRangeMax: 50,
          priceRangeMin: 25,
          recommendedNoOfGifts: 0,
        },
      ],
    };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
        data,
      },
    };
    const putDescriptor = regAnalyzerGenerator.next(response).value;

    expect(putDescriptor).to.deep.equal(put(fetchRegAnalyzerDataSuccess(data)));
  });

  it('should dispatch the "fetchRegAnalyzerDataError" action for ERROR response', () => {
    const regId = '12345';
    const regType = 'BRD';
    const numberOfGuests = 13;

    const regAnalyzerGenerator = getRegAnalyzerData({
      regId,
      regType,
      numberOfGuests,
    });
    regAnalyzerGenerator.next();
    regAnalyzerGenerator.next();
    const data = {};
    const errorMessages = 'something went wrong';
    const response = {
      body: {
        serviceStatus: 'ERROR',
        errorMessages,
        data,
      },
    };
    const putDescriptor = regAnalyzerGenerator.next(response).value;

    expect(putDescriptor).to.deep.equal(
      put(fetchRegAnalyzerDataError(errorMessages))
    );
  });

  it('should call the "fetchRegAnalyzerDataError" action for error response in catch', () => {
    const regAnalyzerGenerator = getRegAnalyzerData();
    regAnalyzerGenerator.next();
    regAnalyzerGenerator.next();
    const error = new Error('some error');
    const putDescriptor = regAnalyzerGenerator.throw(error).value;

    expect(putDescriptor).to.deep.equal(put(fetchRegAnalyzerDataError(error)));
  });

  it('should dispatch the "initiateInactivityModal" action for success response', () => {
    const regId = '12345';
    const regType = 'BRD';
    const numberOfGuests = 13;

    const regAnalyzerGenerator = getRegAnalyzerData({
      regId,
      regType,
      numberOfGuests,
    });
    const data = true;
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
      },
    };
    const putDescriptor = regAnalyzerGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
  });

  it('should start task to watch for FETCH_REGISTRY_ANALYZER_DATA action', () => {
    const regAnalyzerGenerator = regAnalyzerSaga();

    const takeLatestDescriptor = regAnalyzerGenerator.next().value;

    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(FETCH_REGISTRY_ANALYZER_DATA, getRegAnalyzerData)
    );
  });
});
