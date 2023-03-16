import qs from 'qs';
import { takeLatest, call, put } from 'redux-saga/effects';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { REPLACE_PRODUCT_FROM_REGISTRY } from './constants';
import {
  replaceProductFromRegistrySuccess,
  replaceProductFromRegistryError,
} from './actions';

export const getData = payload => {
  const { discontinuedProductDetails, replacedProductDetails } = payload;
  const {
    registryName,
    skuId,
    price,
    parentProductId,
    prodId,
  } = replacedProductDetails;
  const {
    sku,
    registryId,
    rowID,
    qtyPurchased,
    qtyRemaining,
    eventType,
    refNum,
    itemType,
    ltlDeliveryServices,
    productId,
  } = discontinuedProductDetails;
  return qs.stringify({
    jasonCollectionObj: JSON.stringify({
      addItemResults: [
        {
          qty: qtyRemaining,
          registryId,
          skuId,
          price,
          prodId,
          isCustomizationRequired: false,
          refNum: '',
          ltlFlag: false,
          altNumber: '',
          ltlShipMethod: null,
          porchPayLoadJson: '',
        },
      ],
      parentProdId: parentProductId,
      registryName,
      isList: false,
      fromComparisonPage: '',
      returnURL: '',
      skipNotifyFlag: 'true',
    }),
    skuId: sku,
    updateRegistryId: registryId,
    productId,
    regItemOldQty: '',
    rowId: rowID,
    itemTypes: itemType,
    regType: eventType,
    refNum,
    ltlDeliveryServices,
    purchasedQty: qtyPurchased,
    replaceCall: true,
  });
};

export function* replaceProductFromRegistry({ payload }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('replaceProductFromRegistry'),
      method: 'POST',
      showLoader: true,
      data: getData(payload),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(replaceProductFromRegistrySuccess(data));
    }
    return yield put(replaceProductFromRegistryError(errorMessages[0].message));
  } catch (exception) {
    return yield put(replaceProductFromRegistryError(exception.body));
  }
}

export function* replaceProductFromRegistrySaga() {
  yield takeLatest(REPLACE_PRODUCT_FROM_REGISTRY, replaceProductFromRegistry);
}

export default [replaceProductFromRegistrySaga];
