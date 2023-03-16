import {
  INITIATE_INACTIVITY_MODAL,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
  ADD_REGISTRY_FROM_QUICKADD,
  UPDATE_GIFT_DATA,
  UPDATE_DASHBOARD_DATA,
} from './RegistryOwnerConstants';

// import this function if your saga is already injected
// otherwise import it from RegistryDetailsSagaInjection.js
export function initiateInactivityModal(inactivityModalState) {
  return {
    type: INITIATE_INACTIVITY_MODAL,
    inactivityModalState,
  };
}

export function updatedRegistryFromQuickAddAction() {
  return {
    type: ADD_REGISTRY_FROM_QUICKADD,
  };
}
export function fetchRegistryOwnerItemsFirstCategoryAction(
  registryId,
  eventTypeCode,
  eventDate,
  isDateSort,
  isRegReplace,
  printView,
  params
) {
  return {
    type: FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
    registryId,
    eventTypeCode,
    eventDate,
    isDateSort,
    isRegReplace,
    printView,
    params,
  };
}

export function updateGiftDataAction(
  updateGiftRegistered,
  updateGiftPurchased
) {
  return {
    type: UPDATE_GIFT_DATA,
    updateGiftRegistered,
    updateGiftPurchased,
  };
}

export function updateDashboardDataAction(updatedQuantity) {
  /* istanbul ignore next */
  return {
    type: UPDATE_DASHBOARD_DATA,
    updatedQuantity,
  };
}
