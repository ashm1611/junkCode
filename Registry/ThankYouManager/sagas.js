import { call, put, takeLatest, select } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';
import { makeSelectGlobalSwitchConfig } from '@bbb-app/selectors/configSelector';
import { giftAlertOptinRegistryDetailsSuccess } from '@bbb-app/get-registry-details/containers/actions';
import {
  fetchTymDataSuccess,
  fetchTymDataError,
  revealThankYouListSuccess,
  revealThankYouListError,
} from './actions';
import { FETCH_TYM_DATA, REVEAL_THANK_YOU_LIST } from './constants';

/**
 * Fetch the Thank You List
 * @param {registryId} string - registry id of the registry
 */

export function* getThankYouList({
  registryId,
  contentIdArgs,
  sortOrder,
  sortDirection,
}) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('getRegistryThankYouList'),
      method: 'GET',
      showLoader: true,
      params: {
        registryId,
        sortOrder,
        sortDirection,
      },
      headers: {
        'atg-rest-depth': '3',
      },
    });

    if (serviceStatus === 'SUCCESS') {
      yield put(fetchReferredContent(contentIdArgs));

      return yield put(fetchTymDataSuccess(data, registryId));
    }
    return yield put(fetchTymDataError(errorMessages));
  } catch (err) {
    return yield put(fetchTymDataError(err.body));
  }
}

export function* tymListSaga() {
  yield takeLatest(FETCH_TYM_DATA, getThankYouList);
}

function getData(registryId, isNotificationsEnable, giftAlertsOptin) {
  if (isNotificationsEnable) {
    return qs.stringify({
      registryId,
      attributeValue: 'Y',
      attributeName: giftAlertsOptin,
    });
  }
  return qs.stringify({ registryId });
}

/**
 * Revealing the action Thank You List
 * @param {registryId} string - registry id of the registry
 */
export const GIFT_ALERTS_OPTIN_LBL = 'GIFT_ALERTS_OPTIN';
export function* revealThankYouList({ registryId }) {
  yield put(initiateInactivityModal(true));
  const isNotificationsEnable = yield select(
    makeSelectGlobalSwitchConfig(['enableNotifications'])
  );
  const giftAlertsOptin = GIFT_ALERTS_OPTIN_LBL;
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('revealThankYouList'),
      method: 'PUT',
      data: getData(registryId, isNotificationsEnable, giftAlertsOptin),
      headers: {
        'atg-rest-depth': '3',
      },
    });
    if (serviceStatus === 'SUCCESS') {
      yield put(giftAlertOptinRegistryDetailsSuccess('Y'));
      return yield put(revealThankYouListSuccess(data));
    }
    return yield put(revealThankYouListError(errorMessages));
  } catch (err) {
    return yield put(revealThankYouListError(err.body));
  }
}

export function* revealThankYouListSaga() {
  yield takeLatest(REVEAL_THANK_YOU_LIST, revealThankYouList);
}

export default [tymListSaga, revealThankYouListSaga];
