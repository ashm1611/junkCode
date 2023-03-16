import { put, takeLatest, call } from 'redux-saga/effects';
import qs from 'qs';
import pathOr from 'lodash/fp/pathOr';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import {
  fetchMyRegistriesInfoError,
  fetchMyRegistriesInfoSuccess,
} from './actions';

import { FETCH_MY_REGISTRIES } from './constants';

export function* getMyRegistriesInfo({ payload }) {
  const { registryId } = payload;

  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('getIncentiveDetails'),
      method: 'POST',
      data: qs.stringify({
        registryId,
      }),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchMyRegistriesInfoSuccess(data));
    }
    return yield put(fetchMyRegistriesInfoError(errorMessages[0].message));
  } catch (err) {
    const error = pathOr(
      null,
      'response.data.errorMessages[0].message',
      err.body
    );
    return yield put(fetchMyRegistriesInfoError(error));
  }
}

export function* getMyRegistriesSaga() {
  yield takeLatest(FETCH_MY_REGISTRIES, getMyRegistriesInfo);
}

export default [getMyRegistriesSaga];
