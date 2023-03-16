import qs from 'qs';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import Immutable from 'immutable';
import pathOr from 'lodash/fp/pathOr';

import {
  makeSelectSiteConfig,
  makeSelectSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import { getCookie, removeCookie } from '@bbb-app/utils/universalCookie';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import isTbs from '@bbb-app/utils/isTbs';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import consoleLog from '@bbb-app/utils/logger';
import { ACTIVE_SESSION } from '@bbb-app/constants/appConstants';
import { COOKIE_PATH } from '@bbb-app/constants/cookies';
import { makeSelectAkamaiInfo } from '@bbb-app/tealium/tagSelectors/akamai';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { makeSelectFavoriteStoreInfo } from '@bbb-app/tealium/tagSelectors/favoriteStore';

import {
  formatRegistryFacetData,
  updateFacetFiterData,
} from '../../../../components/Pages/Registry/utils/formatFacetFilters';
import {
  COPY_REGISTRY,
  FETCH_FIRST_CATEGORY,
  FETCH_OTHER_CATEGORIES,
  FETCH_OOS_CATEGORIES,
  SET_BUYOFF_CONTEXT,
} from './constants';
import {
  fetchCopyRegistrySuccess,
  fetchCopyRegistryError,
  fetchFirstCategoryError,
  fetchFirstCategorySuccess,
  fetchRegistryOtherCategoriesSuccess,
  fetchRegistryOtherCategoriesError,
  fetchRegistryOtherCategories,
  fetchRegistryOosCategories,
  fetchRegistryOosCategoriesSuccess,
  fetchRegistryOosCategoriesError,
  setBuyOffContext,
  setBuyOffContextValue,
  setBuyOffContextError,
  setFacetData,
} from './actions';
import { getFacetsData, getMiniCart } from './selectors';
import { makeSelectFirstCategoryDateSortedList } from '../RegistryFacetFilter/selectors';
import { gvTealiumInfo } from './guestViewerTealiumInfo';
import { getRegistryData } from '../RegistryOwner/commonSelectors';
import { fetchInteractiveList } from '../../../InteractiveChecklist/actionWithInjectSaga';

function getCustCodes(customizationCodes) {
  return Immutable.Iterable.isIterable(customizationCodes)
    ? customizationCodes.toJS()
    : {};
}

export function* setBuyOffContextInATG({ registryId }) {
  try {
    const {
      body: { serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('startBrowsing'),
      method: 'PUT',
      data: qs.stringify({ registryId }),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(setBuyOffContextValue(true));
    }
    /* Start - For handling serviceStatus: 'ERROR' */
    if (
      errorMessages &&
      errorMessages[0] &&
      errorMessages[0].code === 'ECB00427'
    ) {
      if (getCookie(ACTIVE_SESSION)) {
        removeCookie(ACTIVE_SESSION, { path: COOKIE_PATH });
      }
      return yield put(setBuyOffContext(registryId));
    }
    return yield put(setBuyOffContextError(errorMessages));
    /* End */
  } catch (error) {
    return yield put(setBuyOffContextError(error));
  }
}

export function* setBuyOffContextSaga() {
  yield takeLatest(SET_BUYOFF_CONTEXT, setBuyOffContextInATG);
}

export function* copyRegistryItems(actionData) {
  try {
    const { sourceId, targetId, regType, sortOption, eventTypeCode } =
      actionData && actionData.payload;
    const {
      body: { data, serviceStatus, err },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('copyRegistry'),
      method: 'POST',
      params: {
        arg1: sourceId,
        arg2: targetId,
        arg3: regType,
      },
    });
    if (serviceStatus === 'SUCCESS') {
      const registryInfo = yield select(getRegistryData());
      const akamiaInfo = yield select(makeSelectAkamaiInfo());
      const favStoreInfo = yield select(makeSelectFavoriteStoreInfo());
      const miniCart = yield select(getMiniCart());
      let itemsData = {};
      itemsData = yield select(makeSelectFirstCategoryDateSortedList());
      const customizationCodes = yield select(
        makeSelectSiteConfig('customizationCodes', {})
      );
      const tealiumInfo = gvTealiumInfo(
        itemsData,
        akamiaInfo,
        favStoreInfo,
        registryInfo,
        sortOption,
        miniCart,
        getCustCodes(customizationCodes)
      );
      yield put(triggerTealiumEvent('', tealiumInfo, ''));
      if (eventTypeCode) {
        const args = {
          registryId: targetId,
          pageType: 'dynamic',
          fromRegistryActivity: true,
          eventTypeCode,
        };
        yield put(fetchInteractiveList(args));
      }
      return yield put(fetchCopyRegistrySuccess(data, serviceStatus));
    }
    return yield put(fetchCopyRegistryError(err.body));
  } catch (err) {
    return yield put(fetchCopyRegistryError(err.body));
  }
}

export function* fetchFirstCategory({
  evtDate,
  regId,
  regCode,
  isDateSort,
  wcref,
  wcsid,
  isBopisFeatureEnable,
  storeId,
}) {
  try {
    const isMSCall = yield select(
      makeSelectSwitchConfig(['GuestViewer', 'enableMSCall'])
    );
    const {
      body: { data, serviceStatus, err },
    } = yield call(ServiceUtil.triggerServerRequest, {
      // eslint-disable-next-line no-nested-ternary
      url: isBopisFeatureEnable
        ? isMSCall
          ? getApiEndPointsFromStore('getMSBOPISRegistryFirstCategory')
          : getApiEndPointsFromStore('getBOPISRegistryFirstCategory')
        : getApiEndPointsFromStore('getRegistryFirstCategory'),
      method: 'POST',
      headers: {
        'atg-rest-depth': 4,
      },
      data: qs.stringify({
        eventDate: evtDate,
        registryId: regId,
        eventTypeCode: regCode,
        view: 1,
        invCheckEnabled: true,
        isDateSort,
        storeId: isBopisFeatureEnable ? storeId : null,
        isRecommendedFlag: true,
      }),
      params: {
        wcsid,
        wcref,
      },
    });
    if (serviceStatus === 'SUCCESS') {
      yield put(fetchFirstCategorySuccess(data, isDateSort));
      const facetData = formatRegistryFacetData({
        statusFilter: data.statusFilter,
        categoryFilter: data.categoryFilter,
        priceFilter: data.priceFilter,
        isGiftGiver: true,
      });
      yield put(setFacetData(facetData));

      yield put(
        fetchRegistryOtherCategories(evtDate, regId, isDateSort, {
          storeId,
          isBopisFeatureEnable,
        })
      );
      return yield put('success');
    }
    return yield put(fetchFirstCategoryError(err.body));
  } catch (err) {
    return yield put(fetchFirstCategoryError(err.body));
  }
}

export function* fetchOtherCategories({
  evtDate,
  regId,
  isDateSort,
  storeId,
  isBopisFeatureEnable,
}) {
  try {
    const isMSCall = yield select(
      makeSelectSwitchConfig(['GuestViewer', 'enableMSCall'])
    );
    const {
      body: { data, serviceStatus, err },
    } = yield call(ServiceUtil.triggerServerRequest, {
      // eslint-disable-next-line no-nested-ternary
      url: isBopisFeatureEnable
        ? isMSCall
          ? getApiEndPointsFromStore('getMSBOPISRegistryOtherCategories')
          : getApiEndPointsFromStore('getBOPISRegistryOtherCategories')
        : getApiEndPointsFromStore('getRegistryOtherCategories'),
      method: 'POST',
      headers: {
        'atg-rest-depth': 6,
      },
      data: qs.stringify({
        isDateSort,
        eventDate: evtDate,
        registryId: regId,
        view: 1,
        invCheckEnabled: true,
        storeId: isBopisFeatureEnable ? storeId : null,
        isRecommendedFlag: true,
      }),
    });
    if (serviceStatus === 'SUCCESS') {
      const statusFilterData = pathOr(null, 'statusFilter', data);
      const priceFilterData = pathOr(null, 'priceFilter', data);
      if (statusFilterData || priceFilterData) {
        const registryFacetsFilter = yield select(getFacetsData());
        const registryUpdatedFacetsFilter = updateFacetFiterData(
          registryFacetsFilter,
          { statusFilterData, priceFilterData }
        );
        yield put(setFacetData(registryUpdatedFacetsFilter));
      }

      yield put(fetchRegistryOtherCategoriesSuccess(data, isDateSort));
      /* istanbul ignore else  */
      if (!isTbs()) {
        yield put(
          fetchRegistryOosCategories(evtDate, regId, isDateSort, {
            storeId,
            isBopisFeatureEnable,
          })
        );
      }
      return yield put('success');
    }
    return yield put(fetchRegistryOtherCategoriesError(err.body));
  } catch (err) {
    return yield put(fetchRegistryOtherCategoriesError(err.body));
  }
}

export function* fetchOosCategories({
  evtDate,
  regId,
  isDateSort,
  storeId,
  isBopisFeatureEnable,
}) {
  try {
    const isMSCall = yield select(
      makeSelectSwitchConfig(['GuestViewer', 'enableMSCall'])
    );
    const {
      body: { data, serviceStatus, err },
    } = yield call(ServiceUtil.triggerServerRequest, {
      // eslint-disable-next-line no-nested-ternary
      url: isBopisFeatureEnable
        ? isMSCall
          ? getApiEndPointsFromStore('getMSBOPISRegistryOosCategories')
          : getApiEndPointsFromStore('getBOPISRegistryOosCategories')
        : getApiEndPointsFromStore('getRegistryOosCategories'),
      method: 'POST',
      headers: {
        'atg-rest-depth': 4,
      },
      data: qs.stringify({
        eventDate: evtDate,
        registryId: regId,
        view: 1,
        invCheckEnabled: true,
        isDateSort,
        storeId: isBopisFeatureEnable ? storeId : null,
        isRecommendedFlag: true,
      }),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchRegistryOosCategoriesSuccess(data, isDateSort));
    }
    consoleLog.error(err);
    return yield put(fetchRegistryOosCategoriesError(err.body));
  } catch (err) {
    consoleLog.error(err);
    return yield put(fetchRegistryOosCategoriesError(err.body));
  }
}

export function* registryCopySaga() {
  yield takeLatest(COPY_REGISTRY, copyRegistryItems);
}

export function* registryFirstCategroySaga() {
  yield takeLatest(FETCH_FIRST_CATEGORY, fetchFirstCategory);
}

export function* registryOtherCategoriesSaga() {
  yield takeLatest(FETCH_OTHER_CATEGORIES, fetchOtherCategories);
}

export function* registryOosCategoriesSaga() {
  yield takeLatest(FETCH_OOS_CATEGORIES, fetchOosCategories);
}

export default [
  registryCopySaga,
  registryFirstCategroySaga,
  registryOtherCategoriesSaga,
  registryOosCategoriesSaga,
  setBuyOffContextSaga,
];
