/**
 * RegistryAnalyzer Saga
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';
import {
  fetchRegAnalyzerDataSuccess,
  fetchRegAnalyzerDataError,
} from './actions';
import { FETCH_REGISTRY_ANALYZER_DATA } from './constants';

/**
 * Generator function that take latest `FETCH_REGISTRY_ANALYZER_DATA` action type.
 * This is responsible for making an API call to get the `priceRangeList` available for the specific registry.
 *
 * @param {string} regId - registry id
 * @param {string} regType - registry type
 *  - BA1 (Baby registry)
 *  - BRD (Wedding registry)
 *  - HSW (Housewarming registry)
 *  - COM (Commitment Ceremony registry)
 *  - ANN (Anniversary registry)
 *  - RET (Retirement registry)
 *  - OTH (Other registry)
 *  - COL (College/University registry)
 *  - BIR (Birthday registry)
 * @param {string} numberOfGuests - numberOfGuests in the registry
 *
 */
export function* getRegAnalyzerData({ regId, regType, numberOfGuests } = {}) {
  yield put(initiateInactivityModal(true));

  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('registryAnalyzer'),
      method: 'GET',
      params: {
        registryID: regId,
        registryType: regType,
        numberOfGuests,
      },
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchRegAnalyzerDataSuccess(data));
    }
    return yield put(fetchRegAnalyzerDataError(errorMessages));
  } catch (err) {
    return yield put(fetchRegAnalyzerDataError(err));
  }
}

export function* regAnalyzerSaga() {
  yield takeLatest(FETCH_REGISTRY_ANALYZER_DATA, getRegAnalyzerData);
}

export default [regAnalyzerSaga];
