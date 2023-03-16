import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import consoleLog from '@bbb-app/utils/logger';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';

import { ADD_EDIT_TYM_ADDRESS } from './constants';
import { fetchTymData } from './ActionsWithSagaInjection';
import { fetchTymDataError } from './actions';
export function* addEditAddress({ args }) {
  const obj = args.data;
  const requestParams = {
    'tymGifterAddress.firstName': obj.firstName,
    'tymGifterAddress.lastName': obj.lastName,
    'tymGifterAddress.email': obj.email,
    'tymGifterAddress.address1': obj.addressLine1,
    'tymGifterAddress.address2': obj.apartment,
    'tymGifterAddress.city': obj.city,
    'tymGifterAddress.state': obj.state,
    'tymGifterAddress.postalCode': obj.zip,
    'tymGifterAddress.registryId': obj.registryId,
    giftReceived: obj.giftReceived ? 'Y' : 'N',
    wasReturned: obj.wasReturned ? 'Y' : 'N',
    thankYouSent: obj.thankYouSent ? 'Y' : 'N',
    rowId: obj.rowId,
  };

  const sortParams = {
    sortOrder: obj.sortOrder,
    sortDirection: obj.sortDirection,
  };
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('addEditTymGGAddress'),
      method: 'PUT',
      showLoader: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'atg-rest-depth': 0,
      },
      data: qs.stringify(requestParams),
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(
        fetchTymData(
          obj.registryId,
          [],
          sortParams.sortOrder,
          sortParams.sortDirection
        )
      );
    }
    return yield put(fetchTymDataError(errorMessages));
  } catch (err) {
    consoleLog.error(err.body);
    return yield put(fetchTymDataError(err));
  }
}

export function* addEditAddressSaga() {
  yield takeLatest(ADD_EDIT_TYM_ADDRESS, addEditAddress);
}

export default [addEditAddressSaga];
