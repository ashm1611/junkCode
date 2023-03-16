import { call, put, takeLatest } from 'redux-saga/effects';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import {
  fetchProfileStatusSuccess,
  fetchProfileStatusError,
  resetProfileStatusSuccess,
} from './actions';

import { GET_CO_PROFILE_STATUS, RESET_CO_PROFILE_STATUS } from './constants';

export function* getProfileStatus({ emailId, showLoader }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('coRegistrantProfileStatus'),
      method: 'GET',
      params: {
        emailId,
      },
      variation: 'fullWidth',
      showLoader,
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchProfileStatusSuccess(data));
    }
    return yield put(fetchProfileStatusError(errorMessages.message));
  } catch (err) {
    return yield put(fetchProfileStatusError(err.body));
  }
}

export function* resetProfileStatusDetail() {
  return yield put(resetProfileStatusSuccess());
}

export function* coRegistrantProfileSaga() {
  yield takeLatest(GET_CO_PROFILE_STATUS, getProfileStatus);
}

export function* resetProfileStatusSaga() {
  yield takeLatest(RESET_CO_PROFILE_STATUS, resetProfileStatusDetail);
}

export default [coRegistrantProfileSaga, resetProfileStatusSaga];
