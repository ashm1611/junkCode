import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';

import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import consoleLog from '@bbb-app/utils/logger';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';

import {
  markFavRegistryItemSuccess,
  markFavRegistryItemError,
  initiateInactivityModal,
} from './actions';
import {
  DEFAULT_ERROR_MESSAGE,
  MARK_FAV_REGISTRY_ITEM,
  TEALIUM_PAGE_INFO,
} from './constants';

/**
 * Mark/UnMark Fav registry Item
 * @param {productInfo} object - object of product information
 */
export function* markFavRegistryItem({
  productInfo,
  productData,
  updatedSkuId,
}) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: `${getApiEndPointsFromStore('markFavRegistryItem')}`,
      method: 'PUT',
      showLoader: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'atg-rest-depth': 2,
      },
      data: qs.stringify(productInfo),
    });

    if (serviceStatus === 'SUCCESS') {
      if (
        productData &&
        productData.favTealiumData &&
        productInfo &&
        productInfo.markAsFav === 'Y'
      ) {
        yield put(
          triggerTealiumEvent(
            'add to favorites',
            productData.favTealiumData,
            TEALIUM_PAGE_INFO
          )
        );
      }
      return yield put(markFavRegistryItemSuccess(productData, updatedSkuId));
    }
    consoleLog.error(errorMessages);
    return yield put(markFavRegistryItemError(errorMessages, updatedSkuId));
  } catch (err) {
    consoleLog.error(err);
    return yield put(
      markFavRegistryItemError(DEFAULT_ERROR_MESSAGE, updatedSkuId)
    );
  }
}

export function* markFavRegistryItemSaga() {
  yield takeLatest(MARK_FAV_REGISTRY_ITEM, markFavRegistryItem);
}

export default [markFavRegistryItemSaga];
