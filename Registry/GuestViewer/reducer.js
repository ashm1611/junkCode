import { fromJS } from 'immutable';

import {
  COPY_REGISTRY,
  FETCH_COPY_REGISTRY_SUCCESS,
  FETCH_COPY_REGISTRY_ERROR,
  RESET_COPY_REGISTRY_RESPONSE,
  FETCH_FIRST_CATEGORY,
  FETCH_FIRST_CATEGORY_SUCCESS,
  FETCH_FIRST_CATEGORY_ERROR,
  FETCH_OTHER_CATEGORIES_ERROR,
  FETCH_OTHER_CATEGORIES_SUCCESS,
  FETCH_OTHER_CATEGORIES,
  FETCH_OOS_CATEGORIES_ERROR,
  FETCH_OOS_CATEGORIES_SUCCESS,
  FETCH_OOS_CATEGORIES,
  SET_BUYOFF_CONTEXT,
  SET_BUYOFF_CONTEXT_VALUE,
  SET_BUYOFF_CONTEXT_ERROR,
  RESET_IS_ITEM_FETCHING,
  BOPIS_CHECK_BOX,
  SET_FACET_DATA,
} from './constants';

const buyoffContextInitialState = fromJS({
  isFetching: true,
  error: null,
  buyOffContext: null,
});

export function BuyOffContextReducer(
  state = buyoffContextInitialState,
  { type, error, data }
) {
  switch (type) {
    case SET_BUYOFF_CONTEXT:
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('buyOffContext', null);
    case SET_BUYOFF_CONTEXT_VALUE:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('buyOffContext', data);
    case SET_BUYOFF_CONTEXT_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('buyOffContext', null);
    default:
      return state;
  }
}

const giftGiverInitialState = fromJS({
  isFetching: false,
  isFetchingFirst: true,
  isFetchingRemaining: true,
  isFetchingOos: true,
  data: {},
  firstCategorydata: null,
  oosCategoryData: null,
  error: null,
  errorOos: null,
  sortedData: null,
});

/* eslint-disable */
export function GiftGiverReducer(
  stateParam,
  { type, error, data, isDateSort }
) {
  const state =
    typeof stateParam === 'undefined' ? giftGiverInitialState : stateParam;
  let arr = [];
  switch (type) {
    case FETCH_FIRST_CATEGORY:
      return state.set('isFetchingFirst', true).set('isFilterItemReady', true);
    case FETCH_OTHER_CATEGORIES:
      return state
        .set('isFetchingRemaining', true)
        .set('isSocialAnnexReady', true);
    case FETCH_FIRST_CATEGORY_SUCCESS:
      if (data.categoryBuckets) {
        arr.push(data.categoryBuckets);
      }
      if (isDateSort) {
        return state
          .set('isFetchingFirst', false)
          .set('dateSortedfirstCategorydata', fromJS(arr))
          .set('giftRegistered', data.giftRegistered)
          .set('giftPurchased', data.giftPurchased)
          .set('tnGiftsPurchased', data.tnGiftsPurchased)
          .set('diaperFundEnabled', data.diaperFundEnabled)
          .set('storedValueOptIn', data.storedValueOptin)
          .set('registryTypeName', data.registryTypeName);
      }

      return state
        .set('isFetchingFirst', false)
        .set('tnGiftsPurchased', data.tnGiftsPurchased)
        .set('showStartBrowsing', data.showStartBrowsing)
        .set('firstCategorydata', fromJS(arr));

    case FETCH_FIRST_CATEGORY_ERROR:
      return state
        .set('isFetchingFirst', false)
        .set('isFetchingRemaining', false)
        .set('isFetchingOos', false)
        .set('error', error)
        .set('isSocialAnnexReady', true);
    case FETCH_OTHER_CATEGORIES_ERROR:
      return state
        .set('isFetchingRemaining', false)
        .set('error', error)
        .set('isSocialAnnexReady', true);
    case FETCH_OTHER_CATEGORIES_SUCCESS:
      if (isDateSort) {
        arr = state.get('dateSortedfirstCategorydata').toJS();
        let arrDate = arr[0].registryItemList;
        if (data.remainingCategoryBuckets[0]) {
          arrDate = arr[0].registryItemList.concat(
            Object.values(data.remainingCategoryBuckets[0].registryItemList)
          );
        }
        arr[0].registryItemList = arrDate;
      } else {
        arr = state.get('firstCategorydata').toJS();
        arr = arr.concat(Object.values(data.remainingCategoryBuckets));
      }

      if (isDateSort) {
        return state
          .set('isFetchingRemaining', false)
          .set('isFilterItemReady', true)
          .set('dateSortedfirstCategorydata', fromJS(arr));
      }

      return state
        .set('isFetchingRemaining', false)
        .set('firstCategorydata', fromJS(arr));

    case FETCH_OOS_CATEGORIES:
      return state.set('isFetchingOos', true);
    case FETCH_OOS_CATEGORIES_SUCCESS:
      if (isDateSort) {
        return state
          .set('isFetchingOos', false)
          .set('isFetchingRemaining', false)
          .set('isFetchingFirst', false)
          .set('dateSortedOosCategorydata', data);
      }
      return state
        .set('isFetchingOos', false)
        .set('isFetchingRemaining', false)
        .set('isFetchingFirst', false)
        .set('oosCategoryData', data);
    case FETCH_OOS_CATEGORIES_ERROR:
      return state
        .set('isFetchingOos', false)
        .set('isFetchingRemaining', false)
        .set('isFetchingFirst', false)
        .set('errorOos', error);
    case RESET_IS_ITEM_FETCHING:
      return state
        .set('isFetching', false)
        .set('isFetchingRemaining', true)
        .set('isFetchingFirst', true)
        .set('data', null)
        .set('firstCategorydata', null)
        .set('oosCategoryData', null);
    case BOPIS_CHECK_BOX:
      return state.set('checkBoxState', data);
    case SET_FACET_DATA:
      return state.set('facetsData', data);
    default:
      return state;
  }
}

const initialState = fromJS({
  isFetching: true,
  error: null,
  data: {},
});
/**
 * @param {object} [state=initialState]
 * @param {object} { type, error, data }
 * @returns the updated state
 */
function CopyRegistryReducer(
  state = initialState,
  { type, error, data, serviceStatus }
) {
  switch (type) {
    case COPY_REGISTRY:
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('data', null);
    case FETCH_COPY_REGISTRY_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', data)
        .set('serviceStatus', serviceStatus);
    case FETCH_COPY_REGISTRY_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('data', null);
    case RESET_COPY_REGISTRY_RESPONSE:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', null);
    default:
      return state;
  }
}

export default CopyRegistryReducer;
