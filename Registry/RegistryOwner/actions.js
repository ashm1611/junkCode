import { INITIATE_INACTIVITY_MODAL } from '@bbb-app/actions/registryActions';
import {
  FETCH_REGISTRY_DATA_SUCCESS,
  FETCH_REGISTRY_DATA_ERROR,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_SUCCESS,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_ERROR,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_SUCCESS,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_ERROR,
  REMOVE_REGISTRY_ITEM,
  REMOVE_REGISTRY_ITEM_SUCCESS,
  REMOVE_REGISTRY_ITEM_ERROR,
  UNDO_REMOVE_REGISTRY_ITEM,
  UNDO_REMOVE_REGISTRY_ITEM_SUCCESS,
  UNDO_REMOVE_REGISTRY_ITEM_ERROR,
  MARK_FAV_REGISTRY_ITEM_SUCCESS,
  MARK_FAV_REGISTRY_ITEM_ERROR,
  UPDATE_CATEGORY_DATA,
  MAKE_ACTIVE_REGISTRY_CALL_SUCCESS,
  MAKE_ACTIVE_REGISTRY_CALL_ERROR,
  UPDATE_REMOVE_ITEM_DATA,
  SET_TRACK_FLAG,
  SHOWN_REGISTRY_MYANALYZER_BUTTON,
  SET_FACET_DATA,
  BOPIS_CHECK_BOX,
  REGISTRANT_DETAIL_MODAL,
  GOODY_DETAIL_MODAL,
  EDIT_REGISTRY_FROM_MORE_INFORMATION_BTN,
  SHOW_CHECKLIST,
} from './constants';

export function removeRegistryItemSuccess(data, updatedSkuId) {
  return {
    type: REMOVE_REGISTRY_ITEM_SUCCESS,
    data,
    updatedSkuId,
  };
}

export function removeRegistryItem(productInfo, productData, updatedSkuId) {
  return {
    type: REMOVE_REGISTRY_ITEM,
    productInfo,
    productData,
    updatedSkuId,
  };
}

export function removeRegistryItemError(error, updatedSkuId) {
  return {
    type: REMOVE_REGISTRY_ITEM_ERROR,
    error,
    updatedSkuId,
  };
}

export function undoRemoveRegistryItemSuccess(data, updatedSkuId) {
  return {
    type: UNDO_REMOVE_REGISTRY_ITEM_SUCCESS,
    data,
    updatedSkuId,
  };
}

export function undoRemoveRegistryItem(productInfo, productData, updatedSkuId) {
  return {
    type: UNDO_REMOVE_REGISTRY_ITEM,
    productInfo,
    productData,
    updatedSkuId,
  };
}

export function undoRemoveRegistryItemError(error, updatedSkuId) {
  return {
    type: UNDO_REMOVE_REGISTRY_ITEM_ERROR,
    error,
    updatedSkuId,
  };
}

export function markFavRegistryItemSuccess(data, updatedSkuId) {
  return {
    type: MARK_FAV_REGISTRY_ITEM_SUCCESS,
    data,
    updatedSkuId,
  };
}

export function markFavRegistryItemError(error, updatedSkuId) {
  return {
    type: MARK_FAV_REGISTRY_ITEM_ERROR,
    error,
    updatedSkuId,
  };
}

export function fetchRegistryDataSuccess(data, headers) {
  return {
    type: FETCH_REGISTRY_DATA_SUCCESS,
    data,
    headers,
  };
}

export function fetchRegistryDataError(error) {
  return {
    type: FETCH_REGISTRY_DATA_ERROR,
    error,
  };
}

export function fetchRegistryOwnerItemsFirstCategorySuccess(data, isDateSort) {
  return {
    type: FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_SUCCESS,
    data,
    isDateSort,
  };
}

export function fetchRegistryOwnerItemsFirstCategoryError(error) {
  return {
    type: FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_ERROR,
    error,
  };
}

export function fetchRegistryOwnerRemainingCategory(
  registryId,
  eventTypeCode,
  eventDate,
  isDateSort,
  isRegReplace,
  params
) {
  /* istanbul ignore next */
  return {
    type: FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
    registryId,
    eventTypeCode,
    eventDate,
    isDateSort,
    isRegReplace,
    params,
  };
}

export function fetchRegistryOwnerRemainingCategorySuccess(
  data,
  isDateSort,
  isRegReplace
) {
  return {
    type: FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_SUCCESS,
    data,
    isDateSort,
    isRegReplace,
  };
}

export function fetchRegistryOwnerRemainingCategoryError(error) {
  return {
    type: FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_ERROR,
    error,
  };
}

export function getUpdatedCategoryData(productObj, updatedSkuId) {
  return {
    type: UPDATE_CATEGORY_DATA,
    productObj,
    updatedSkuId,
  };
}

export function activeRegistryCallSuccess() {
  return {
    type: MAKE_ACTIVE_REGISTRY_CALL_SUCCESS,
  };
}

export function activeRegistryCallError(error) {
  return {
    type: MAKE_ACTIVE_REGISTRY_CALL_ERROR,
    error,
  };
}

export function updateRemoveItemData(
  requestedQuantity,
  purchasedQuantity,
  isUndoItem
) {
  return {
    type: UPDATE_REMOVE_ITEM_DATA,
    requestedQuantity,
    purchasedQuantity,
    isUndoItem,
  };
}

export function setTrackFlag(value) {
  return {
    type: SET_TRACK_FLAG,
    value,
  };
}

// import this function if your saga is already injected
// otherwise import it from RegistryDetailsSagaInjection.js
export function initiateInactivityModal(inactivityModalState) {
  return {
    type: INITIATE_INACTIVITY_MODAL,
    inactivityModalState,
  };
}

// import this function if your saga is already injected
// otherwise import it from RegistryDetailsSagaInjection.js
export function shownRegistryMyAnalyzerBtn(hasShown = false) {
  return {
    type: SHOWN_REGISTRY_MYANALYZER_BUTTON,
    hasShown,
  };
}

export function setFacetData(data) {
  return {
    type: SET_FACET_DATA,
    data,
  };
}

export function updateBopisCheckBoxState(data) {
  return {
    type: BOPIS_CHECK_BOX,
    data,
  };
}

export function setShowChecklist(data) {
  return {
    type: SHOW_CHECKLIST,
    data,
  };
}

export function openRegistrantDetailModal(isRegistrantModalOpen, data) {
  return {
    type: REGISTRANT_DETAIL_MODAL,
    isRegistrantModalOpen,
    data,
  };
}

export function openGoodyBoxModalOpen(isGoodyBoxModalOpen) {
  return {
    type: GOODY_DETAIL_MODAL,
    isGoodyBoxModalOpen,
  };
}

export function editRegistryFromMoreInformationBtn(isEditRegistry) {
  return {
    type: EDIT_REGISTRY_FROM_MORE_INFORMATION_BTN,
    isEditRegistry,
  };
}
