import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { DEACTIVATE_REGISTRY_ACTION } from './constants';
import { deactivateRegistrySuccess, deactivateRegistryError } from './actions';

export function* deactivateRegistry({ regId }) {
  try {
    const {
      body: { serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('deactivateRegistry'),
      method: 'POST',
      data: qs.stringify({
        registryId: regId,
      }),
      showLoader: true,
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(deactivateRegistrySuccess(regId));
    }
    return yield put(deactivateRegistryError(errorMessages.message));
  } catch (err) {
    return yield put(deactivateRegistryError(err.body));
  }
}

export function* deactivateRegistrySaga() {
  yield takeLatest(DEACTIVATE_REGISTRY_ACTION, deactivateRegistry);
}

export default [deactivateRegistrySaga];
