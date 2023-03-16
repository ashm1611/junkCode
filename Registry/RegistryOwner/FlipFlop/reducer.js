/* eslint complexity: ["error", 11]*/

import { fromJS, Map } from 'immutable';
import {
  SET_FLIP_FLOP_COOKIE,
  GET_FLIP_FLOP_DATA_ERROR,
  GET_FLIP_FLOP_DATA_SUCCESS,
  GET_FLIP_FLOP_DATA,
  DELETE_FLIP_FLOP_DATA,
  SET_LOW_ITEMS_COUNT,
} from './constants';

import FlipflopUtil from './FlipflopUtil';

const initialState = fromJS({
  isItemsFetching: false,
  flipFlopItemsList: null,
  totalItemsCount: 0,
  errorMsg: null,
  flipFlopCookieCountInStore: null,
  regType: null,
  flipFlopSelectedCategories: null,
  isItemsCountLow: false,
});

export function FlipFlopReducer(
  state = initialState,
  {
    type,
    flipFlopItemsList,
    errorMsg,
    totalItemsCount,
    thresholdAPITrigger,
    countOfItemsViewed,
    regType,
    isItemsCountLow,
    isGroupByFlipFlopEnable,
  }
) {
  let arrFlipFlopItemsListData = [];
  let arrFlipFlopItemsList = [];
  const isFlipFlopEnabledInStore = true;

  switch (type) {
    case GET_FLIP_FLOP_DATA:
      return state.set('isItemsFetching', true);
    case GET_FLIP_FLOP_DATA_SUCCESS:
      arrFlipFlopItemsListData = state.get('flipFlopItemsList');
      arrFlipFlopItemsList = FlipflopUtil.getFilteredDataFlipFlop({
        flipFlopItemsList,
        arrFlipFlopItemsListData,
        isFlipFlopEnabledInStore,
        thresholdAPITrigger,
        isGroupByFlipFlopEnable,
      });
      return state
        .set('flipFlopItemsList', fromJS(arrFlipFlopItemsList))
        .set('isItemsFetching', false)
        .set('totalItemsCount', totalItemsCount)
        .set('regType', regType)
        .set('isItemsCountLow', isItemsCountLow);
    case GET_FLIP_FLOP_DATA_ERROR:
      return state.set('isItemsFetching', false).set('errorMsg', errorMsg);
    case DELETE_FLIP_FLOP_DATA:
      arrFlipFlopItemsList = state.get('flipFlopItemsList');
      arrFlipFlopItemsList = arrFlipFlopItemsList.toJS();
      arrFlipFlopItemsList.splice(0, countOfItemsViewed);
      return state.set('flipFlopItemsList', fromJS(arrFlipFlopItemsList));
    default:
      return state;
  }
}

function FlipFlopReducerExtn(
  state = initialState,
  {
    type,
    flipFlopItemsList,
    errorMsg,
    totalItemsCount,
    nextIndex,
    thresholdAPITrigger,
    countOfItemsViewed,
    regType,
    selectedCategory,
    isItemsCountLow,
    isGroupByFlipFlopEnable,
  }
) {
  let flipFlopSelectedCategory;
  let newFlipFlopSelectedCategory;
  let newArrCookieInStore;
  let arrCookieInStore = [];
  switch (type) {
    case SET_FLIP_FLOP_COOKIE:
      flipFlopSelectedCategory =
        state.get('flipFlopSelectedCategories') || new Map();
      newFlipFlopSelectedCategory = flipFlopSelectedCategory.set(
        regType,
        selectedCategory
      );

      arrCookieInStore = state.get('flipFlopCookieCountInStore') || new Map();
      newArrCookieInStore = arrCookieInStore.set(
        `${selectedCategory}_${regType}`,
        nextIndex
      );

      return state
        .set('flipFlopCookieCountInStore', newArrCookieInStore)
        .set('flipFlopSelectedCategories', newFlipFlopSelectedCategory);

    case SET_LOW_ITEMS_COUNT:
      return state.set('isItemsCountLow', isItemsCountLow);

    default:
      return FlipFlopReducer(state, {
        type,
        flipFlopItemsList,
        errorMsg,
        totalItemsCount,
        nextIndex,
        thresholdAPITrigger,
        countOfItemsViewed,
        regType,
        isItemsCountLow,
        isGroupByFlipFlopEnable,
      });
  }
}

export default FlipFlopReducerExtn;
