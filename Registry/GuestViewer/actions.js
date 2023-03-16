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

export function setBuyOffContext(registryId) {
  return {
    type: SET_BUYOFF_CONTEXT,
    registryId,
  };
}

export function setBuyOffContextValue(data) {
  return {
    type: SET_BUYOFF_CONTEXT_VALUE,
    data,
  };
}

export function setBuyOffContextError(error) {
  return {
    type: SET_BUYOFF_CONTEXT_ERROR,
    error,
  };
}

export function copyRegistry(payload) {
  return {
    type: COPY_REGISTRY,
    payload,
  };
}

export function fetchCopyRegistrySuccess(data, serviceStatus) {
  return {
    type: FETCH_COPY_REGISTRY_SUCCESS,
    data,
    serviceStatus,
  };
}

export function fetchCopyRegistryError(error) {
  return {
    type: FETCH_COPY_REGISTRY_ERROR,
    error,
  };
}

export function fetchRegistryFirstCategory(
  evtDate,
  regId,
  regCode,
  isDateSort,
  wcref,
  wcsid,
  params
) {
  return {
    type: FETCH_FIRST_CATEGORY,
    evtDate,
    regId,
    regCode,
    isDateSort,
    wcref,
    wcsid,
    ...params,
  };
}

export function resetResponse() {
  return {
    type: RESET_COPY_REGISTRY_RESPONSE,
  };
}

export function fetchFirstCategorySuccess(data, isDateSort) {
  return {
    type: FETCH_FIRST_CATEGORY_SUCCESS,
    data,
    isDateSort,
  };
}

export function fetchFirstCategoryError(error) {
  return {
    type: FETCH_FIRST_CATEGORY_ERROR,
    error,
  };
}

export function fetchRegistryOtherCategories(
  evtDate,
  regId,
  isDateSort,
  params
) {
  return {
    type: FETCH_OTHER_CATEGORIES,
    evtDate,
    regId,
    isDateSort,
    ...params,
  };
}

export function fetchRegistryOtherCategoriesSuccess(data, isDateSort) {
  return {
    type: FETCH_OTHER_CATEGORIES_SUCCESS,
    data,
    isDateSort,
  };
}

export function fetchRegistryOtherCategoriesError(error) {
  return {
    type: FETCH_OTHER_CATEGORIES_ERROR,
    error,
  };
}

export function fetchRegistryOosCategories(evtDate, regId, isDateSort, params) {
  return {
    type: FETCH_OOS_CATEGORIES,
    evtDate,
    regId,
    isDateSort,
    ...params,
  };
}

export function fetchRegistryOosCategoriesSuccess(data, isDateSort) {
  return {
    type: FETCH_OOS_CATEGORIES_SUCCESS,
    data,
    isDateSort,
  };
}

export function fetchRegistryOosCategoriesError(error) {
  return {
    type: FETCH_OOS_CATEGORIES_ERROR,
    error,
  };
}

export function resetIsItemsFetchingStatus() {
  return {
    type: RESET_IS_ITEM_FETCHING,
  };
}

export function updateBopisCheckBoxState(data) {
  return {
    type: BOPIS_CHECK_BOX,
    data,
  };
}
export function setFacetData(data) {
  return {
    type: SET_FACET_DATA,
    data,
  };
}
