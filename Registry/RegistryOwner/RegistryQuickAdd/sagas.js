import { call, put, takeLatest } from 'redux-saga/effects';
import pathOr from 'lodash/fp/pathOr';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { FETCH_REGISTRY_QUICK_ADD_ITEMS } from './constants';
import {
  fetchRegistryQuickAddItemsSuccess,
  fetchRegistryQuickAddItemsError,
} from './actions';

export function* fetchRegistryQuickAddItems({ quickAddId }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('registryQuickPicksCollection'),
      params: {
        quickpickId: quickAddId,
      },
      showLoader: false,
    });

    if (serviceStatus === 'SUCCESS') {
      const productInformation = pathOr(null, 'productInformation', data);
      const products = pathOr(null, 'products', data);
      return yield put(
        fetchRegistryQuickAddItemsSuccess(productInformation, products)
      );
    }
    return yield put(fetchRegistryQuickAddItemsError(errorMessages.message));
  } catch (err) {
    return yield put(fetchRegistryQuickAddItemsError(err.body));
  }
}

export function* fetchRegistryQuickAddItemsSaga() {
  yield takeLatest(FETCH_REGISTRY_QUICK_ADD_ITEMS, fetchRegistryQuickAddItems);
}

export default [fetchRegistryQuickAddItemsSaga];
