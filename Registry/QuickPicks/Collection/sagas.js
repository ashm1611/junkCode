import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import {
  pick,
  pathOr,
  getOr,
  isEmpty,
  values,
  has,
  get,
  orderBy,
} from 'lodash/fp';
import { matchPath } from 'react-router';

import { getCookie } from '@bbb-app/utils/universalCookie';
import { delay, isBrowser } from '@bbb-app/utils/common';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { fetchRegistriesDetails } from '@bbb-app/get-registry-details/containers/actions';
import {
  interactiveCheckListSelector,
  pageIdentifierSelector,
} from '@bbb-app/selectors/registrySelectors';
import { ROUTE_REGISTRY_QUICK_PICKS_LANDING } from '@bbb-app/constants/route/route';
import {
  ADD_ITEM_ACTIVE_REGISTRY,
  ADD_SELECTED_ITEMS_TO_REGISTRY,
  DISPLAY_TOAST_NOTIFICATION,
  FETCH_QUICK_PICKS_COLLECTION,
  TEALIUM_PAGE_INFO,
} from './constants';
import {
  setQuickPicksCollection,
  fetchQuickPicksCollectionError,
  setToastNotification,
  displayToastNotification,
} from './actions';
import { convertToProductProps } from '../../../../../utils/quickPicks';
import {
  customerRegistryInfoSelector,
  registryQuickPicksCollectionConfigSelector,
  makeAkamaiInfo,
  makeSelectBreadcrumb,
  registryQuickPicksCollectionSelector,
  makeSelectCurrentRoute,
  makeSelectPrevRoute,
} from './selectors';
import {
  updateGiftDataAction,
  updatedRegistryFromQuickAddAction,
} from '../../RegistryOwner/RegistryOwnerAction';

import { addToRegistryQuickPicks } from './util';

const setQuickPicksCollectionHelper = ({
  registryType,
  category,
  collections,
  selectedCollection,
  products,
  data,
  cacheKey,
}) => ({
  registryType,
  category: {
    id: category,
    label: getOr('', ['category', 'label'], data),
  },
  hero: getOr([], 'hero', data),
  categories: getOr([], 'categorySlot', data),
  collections,
  selectedCollection,
  products,
  cacheKey,
});

/*
 * @generator
 * @description Triggers service call API to get the registry quick picks collection data
 */
export function* getCollectionById(quickpickId, siteId, channel) {
  const params = {
    url: getApiEndPointsFromStore('registryQuickPicksCollection'),
    params: {
      quickpickId,
    },
    showLoader: false,
    siteId,
  };
  if (!isBrowser()) {
    params.headers = { 'x-bbb-channel': channel };
  }
  const {
    body: { serviceStatus, errorMessages, data: responseData },
  } = yield call(ServiceUtil.triggerServerRequest, params);
  return yield { serviceStatus, errorMessages, responseData };
}

export const getRegistryType = (registryTypes, previousRegistryType) => {
  let selectedRegistryType = null;
  if (!isEmpty(registryTypes) && !isEmpty(previousRegistryType)) {
    selectedRegistryType = registryTypes.find(
      v => v.id === previousRegistryType
    );
  }
  return selectedRegistryType || registryTypes[0];
};

export function* getPreviousRegistryType() {
  const pathname = yield select(makeSelectPrevRoute());
  let registryType = null;
  if (pathname) {
    const result = matchPath(pathname, ROUTE_REGISTRY_QUICK_PICKS_LANDING, {
      exact: true,
    });
    if (result && result.params && result.params.registryType) {
      registryType = result.params.registryType;
    }
  }
  return yield registryType;
}

/*
 * @generator
 * @description Extracts route parameters to make service call API and formats data for the registry quick picks collection
 */
export function* fetchQuickPicksCollection({
  args: { category, collectionId, pagePath },
  siteId,
  channel,
}) {
  try {
    const quickPicksObj = yield select(registryQuickPicksCollectionSelector);
    const currentCacheKey = pathOr('', 'currentCacheKey', quickPicksObj);
    const cacheKey = pagePath;
    if (!isEmpty(cacheKey) && cacheKey === currentCacheKey) {
      yield put(setQuickPicksCollection({ cacheHit: true }));
    } else {
      const { responseData } = yield getCollectionById(
        collectionId,
        siteId,
        channel
      );
      const productInformationParam = getOr(
        {},
        'productInformation',
        responseData
      );
      const productsParam = getOr([], 'products', responseData);
      const products = productsParam
        .filter(
          // Raj requested to skip products without skuIds or productIds
          v => {
            if (v.product_id) {
              return (
                productInformationParam[parseInt(v.product_id, 10)] &&
                (v.default_sku ||
                  has(
                    'SKU_FOR_SWATCH_ALL.0.SKU_ID',
                    productInformationParam[parseInt(v.product_id, 10)]
                  ))
              );
            } else if (
              v.sku_id &&
              productInformationParam[parseInt(v.sku_id, 10)]
            ) {
              return productInformationParam[parseInt(v.sku_id, 10)];
            }

            return false;
          }
        )
        .map(
          ({
            badge,
            badgeDescription,
            default_sku: defaultSku,
            product_id: productId,
            sku_id: skuId,
            recommendedQuantity,
          }) => ({
            badge,
            badgeDescription,
            comment: badgeDescription,
            recommendedCount: recommendedQuantity,
            ...convertToProductProps(
              productInformationParam[parseInt(productId || skuId, 10)]
            ),
            defaultSkuCMS:
              defaultSku ||
              skuId ||
              get(
                'SKU_FOR_SWATCH_ALL.0.SKU_ID',
                productInformationParam[parseInt(productId, 10)]
              ),
            productIdCMS: productId,
          })
        );
      const previousRegistryType = yield getPreviousRegistryType();
      const registryType = getRegistryType(
        getOr([], 'breadcrumb.registryTypes', responseData),
        previousRegistryType
      );
      const collections = getOr(
        [],
        'breadcrumb.category.collections',
        responseData
      );
      const selectedCollection =
        !isEmpty(collections) &&
        collections.find(
          collection => collection.collectionId === collectionId
        );

      yield put(
        setQuickPicksCollection(
          setQuickPicksCollectionHelper({
            data: responseData,
            selectedCollection: selectedCollection || collections[0],
            previousSelectedProducts: {},
            cacheHit: false,
            registryType,
            category,
            collections,
            products,
            cacheKey,
          })
        )
      );
    }
  } catch (e) {
    yield put(
      fetchQuickPicksCollectionError({
        error: e,
      })
    );
  }
}

export function* callAddItemsToGiftRegistryApi(customerId, data) {
  const {
    body: { serviceStatus, errorMessages, data: responseData },
  } = yield call(ServiceUtil.triggerServerRequest, {
    url: getApiEndPointsFromStore('addItemsToGiftRegistry').replace(
      ':customerId',
      customerId
    ),
    method: 'POST',
    showLoader: true,
    data,
  });
  return yield { serviceStatus, errorMessages, responseData };
}

export const getItemToAdd = (registryId, itemParam) => {
  const propsMapper = {
    defaultSkuCMS: 'skuId',
    productId: 'prodId',
  };
  const item = pick(['productId', 'defaultSkuCMS', 'price', 'qty'], itemParam);
  const variantsParam = pick(['selectedVariant', 'variants'], itemParam);
  if (
    variantsParam &&
    variantsParam.selectedVariant > -1 &&
    variantsParam.variants.length >= variantsParam.selectedVariant + 1
  ) {
    const orderedVariants = orderBy('label', 'asc', variantsParam.variants);
    item.defaultSkuCMS = orderedVariants[variantsParam.selectedVariant].skuId;
  }
  item.defaultSkuCMS =
    item.defaultSkuCMS && item.defaultSkuCMS.replace(/sku\//, '');
  Object.keys(propsMapper).forEach(prop => {
    item[propsMapper[prop]] = item[prop];
    delete item[prop];
  });
  item.registryId = registryId;
  if (item.price) {
    item.price = `${item.price.normalValue}`;
  }
  const defaults = {
    skuId: '',
    prodId: '',
    registryId: '',
    qty: 1,
    price: '0',
    isCustomizationRequired: 'false',
    personalizationType: 'N',
    refNum: '',
    ltlFlag: `${itemParam.isLTL}` || 'false',
    ltlShipMethod: '',
    porchPayLoadJson: '',
  };

  return { ...defaults, ...item };
};

export function* handleDisplayToastNotification({ payload }) {
  try {
    const config = yield select(registryQuickPicksCollectionConfigSelector);
    const duration =
      config['registry.quickpicks.toast.duration.seconds'] || '5';
    /* istanbul ignore else  */
    if (isBrowser()) {
      yield put(
        setToastNotification({
          content: payload,
          show: true,
        })
      );
      yield call(delay, parseInt(duration * 1000, 10));
      yield put(
        setToastNotification({
          show: false,
        })
      );
    }
  } catch (e) {
    yield put(fetchQuickPicksCollectionError(e));
  }
}

export const getShowerDate = registry => {
  let showerDate = pathOr('', 'activeRegistry.eventVO.showerDate', registry);
  if (showerDate && showerDate.length === 8) {
    showerDate = `${showerDate.substring(4, 6)}/${showerDate.substring(
      6,
      8
    )}/${showerDate.substring(0, 4)}`;
  }
  return showerDate;
};

export const getProductData = (selectedProducts, page) => {
  const productId = [];
  const price = [];
  const productName = [];
  const productQuantity = [];
  const productSkuId = [];
  Object.keys(selectedProducts).forEach(key => {
    productId.push(selectedProducts[key].productId);
    const itemPrice = selectedProducts[key].price
      ? selectedProducts[key].price
      : {};
    const normalPrice = itemPrice.normal && itemPrice.normal.split('$').pop();
    price.push(itemPrice.normalValue ? itemPrice.normalValue : normalPrice);
    productName.push(selectedProducts[key].title);
    productQuantity.push(selectedProducts[key].qty);
    productSkuId.push(selectedProducts[key].defaultSkuCMS);
    return null;
  });
  const pagenameBreadcrumb =
    page && page.breadcrumb ? page.breadcrumb.pagename_breadcrumb : '';
  return {
    productId,
    price,
    productName,
    productQuantity,
    productSkuId,
    pagenameBreadcrumb,
  };
};

export const getRegistryAddLocation = pathname => {
  const pathArray = pathname ? pathname.split('/') : [];
  let registryLocation = pathArray[pathArray.length - 2];
  if (registryLocation) {
    for (let i = 0; i < registryLocation.length; i += 1) {
      registryLocation = registryLocation.replace('-', ' ');
    }
  }
  return registryLocation || '';
};

export const getTealiumData = (
  selectedProducts,
  registry,
  checklist,
  akamaiData,
  payload,
  pathname,
  page
) => {
  const showerDate = getShowerDate(registry);
  const productData = getProductData(selectedProducts, page);
  const registryCount = pathOr('', 'activeRegistry.giftRegistered', registry);
  const personaType = pathOr('', 'activeRegistry.personaName', registry);
  const registryAddLocation = getRegistryAddLocation(pathname);
  const isFromRecommendation = registryAddLocation === 'recommendation';
  return {
    brand_id: [],
    brand_name: [],
    cart_total_items: getCookie('cartCount') || 0,
    cart_total_value: '',
    category_id: '',
    registry_id: pathOr('', 'activeRegistry.registryId', registry),
    registry_type: pathOr(
      '',
      'activeRegistry.registryType.registryTypeDesc',
      registry
    ),
    registry_total_items: registryCount,
    registry_purchased: pathOr('', 'activeRegistry.eventType', registry),
    shower_celebration_date: showerDate,
    registry_total_value: '',
    registry_product_name_count_purchased: pathOr(
      '',
      'activeRegistry.giftPurchased',
      registry
    ),
    registry_product_name_count_requested: [registryCount],
    registry_event_date: pathOr('', 'activeRegistry.eventDate', registry),
    registrants_name:
      registry && registry.activeRegistry
        ? `${registry.activeRegistry.primaryRegistrantFirstName} ${registry.activeRegistry.primaryRegistrantLastName}`
        : '',
    registry_favorite_categories_id: '',
    registry_favorite_categories_name: '',
    registry_add_location:
      !isEmpty(personaType) && isFromRecommendation
        ? `Registry Quiz>${personaType}`
        : `Registry Consultant>${registryAddLocation}`,
    registry_checklist_completion: checklist
      ? checklist.averageC1Percentage
      : '',
    product_id: productData.productId,
    product_name: productData.productName,
    product_price: productData.price,
    product_quantity: productData.productQuantity,
    product_sku_id: productData.productSkuId,
    product_sku_name: productData.productName,
    product_sub_sub_category: [],
    product_subcategory: [],
    product_url: [],
    personalization_type: '',
    product_has_personalization: '',
    product_category: [],
    favorite_store_id: '',
    inventory_status: '',
    is_ltl_item: '',
    level_of_service: '',
    customer_postal_code: akamaiData ? akamaiData.zip : '',
    pagename_breadcrumb: productData.pagenameBreadcrumb,
    product_image_name: '',
    product_image_url: '',
  };
};

export function* updateGiftRegistryQuantity(quantity) {
  const pageIdentifier = yield select(pageIdentifierSelector());
  if (pageIdentifier === 'FriendRegistry') {
    yield put(updatedRegistryFromQuickAddAction());
    yield put(updateGiftDataAction(quantity, 0));
  }
}

export function* addSelectedItemsToRegistry({ payload }) {
  try {
    const { customerId, registry, isLoggedIn } = yield select(
      customerRegistryInfoSelector
    );
    if (!isLoggedIn || !(registry && registry.activeRegistry)) {
      return yield;
    }

    const activeRegistryObj = addToRegistryQuickPicks(registry);

    const { selectedProducts } = yield select(
      registryQuickPicksCollectionSelector
    );
    const pathname = yield select(makeSelectCurrentRoute());
    const akamaiData = yield select(makeAkamaiInfo());
    const registryAddLocation = getRegistryAddLocation(pathname);
    const isFromRecommendation = registryAddLocation === 'recommendation';
    const pageNameBreadcrumb = yield select(
      makeSelectBreadcrumb(isFromRecommendation)
    );
    const checklist = yield select(interactiveCheckListSelector());
    const addItemResults = Object.keys(selectedProducts)
      .map(key => selectedProducts[key])
      .map(v => getItemToAdd(activeRegistryObj.registryId, v));

    const data = qs.stringify({
      jasonCollectionObj: JSON.stringify({
        addItemResults,
        registryName: pathOr(
          '',
          'registryType.registryTypeDesc',
          activeRegistryObj
        ),
        skipNotifyFlag: 'true',
      }),
    });

    const { serviceStatus } = yield callAddItemsToGiftRegistryApi(
      customerId,
      data
    );

    /* istanbul ignore else  */
    if (serviceStatus === 'SUCCESS') {
      const quantity = addItemResults.reduce((prevQty, currQtyObj) => {
        return prevQty + currQtyObj.qty;
      }, 0);
      yield updateGiftRegistryQuantity(quantity);
      yield put(
        setQuickPicksCollection({
          selectedProducts: {},
          itemsAdded: addItemResults.length,
          previousSelectedProducts: selectedProducts,
        })
      );
      yield put(displayToastNotification(values(selectedProducts, v => v)));
      yield put(
        triggerTealiumEvent(
          'add selected items to registry',
          getTealiumData(
            selectedProducts,
            registry,
            checklist,
            akamaiData,
            payload,
            pathname,
            { action: 'allRegistry', breadcrumb: pageNameBreadcrumb }
          ),
          TEALIUM_PAGE_INFO
        )
      );
      yield put(fetchRegistriesDetails(customerId));
    }
  } catch (e) {
    yield put(fetchQuickPicksCollectionError(e));
  }
  return yield;
}

export function* addItemToActiveRegistry({ payload }) {
  try {
    const { customerId, registry, isLoggedIn } = yield select(
      customerRegistryInfoSelector
    );
    if (!isLoggedIn || !(registry && registry.activeRegistry)) {
      return yield;
    }
    const activeRegistryObj = addToRegistryQuickPicks(registry);
    const item = getItemToAdd(activeRegistryObj.registryId, payload);
    const data = qs.stringify({
      jasonCollectionObj: JSON.stringify({
        addItemResults: [item],
        registryName: pathOr(
          '',
          'registryType.registryTypeDesc',
          activeRegistryObj
        ),
        skipNotifyFlag: 'true',
      }),
    });

    const pathname = yield select(makeSelectCurrentRoute());
    const akamaiData = yield select(makeAkamaiInfo());
    const registryAddLocation = getRegistryAddLocation(pathname);
    const isFromRecommendation = registryAddLocation === 'recommendation';
    const pageNameBreadcrumb = yield select(
      makeSelectBreadcrumb(isFromRecommendation)
    );
    const checklist = yield select(interactiveCheckListSelector());
    const selectedProducts = {};
    selectedProducts[payload.defaultSkuCMS] = {
      defaultSkuCMS: payload.defaultSkuCMS,
      price: payload.price,
      productId: payload.productId,
      qty: payload.qty,
      selectedVariant: payload.selectedVariant,
      title: payload.title,
    };

    const { serviceStatus } = yield callAddItemsToGiftRegistryApi(
      customerId,
      data
    );
    /* istanbul ignore else  */
    if (serviceStatus === 'SUCCESS') {
      yield updateGiftRegistryQuantity(payload.qty);
      yield put(displayToastNotification([payload]));
      yield put(
        setQuickPicksCollection({
          previousSelectedProducts: selectedProducts,
        })
      );
      yield put(
        triggerTealiumEvent(
          'add to registry',
          getTealiumData(
            selectedProducts,
            registry,
            checklist,
            akamaiData,
            2,
            pathname,
            { action: 'activeRegistry', breadcrumb: pageNameBreadcrumb }
          ),
          TEALIUM_PAGE_INFO
        )
      );
      yield put(fetchRegistriesDetails(customerId));
    }
  } catch (e) {
    yield put(fetchQuickPicksCollectionError(e));
  }
  return yield;
}

/*
 * @generator
 * @description Sets up watches for actions related to quick picks collection
 */
export function* watchFetchQuickPicksCollection() {
  yield takeLatest(FETCH_QUICK_PICKS_COLLECTION, fetchQuickPicksCollection);
  yield takeEvery(ADD_ITEM_ACTIVE_REGISTRY, addItemToActiveRegistry);
  yield takeEvery(ADD_SELECTED_ITEMS_TO_REGISTRY, addSelectedItemsToRegistry);
  yield takeLatest(DISPLAY_TOAST_NOTIFICATION, handleDisplayToastNotification);
}

/*
 * @exports
 */
export default [watchFetchQuickPicksCollection];
