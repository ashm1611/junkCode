import { call, put, takeLatest, select } from 'redux-saga/effects';
import pathOr from 'lodash/fp/pathOr';
import qs from 'qs';
import _ from 'lodash';

import { getContentParamsFromRegions } from '@bbb-app/utils/experience';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { makeSelectGlobalSwitchConfig } from '@bbb-app/selectors/configSelector';
import { makeSelectCustomerId } from '@bbb-app/selectors/accountSelectors';

import {
  formatRegistryFacetData,
  updateFacetFiterData,
} from '../../../../components/Pages/Registry/utils/formatFacetFilters';
import {
  fetchRegistryDataSuccess,
  fetchRegistryDataError,
  fetchRegistryOwnerItemsFirstCategorySuccess,
  fetchRegistryOwnerItemsFirstCategoryError,
  fetchRegistryOwnerRemainingCategory,
  fetchRegistryOwnerRemainingCategorySuccess,
  fetchRegistryOwnerRemainingCategoryError,
  shownRegistryMyAnalyzerBtn,
  removeRegistryItemSuccess,
  removeRegistryItemError,
  undoRemoveRegistryItemSuccess,
  undoRemoveRegistryItemError,
  activeRegistryCallSuccess,
  activeRegistryCallError,
  updateRemoveItemData,
  initiateInactivityModal,
  setFacetData,
} from './actions';
import { putActiveRegistryStaticFlag } from '../../../InteractiveChecklist/actionWithInjectReducer';
import { getRegistryData, getFacetData } from './commonSelectors';
import {
  FETCH_REGISTRY_DATA,
  DEFAULT_ERROR_MESSAGE,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
  REMOVE_REGISTRY_ITEM,
  UNDO_REMOVE_REGISTRY_ITEM,
  MAKE_ACTIVE_REGISTRY_CALL,
  CALL_TO_ACTION,
} from './constants';

export function* updateFacetData({
  statusFilterData,
  priceFilterData,
  categoryFilterData,
}) {
  if (statusFilterData || priceFilterData || categoryFilterData) {
    const registryFacetsFilter = yield select(getFacetData());
    const registryUpdatedFacetsFilter = updateFacetFiterData(
      registryFacetsFilter,
      { statusFilterData, priceFilterData, categoryFilterData }
    );
    yield put(setFacetData(registryUpdatedFacetsFilter));
  }
}
/**
 * Remove registry Item
 * @param {productInfo} object - object of product information
 */
export function* removeRegistryItem({
  productInfo,
  productData,
  updatedSkuId,
}) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: `${getApiEndPointsFromStore('removeRegistryItem')}`,
      method: 'POST',
      showLoader: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'atg-rest-depth': 2,
      },
      data: qs.stringify({
        skuId: productInfo.skuId,
        updateRegistryId: productInfo.updateRegistryId,
        productId: productInfo.productId,
        regItemOldQty: productInfo.regItemOldQty,
        rowId: productInfo.rowId,
        itemTypes: productInfo.itemTypes,
        regType: productInfo.regType,
        refNum: productInfo.refNum,
        ltlDeliveryServices: '',
        itemStatusFilter: productInfo.statusFilter,
      }),
    });
    if (serviceStatus === 'SUCCESS' || serviceStatus === 'PARTIAL_ERROR') {
      const statusFilterData = pathOr(null, 'component.statusFilter', data);
      const priceFilterData = pathOr(null, 'component.priceFilter', data);
      const categoryFilterData = pathOr(null, 'component.categoryFilter', data);
      yield updateFacetData({
        statusFilterData,
        priceFilterData,
        categoryFilterData,
      });
      const otherVars = {
        cart_total_items: '',
        cart_total_value: '',
        page_type: 'Registry',
        page_name: 'remove from registry',
        call_to_actiontype: CALL_TO_ACTION,
        internal_campaign: '',
      };
      const tealiumTags = Object.assign(
        {},
        productInfo.registryTealiumInfo,
        otherVars
      );
      yield put(putActiveRegistryStaticFlag(false));
      yield put(
        updateRemoveItemData(
          productInfo.regItemOldQty,
          productInfo.regItemOldPurchasedQty,
          false
        )
      );
      const hasDiaperFund = pathOr(false, 'component.hasDiaperFund', data);
      const itemCount = pathOr(false, 'component.itemCount', data);
      const updatedProductData = productData;
      updatedProductData[0].hasDiaperFund = hasDiaperFund;
      updatedProductData[0].itemCount = itemCount;
      yield put(triggerTealiumEvent('remove from registry', tealiumTags));
      return yield put(
        removeRegistryItemSuccess(updatedProductData, updatedSkuId)
      );
    }
    return yield put(removeRegistryItemError(errorMessages, updatedSkuId));
  } catch (err) {
    return yield put(
      removeRegistryItemError(DEFAULT_ERROR_MESSAGE, updatedSkuId)
    );
  }
}

export function* removeRegistryItemSaga() {
  yield takeLatest(REMOVE_REGISTRY_ITEM, removeRegistryItem);
}

export function getData(payload, registryData) {
  const {
    price,
    refNum,
    qtyRequested,
    sKUDetailVO,
    ltlDeliveryServices,
    statusFilter,
    categoryFilter,
    ggEligibleItem,
    totalPriceVal,
  } = payload;
  return qs.stringify({
    jasonCollectionObj: JSON.stringify({
      addItemResults: [
        {
          qty: qtyRequested.toString(),
          registryId: registryData.registryResVO.registrySummaryVO.registryId,
          skuId: sKUDetailVO.skuId,
          price,
          prodId: sKUDetailVO.parentProdId,
          isCustomizationRequired: sKUDetailVO.customizableRequired,
          personalizationType: sKUDetailVO.personalizationType,
          refNum,
          ltlFlag: sKUDetailVO.ltlItem,
          ltlShipMethod: ltlDeliveryServices,
          isUndo: true,
          itemPrice: price,
          itemStatusFilter: statusFilter || 'itemStatusFilter',
          itemCategoryFilter: categoryFilter || 'itemCategoryFilter',
          ggEligibleItem,
          totalPrice: totalPriceVal === 0 ? '' : totalPriceVal,
        },
      ],
      parentProdId: sKUDetailVO.parentProdId,
      registryName: registryData.registryResVO.registrySummaryVO.eventType,
      isList: false,
      skipNotifyFlag: 'true',
    }),
  });
}

/**
 * Undo Remove registry Item
 * @param {productInfo} object - object of product information
 */
export function* undoRemoveRegistryItem({
  productInfo,
  productData,
  updatedSkuId,
}) {
  const customerId = yield select(makeSelectCustomerId());
  const registryData = yield select(getRegistryData());
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('addItemsToGiftRegistry').replace(
        ':customerId',
        customerId
      ),
      method: 'POST',
      showLoader: true,
      variation: 'fullWidth',
      data: getData(productInfo, registryData),
    });
    if (serviceStatus === 'SUCCESS') {
      const statusFilterData = pathOr(null, 'component.statusFilter', data);
      const priceFilterData = pathOr(null, 'component.priceFilter', data);
      const categoryFilterData = pathOr(null, 'component.categoryFilter', data);
      yield updateFacetData({
        statusFilterData,
        priceFilterData,
        categoryFilterData,
      });
      yield put(putActiveRegistryStaticFlag(false));
      yield put(
        updateRemoveItemData(
          productInfo.qtyRequested,
          productInfo.qtyPurchased,
          true
        )
      );
      const hasDiaperFund = pathOr(false, 'component.hasDiaperFund', data);
      const itemCount = pathOr(false, 'component.itemCount', data);
      const updatedProductData = productData;
      updatedProductData[0].hasDiaperFund = hasDiaperFund;
      updatedProductData[0].itemCount = itemCount;
      return yield put(
        undoRemoveRegistryItemSuccess(updatedProductData, updatedSkuId)
      );
    }
    return yield put(removeRegistryItemError(errorMessages, updatedSkuId));
  } catch (err) {
    return yield put(
      undoRemoveRegistryItemError(DEFAULT_ERROR_MESSAGE, updatedSkuId)
    );
  }
}

export function* undoRemoveRegistryItemSaga() {
  yield takeLatest(UNDO_REMOVE_REGISTRY_ITEM, undoRemoveRegistryItem);
}

/**
 * Fetch the registry details
 * @param {registryId} string - registry id of the registry
 * @param {giftGiver} boolean - if the user is gift giver or not
 */

export function* getRegistryDetails({
  registryId,
  giftGiver,
  fromRegistryController,
}) {
  try {
    if (!registryId) {
      return yield put(fetchRegistryDataError(DEFAULT_ERROR_MESSAGE));
    }
    const apiFlag = yield select(
      makeSelectGlobalSwitchConfig(['getRegDetailsV2'])
    );
    let endPoint = apiFlag
      ? getApiEndPointsFromStore('getRegistryV2')
      : getApiEndPointsFromStore('getRegistry');
    // eslint-disable-next-line no-nested-ternary
    endPoint = endPoint
      ? `${endPoint}/${registryId}`
      : apiFlag
      ? `/apis/stateful/v2.0/registry/${registryId}`
      : `/apis/stateful/v1.0/registry/${registryId}`;
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: endPoint,
      method: 'POST',
      headers: {
        'atg-rest-depth': 7,
      },
      data: qs.stringify({
        isGiftGiver: giftGiver,
        fromRegistryController,
      }),
      ignoreDynSession: false,
    });
    if (
      serviceStatus === 'SUCCESS' &&
      errorMessages &&
      Array.isArray(errorMessages)
    ) {
      return yield put(fetchRegistryDataError(errorMessages));
    }
    if (serviceStatus === 'SUCCESS' || serviceStatus === 'PARTIAL_ERROR') {
      return yield put(fetchRegistryDataSuccess(data));
    }
    return yield put(fetchRegistryDataError(errorMessages));
  } catch (err) {
    return yield put(fetchRegistryDataError(err.body));
  }
}

export function* registryDetailsSaga() {
  yield takeLatest(FETCH_REGISTRY_DATA, getRegistryDetails);
}

export function* fetchRegistryOwnerItemsFirstCatory({
  registryId,
  eventTypeCode,
  eventDate,
  isDateSort,
  isRegReplace,
  printView,
  params = {},
}) {
  const { storeId, isBopisFeatureEnable } = params;
  const callObj = {
    url: getApiEndPointsFromStore('registryOwnerItemsFirstCategory'),
    method: 'POST',
    headers: {
      'atg-rest-depth': 4,
    },
    data: qs.stringify({
      eventTypeCode,
      registryId,
      eventDate,
      isDateSort: true,
      view: 1,
      inventoryCallEnabled: true,
      enableRegAnalyzer: true,
      printView,
      isRecommendedFlag: true,
      storeId: isBopisFeatureEnable ? storeId : null,
    }),
  };
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, callObj);

    if (serviceStatus === 'SUCCESS') {
      yield put(fetchRegistryOwnerItemsFirstCategorySuccess(data, isDateSort));
      const facetData = formatRegistryFacetData({
        statusFilter: data.statusFilter,
        categoryFilter: data.categoryFilter,
        priceFilter: data.priceFilter,
      });
      yield put(setFacetData(facetData));
      return yield put(
        fetchRegistryOwnerRemainingCategory(
          registryId,
          eventTypeCode,
          eventDate,
          isDateSort,
          isRegReplace,
          params
        )
      );
    }
    return yield put(
      fetchRegistryOwnerItemsFirstCategoryError(errorMessages.message)
    );
  } catch (err) {
    return yield put(fetchRegistryOwnerItemsFirstCategoryError(err.body));
  }
}

export function* fetchRegistryOwnerItemsSaga() {
  yield takeLatest(
    FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
    fetchRegistryOwnerItemsFirstCatory
  );
}

export function* fetchRegistryOwnerRemainingCatory({
  registryId,
  eventTypeCode,
  eventDate,
  isDateSort,
  isRegReplace,
  params = {},
}) {
  const { storeId, isBopisFeatureEnable } = params;
  const callObj = {
    url: getApiEndPointsFromStore('registryOwnerItemsRemainingCategory'),
    method: 'POST',
    headers: {
      'atg-rest-depth': 4,
    },
    data: qs.stringify({
      eventTypeCode,
      registryId,
      eventDate,
      isDateSort,
      view: 1,
      inventoryCallEnabled: true,
      enableRegAnalyzer: true,
      storeId: isBopisFeatureEnable ? storeId : null,
    }),
  };
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, callObj);
    yield put(shownRegistryMyAnalyzerBtn(true));
    if (serviceStatus === 'SUCCESS') {
      const statusFilterData = pathOr(
        null,
        'atgResponse.JDAAllCategoryBucket.statusFilter',
        data
      );
      const priceFilterData = pathOr(
        null,
        'atgResponse.JDAAllCategoryBucket.priceFilter',
        data
      );
      yield updateFacetData({ statusFilterData, priceFilterData });
      return yield put(
        fetchRegistryOwnerRemainingCategorySuccess(
          data,
          isDateSort,
          isRegReplace
        )
      );
    }
    return yield put(
      fetchRegistryOwnerRemainingCategoryError(errorMessages.message)
    );
  } catch (err) {
    return yield put(fetchRegistryOwnerRemainingCategoryError(err.body));
  }
}

export function* fetchRegistryOwnerItemsRemainingSaga() {
  yield takeLatest(
    FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
    fetchRegistryOwnerRemainingCatory
  );
}

/* create certona parameters for loaded product, PDP page */
export function getContentParams(currentTemplate, productId) {
  const paramsObject = getContentParamsFromRegions(
    productId,
    currentTemplate.regions
  );
  return paramsObject;
}

export function getProductIds(firstItemCategory, remainingItems) {
  let productIds = [];
  productIds = retrieveProductIds(firstItemCategory, productIds);
  productIds = retrieveProductIds(remainingItems.atgResponse, productIds);
  return productIds.join(',');
}

export function retrieveProductIds(data, productIds) {
  if (Array.isArray(data) && data.length > 0) {
    data.forEach(item => {
      const registryItemList = pathOr(null, 'registryItemList', item);
      parseRegistryItemList(registryItemList, productIds);
    });
  } else if (!Array.isArray(data)) {
    _.forOwn(data, val => {
      const registryItemList = pathOr(null, 'registryItemList', val);
      parseRegistryItemList(registryItemList, productIds);
    });
  }
  return productIds;
}

export function parseRegistryItemList(data, productIds) {
  data.forEach(item => {
    const productId = pathOr('', 'sKUDetailVO.parentProdId', item);
    productIds.push(productId);
  });
  return productIds;
}

export function* activeRegistryCall() {
  try {
    const {
      body: { serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('getAllRegistriesDetails'),
      method: 'GET',
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(activeRegistryCallSuccess());
    }
    return yield put(activeRegistryCallError(errorMessages));
  } catch (err) {
    return yield put(activeRegistryCallError(err));
  }
}

export function* inactivityModalSaga() {
  yield takeLatest(MAKE_ACTIVE_REGISTRY_CALL, activeRegistryCall);
}

export default [
  registryDetailsSaga,
  fetchRegistryOwnerItemsSaga,
  fetchRegistryOwnerItemsRemainingSaga,
  removeRegistryItemSaga,
  undoRemoveRegistryItemSaga,
  inactivityModalSaga,
];
