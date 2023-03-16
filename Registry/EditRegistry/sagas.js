import { call, put, takeLatest } from 'redux-saga/effects';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';

import {
  fetchEditRegistryDataSuccess,
  fetchEditRegistryDataError,
} from './actions';

import { FETCH_EDIT_REGISTRY_DATA } from './constants';

export function* fetchEditRegistryData({ registryId }) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('fetchEditRegistryData').replace(
        ':registryId',
        registryId
      ),
      method: 'GET',
      headers: {
        'atg-rest-depth': 7,
      },
    });
    if (serviceStatus === 'SUCCESS' && data.errorMessage === null) {
      return yield put(fetchEditRegistryDataSuccess(data));
    }
    return yield put(fetchEditRegistryDataError(errorMessages));
  } catch (err) {
    return yield put(fetchEditRegistryDataError(err.body));
  }
}

export function* editRegistrySaga() {
  yield takeLatest(FETCH_EDIT_REGISTRY_DATA, fetchEditRegistryData);
}

export default [editRegistrySaga];
