import { call, put, takeLatest, select } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';
import { makeSelectCustomerId } from '@bbb-app/selectors/accountSelectors';

import {
  fetchRecommendationsSuccess,
  fetchRecommendationsError,
  fetchRecommenderSummary,
  mayBeLaterCallSuccess,
  mayBeLaterCallError,
  socialRecommendUserBlockUnblockSuccess,
  socialRecommendUserBlockUnblockError,
  getRecommenderSummaryError,
  getRecommenderSummarySuccess,
} from './actions';
import {
  FETCH_REGISTRY_RECOMMENDATIONS,
  SAVE_EMAIL_FREQUENCY,
  FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
  MAY_BE_LATER,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY,
} from './constants';

/**
 * Fetch the Recommendation list
 * @param {registryId} string - registry id of the registry
 * @param {tabId} string - tabId id of the registry
 * @param {registryId} string - sortOption  of the registry
 * @param {sortOption} string - eventTypeCode  of the registry
 */

export function* getRecommendations({
  registryId,
  tabId,
  sortOption,
  eventTypeCode,
}) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { data, serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('getRegistryRecommendations'),
      method: 'GET',
      params: {
        registryId,
        tabId,
        sortOption,
        eventTypeCode,
      },
      headers: {
        'atg-rest-depth': '2',
      },
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchRecommendationsSuccess(data));
    }
    return yield put(fetchRecommendationsError(errorMessages));
  } catch (err) {
    return yield put(fetchRecommendationsError(err.body));
  }
}

/**
 * Fetch the Recommendation list
 * @param {registryId} string - registry id of the registry
 * @param {tabId} string - tabId id of the registry
 * @param {registryId} string - sortOption  of the registry
 * @param {sortOption} string - eventTypeCode  of the registry
 */

export function* getRecommenderSummary({ registryId, tabId }) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { data, serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('getRegistryRecommenderSummary'),
      method: 'GET',
      params: {
        registryId,
        tabId,
      },
      headers: {
        'atg-rest-depth': '3',
      },
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(getRecommenderSummarySuccess(data));
    }
    return yield put(getRecommenderSummaryError(errorMessages));
  } catch (err) {
    return yield put(getRecommenderSummaryError(err.body));
  }
}

/**
 * Fetch the Recommendation list with date sorted data
 * @param {registryId} string - registry id of the registry
 * @param {tabId} string - tabId id of the registry
 * @param {registryId} string - sortOption  of the registry
 * @param {sortOption} string - eventTypeCode  of the registry
 */

export function* getRecommendationsSortedByDate({
  registryId,
  tabId,
  sortOption,
  eventTypeCode,
}) {
  yield put(initiateInactivityModal(true));
  try {
    const {
      body: { data, serviceStatus, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('getRegistryRecommendationsSortedByDate'),
      method: 'GET',
      params: {
        registryId,
        tabId,
        sortOption,
        eventTypeCode,
      },
      headers: {
        'atg-rest-depth': '2',
      },
    });

    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchRecommendationsSuccess(data));
    }
    return yield put(fetchRecommendationsError(errorMessages));
  } catch (err) {
    return yield put(fetchRecommendationsError(err.body));
  }
}

export function* setEmailFrequency({ registryId, emailOptionValue }) {
  yield put(initiateInactivityModal(true));
  try {
    yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('EmailFrequency'),
      method: 'POST',
      showLoader: true,
      data: qs.stringify({
        registryId,
        emailOptionValue,
      }),
      headers: {
        'atg-rest-depth': '2',
      },
    });
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

export function* recommendationsSaga() {
  yield takeLatest(FETCH_REGISTRY_RECOMMENDATIONS, getRecommendations);
}

export function* recommenderSummarySaga() {
  yield takeLatest(FETCH_REGISTRY_RECOMMENDER_SUMMARY, getRecommenderSummary);
}

export function* emailFrequencySaga() {
  yield takeLatest(SAVE_EMAIL_FREQUENCY, setEmailFrequency);
}

export function* getRecommendationsSortedByDateSaga() {
  yield takeLatest(
    FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
    getRecommendationsSortedByDate
  );
}

export function* mayBeLater({ payload }) {
  yield put(initiateInactivityModal(true));
  const {
    skuId,
    prodId,
    registryId,
    qty,
    price,
    registryName,
    isCustomizationRequired,
    personalizationType,
    refNum,
    ltlFlag,
    ltlShipMethod,
    porchPayLoadJson,
    isList,
    fromComparisonPage,
    returnURL,
    altNumber,
    isFromPendingTab,
    isDeclined,
    repositoryId,
    skipNotifyFlag,
  } = payload;
  const customerId = yield select(makeSelectCustomerId());
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
      data: qs.stringify({
        jasonCollectionObj: JSON.stringify({
          addItemResults: [
            {
              qty: qty.toString(),
              registryId,
              skuId,
              prodId,
              price,
              isCustomizationRequired,
              personalizationType,
              refNum,
              ltlFlag,
              altNumber,
              ltlShipMethod,
              porchPayLoadJson,
            },
          ],
          parentProdId: prodId,
          registryName,
          repositoryId,
          isList,
          fromComparisonPage,
          returnURL,
          isFromPendingTab,
          isDeclined,
          skipNotifyFlag,
        }),
      }),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(mayBeLaterCallSuccess(data));
    }
    return yield put(mayBeLaterCallError(errorMessages));
  } catch (err) {
    return yield put(mayBeLaterCallError(err.body));
  }
}

export function* mayBeLaterSaga() {
  yield takeLatest(MAY_BE_LATER, mayBeLater);
}

/**
 *
 * @param {string} param0 the required param related to the results expected from the API
 */
export function* blockOrUnblockRecommender(dataObj) {
  const endPoint = '/apis/stateful/v1.0/registry/recommendations/block';
  try {
    const {
      body: { serviceStatus, data, errorMessages },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('socialRecommenderBlock') || endPoint,
      method: 'POST',
      showLoader: true,
      params: dataObj.data,
    });

    if (serviceStatus === 'SUCCESS') {
      yield put(fetchRecommenderSummary(dataObj.data.registryId, '3'));
      return yield put(socialRecommendUserBlockUnblockSuccess(data));
    }

    return yield put(socialRecommendUserBlockUnblockError(errorMessages));
  } catch (err) {
    return yield put(socialRecommendUserBlockUnblockError(err));
  }
}

export function* blockOrUnblockRecommenderSaga() {
  yield takeLatest(
    SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK,
    blockOrUnblockRecommender
  );
}

export default [
  recommendationsSaga,
  recommenderSummarySaga,
  getRecommendationsSortedByDateSaga,
  mayBeLaterSaga,
  emailFrequencySaga,
  blockOrUnblockRecommenderSaga,
];
