import {
  GET_FLIP_FLOP_DATA_SUCCESS,
  GET_FLIP_FLOP_DATA_ERROR,
  GET_FLIP_FLOP_DATA,
  SET_FLIP_FLOP_COOKIE,
  DELETE_FLIP_FLOP_DATA,
  SET_LOW_ITEMS_COUNT,
} from './constants';

/* eslint max-params: ["error", 8]*/
export function getFlipFlopData(
  start,
  rows,
  query,
  errorMessages,
  flipFlopCookieExpiryDays,
  regType,
  otherPayload,
  isGroupByFlipFlopEnable
) {
  return {
    type: GET_FLIP_FLOP_DATA,
    start,
    rows,
    query,
    errorMessages,
    flipFlopCookieExpiryDays,
    regType,
    otherPayload,
    isGroupByFlipFlopEnable,
  };
}

export function getFlipFlopDataSuccess(
  totalItemsCount,
  flipFlopItemsList,
  thresholdAPITrigger,
  regType,
  isItemsCountLow,
  isGroupByFlipFlopEnable
) {
  return {
    type: GET_FLIP_FLOP_DATA_SUCCESS,
    totalItemsCount,
    flipFlopItemsList,
    thresholdAPITrigger,
    regType,
    isItemsCountLow,
    isGroupByFlipFlopEnable,
  };
}

export function getFlipFlopDataError(errorMsg) {
  return {
    type: GET_FLIP_FLOP_DATA_ERROR,
    errorMsg,
  };
}

export function setFlipFlopCookie(nextIndex, regType, selectedCategory) {
  return {
    type: SET_FLIP_FLOP_COOKIE,
    nextIndex,
    regType,
    selectedCategory,
  };
}

export function deleteFlipFlopData(countOfItemsViewed) {
  return {
    type: DELETE_FLIP_FLOP_DATA,
    countOfItemsViewed,
  };
}

export function setIsItemsCountLow(isItemsCountLow) {
  return {
    type: SET_LOW_ITEMS_COUNT,
    isItemsCountLow,
  };
}
