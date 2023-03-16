import {
  SET_QUICK_PICKS_COLLECTION,
  FETCH_QUICK_PICKS_COLLECTION_ERROR,
  ADD_SELECTED_ITEMS_TO_REGISTRY,
  SELECT_PRODUCTS,
  ADD_ITEM_ACTIVE_REGISTRY,
  SET_TOAST_NOTIFICATION,
  DISPLAY_TOAST_NOTIFICATION,
  UPDATE_PRODUCT_QTY,
  FETCH_QUICK_PICKS_COLLECTION,
  RESET_QUICK_PICKS_COLLECTION,
} from './constants';

export const fetchQuickPicksCollection = (
  args,
  pageName,
  search,
  state,
  siteId
) => ({
  type: FETCH_QUICK_PICKS_COLLECTION,
  args,
  pageName,
  state,
  siteId,
});

export const setQuickPicksCollection = payload => ({
  type: SET_QUICK_PICKS_COLLECTION,
  payload,
});

export const fetchQuickPicksCollectionError = error => ({
  type: FETCH_QUICK_PICKS_COLLECTION_ERROR,
  error,
});

export const addSelectedItemsToRegistry = payload => ({
  type: ADD_SELECTED_ITEMS_TO_REGISTRY,
  payload,
});

export const selectProducts = payload => ({
  type: SELECT_PRODUCTS,
  payload,
});

export const addItemToActiveRegistry = payload => ({
  type: ADD_ITEM_ACTIVE_REGISTRY,
  payload,
});

export const setToastNotification = payload => ({
  type: SET_TOAST_NOTIFICATION,
  payload,
});

export const displayToastNotification = payload => ({
  type: DISPLAY_TOAST_NOTIFICATION,
  payload,
});

export const updateProductQty = payload => ({
  type: UPDATE_PRODUCT_QTY,
  payload,
});

export const resetQuickPicksCollection = () => ({
  type: RESET_QUICK_PICKS_COLLECTION,
});
