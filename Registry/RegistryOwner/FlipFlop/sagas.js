import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getCountryCurrencyValue } from '@bbb-app/utils/countryCurrencyUtils';
import { isBrowser } from '@bbb-app/utils/common';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import getCurrentSiteId from '@bbb-app/utils/getCurrentSiteId';
import { getApolloApiUrls } from '@bbb-app/selectors/pageSelectors';
import consoleLog from '@bbb-app/utils/logger';
import {
  getFlipFlopDataSuccess,
  getFlipFlopDataError,
  setFlipFlopCookie,
  getFlipFlopData,
} from './actions';
import { DEFAULT_ERROR_MESSAGE } from '../constants';
import {
  GET_FLIP_FLOP_DATA,
  FLIP_FLOP_COOKIE,
  FLIP_FLOP_ALL_CATEGORIES,
} from './constants';
import setCookieWithExpiry from '../../../../../utils/setCookieWithExpiry';

/**
 * Get Registry Flip Flop Data
 * @param {start} object - object of product information
 */
export function* getFlipFlopDataFunc({
  start,
  rows,
  query,
  errorMessages,
  flipFlopCookieExpiryDays,
  regType,
  otherPayload,
  isGroupByFlipFlopEnable,
}) {
  try {
    const apolloEndPoints = yield select(getApolloApiUrls);
    const url = isGroupByFlipFlopEnable
      ? apolloEndPoints.get('plpGroupBy')
      : apolloEndPoints.get('productSearch');

    const { thresholdAPITrigger, selectedCategory } = otherPayload;
    const paramsData = {
      start,
      q: query,
      rows,
      site: getCurrentSiteId(),
      wt: 'json',
      currencyCode: getCountryCurrencyValue(true),
      country: getCountryCurrencyValue(),
      noFacet: true,
      isBrowser: isBrowser(),
    };
    if (selectedCategory !== FLIP_FLOP_ALL_CATEGORIES) {
      paramsData.fq = selectedCategory;
    }
    if (isGroupByFlipFlopEnable) {
      paramsData.rT = 'xtCompat';
    }
    const { body: apiResponse } = yield call(ServiceUtil.triggerServerRequest, {
      url,
      method: 'GET',
      params: paramsData,
    });

    const { response: flipFlopData } = apiResponse;
    const { docs, numFound } = flipFlopData;
    let nextIndexFlipFlop = +start + +rows;
    const flipFlopCookieName = `${FLIP_FLOP_COOKIE}${regType}`;
    if (numFound && docs.length === 0) {
      const randomNumberGenerated = generateRandomIndexNumber(
        selectedCategory,
        numFound
      );
      return yield put(
        getFlipFlopData(
          randomNumberGenerated,
          rows,
          query,
          errorMessages,
          flipFlopCookieExpiryDays,
          regType,
          otherPayload
        )
      );
    }
    if (numFound && docs.length > 0) {
      let itemsCountLow = false;
      if (nextIndexFlipFlop > numFound) {
        nextIndexFlipFlop = 0;
      }
      if (numFound <= rows) {
        itemsCountLow = true;
      }
      yield put(
        getFlipFlopDataSuccess(
          numFound,
          docs,
          thresholdAPITrigger,
          regType,
          itemsCountLow,
          isGroupByFlipFlopEnable
        )
      );
      if (!selectedCategory || selectedCategory === FLIP_FLOP_ALL_CATEGORIES) {
        setCookieWithExpiry(
          flipFlopCookieName,
          nextIndexFlipFlop,
          flipFlopCookieExpiryDays,
          '/'
        );
      }
      return yield put(
        setFlipFlopCookie(nextIndexFlipFlop, regType, selectedCategory)
      );
    }
    consoleLog.error(errorMessages);
    return yield put(getFlipFlopDataError(errorMessages));
  } catch (err) {
    consoleLog.error(err);
    return yield put(getFlipFlopDataError(DEFAULT_ERROR_MESSAGE));
  }
}

function generateRandomIndexNumber(selectedCategory, numFound) {
  let randomNumberGenerated = 0;
  if (!selectedCategory || selectedCategory === FLIP_FLOP_ALL_CATEGORIES) {
    randomNumberGenerated = Math.floor(Math.random() * (+numFound - 0 + 1) + 0);
  }
  return randomNumberGenerated;
}

export function* getFlipFlopDataSaga() {
  yield takeLatest(GET_FLIP_FLOP_DATA, getFlipFlopDataFunc);
}

export default [getFlipFlopDataSaga];
