import {
  FETCH_REGISTRY_QUICK_ADD_ITEMS,
  FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS,
  FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR,
} from './constants';

export function fetchRegistryQuickAddItems(quickAddId, regType) {
  return {
    type: FETCH_REGISTRY_QUICK_ADD_ITEMS,
    quickAddId,
    regType,
  };
}

export function fetchRegistryQuickAddItemsSuccess(data, productsData) {
  return {
    type: FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS,
    data,
    productsData,
  };
}

export function fetchRegistryQuickAddItemsError(error) {
  return {
    type: FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR,
    error,
  };
}
