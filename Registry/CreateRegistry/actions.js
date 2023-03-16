import { RESET_IC_WELCOME_SCREEN } from '@bbb-app/pure-content/containers/constants';
import {
  FETCH_REG_INPUTS,
  FETCH_REG_INPUTS_SUCCESS,
  FETCH_REG_INPUTS_FAILURE,
  CLEAR_ERROR_STATE,
  CREATE_REG,
  RESET_STORE_DATA,
  CREATE_REG_SUCCESS,
  GET_CO_PROFILE_STATUS,
  GET_CO_PROFILE_STATUS_SUCCESS,
  RESET_CO_PROFILE_STATUS,
  RESET_CO_PROFILE_STATUS_SUCCESS,
  GET_CO_PROFILE_STATUS_FAILURE,
  UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
  UPDATE_PASSWORD_COMPONENT,
  UPDATE_SUBMIT_STATE,
  CLEAR_CREATE_REGISTRY,
  CLEAR_REGISTRY_VER_TYPE,
  FETCH_QUIZ_MODAL,
  CLEAR_QUIZ_MODAL,
  SET_SCROLL_POSITION,
  SET_FORM_REG_TYPE,
} from './constants';
export function fetchRegistryInputs(regType, thirdParty) {
  return {
    type: FETCH_REG_INPUTS,
    regType,
    thirdParty,
  };
}
export function fetchRegistryInputsSuccess(data) {
  return {
    type: FETCH_REG_INPUTS_SUCCESS,
    data,
  };
}
export function fetchRegistryInputsError(error) {
  return {
    type: FETCH_REG_INPUTS_FAILURE,
    error,
  };
}
export function clearErrorState() {
  return {
    type: CLEAR_ERROR_STATE,
  };
}
export function createRegistryDataSuccess(data) {
  return {
    type: CREATE_REG_SUCCESS,
    data,
  };
}
export function createRegistryData(data, thersholdDayForOldRegistry, labels) {
  return {
    type: CREATE_REG,
    data,
    thersholdDayForOldRegistry,
    labels,
  };
}
export function setFormRegType(data) {
  return {
    type: SET_FORM_REG_TYPE,
    data,
  };
}
export function resetStoreDataAction() {
  return {
    type: RESET_STORE_DATA,
  };
}
export function clearCreateRegistry() {
  return {
    type: CLEAR_CREATE_REGISTRY,
  };
}
export function fetchQuizModal(data) {
  return {
    type: FETCH_QUIZ_MODAL,
    data,
  };
}
export function setScroll(data) {
  return {
    type: SET_SCROLL_POSITION,
    data,
  };
}
export function clearQuizModal() {
  return {
    type: CLEAR_QUIZ_MODAL,
  };
}
export function fetchProfileStatus(emailId, showLoader) {
  return {
    type: GET_CO_PROFILE_STATUS,
    emailId,
    showLoader,
  };
}
export function fetchProfileStatusSuccess(data) {
  return {
    type: GET_CO_PROFILE_STATUS_SUCCESS,
    data,
  };
}
export function fetchProfileStatusError(error) {
  return {
    type: GET_CO_PROFILE_STATUS_FAILURE,
    error,
  };
}
export function resetProfileStatus() {
  return {
    type: RESET_CO_PROFILE_STATUS,
  };
}
export function resetProfileStatusSuccess() {
  return {
    type: RESET_CO_PROFILE_STATUS_SUCCESS,
  };
}
export function updateContactAddressModalVisibility(isAddAddressVisible) {
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
    isAddAddressVisible,
  };
}
export function updateShippingAddressModalVisibility(isAddAddressVisible) {
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
    isAddAddressVisible,
  };
}
export function updateMovingAddressModalVisibility(isAddAddressVisible) {
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
    isAddAddressVisible,
  };
}
export function setPassWordError(data) {
  return {
    type: UPDATE_PASSWORD_COMPONENT,
    data,
  };
}
export function updateSubmitState(data) {
  return {
    type: UPDATE_SUBMIT_STATE,
    data,
  };
}
export function resetWelcomeScreenData() {
  return {
    type: RESET_IC_WELCOME_SCREEN,
  };
}
export function clearCreateRegistryVerType() {
  return {
    type: CLEAR_REGISTRY_VER_TYPE,
  };
}
