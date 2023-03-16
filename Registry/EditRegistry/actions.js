import {
  FETCH_EDIT_REGISTRY_DATA,
  FETCH_EDIT_REGISTRY_DATA_SUCCESS,
  FETCH_EDIT_REGISTRY_DATA_ERROR,
  CLEAR_EDIT_REGISTRY_DATA,
  UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_EDIT_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_EDIT_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_EDIT_REGISTRY,
  UPDATE_TYM_TAB_CLICK_STATUS,
} from './constants';

export function fetchEditRegistryData(registryId, timerFlag, openEdit) {
  return {
    type: FETCH_EDIT_REGISTRY_DATA,
    registryId,
    timerFlag,
    openEdit,
  };
}

export function fetchEditRegistryDataSuccess(data) {
  return {
    type: FETCH_EDIT_REGISTRY_DATA_SUCCESS,
    data,
  };
}

export function fetchEditRegistryDataError(error) {
  return {
    type: FETCH_EDIT_REGISTRY_DATA_ERROR,
    error,
  };
}
export function clearEditRegistryData() {
  return {
    type: CLEAR_EDIT_REGISTRY_DATA,
  };
}

export function updateContactAddressModalVisibility(isAddAddressVisible) {
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_EDIT_REGISTRY,
    isAddAddressVisible,
  };
}

export function updateShippingAddressModalVisibility(isAddAddressVisible) {
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_EDIT_REGISTRY,
    isAddAddressVisible,
  };
}

export function updateMovingAddressModalVisibility(isAddAddressVisible) {
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_EDIT_REGISTRY,
    isAddAddressVisible,
  };
}

export function updateTymTabClickStatus(tymClickParam) {
  return {
    type: UPDATE_TYM_TAB_CLICK_STATUS,
    tymClickParam,
  };
}
