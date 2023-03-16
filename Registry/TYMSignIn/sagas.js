import qs from 'qs';
import { call, put, takeLatest } from 'redux-saga/effects';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';

import { signInUserSuccess, signInUserError } from './actions';
import { SIGN_IN_USER } from './constants';

export function* signInRecognizedUser({ args }) {
  const logInParams = {
    'value.login': args.email,
    'value.password': args.password,
  };
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('recognizedSignIn'),
      method: 'POST',
      data: qs.stringify(logInParams),
      headers: {
        'atg-rest-depth': '3',
      },
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(signInUserSuccess(serviceStatus));
    }
    return yield put(signInUserError(errorMessages));
  } catch (err) {
    return yield put(signInUserError(err.body));
  }
}

export function* signInRecognizedUserSaga() {
  yield takeLatest(SIGN_IN_USER, signInRecognizedUser);
}

export default [signInRecognizedUserSaga];
