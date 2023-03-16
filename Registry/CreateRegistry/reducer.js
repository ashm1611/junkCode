import { fromJS } from 'immutable';
import pathOr from 'lodash/fp/pathOr';
import {
  FETCH_REG_INPUTS,
  FETCH_REG_INPUTS_SUCCESS,
  FETCH_REG_INPUTS_FAILURE,
  CLEAR_ERROR_STATE,
  CREATE_REG,
  CREATE_REG_SUCCESS,
  GET_CO_PROFILE_STATUS,
  GET_CO_PROFILE_STATUS_FAILURE,
  GET_CO_PROFILE_STATUS_SUCCESS,
  RESET_CO_PROFILE_STATUS,
  UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
  CLEAR_REGISTRY_RESPONSE,
  UPDATE_PASSWORD_COMPONENT,
  UPDATE_SUBMIT_STATE,
  CLEAR_CREATE_REGISTRY,
  RESET_STORE_DATA,
  CLEAR_REGISTRY_VER_TYPE,
  FETCH_QUIZ_MODAL,
  CLEAR_QUIZ_MODAL,
  SET_SCROLL_POSITION,
  SET_FORM_REG_TYPE,
} from './constants';
const initialState = fromJS({
  isFetching: false,
  error: null,
  regInputs: null,
  registryId: null,
  createRegistryModalPopUp: false,
  regTypeFormData: null,
  coRegProfileStatus: null,
  isContactAddressModalVisible: false,
  isShippingAddressModalVisible: false,
  isMovingAddressModalVisible: false,
  passwordError: true,
  confirmPasswordError: true,
  submitCalled: false,
  emailVerReq: false,
  verificationType: null,
  phoneLast4Digits: null,
  takeOurQuiz: false,
  isFetchingCreateRegCall: false,
  scrollPosition: 0,
  skipRegistryPosition: 0,
});
// This method handle regInputCreateType state
/* eslint complexity: ["error", 15]*/
const handleRegInputCreate = (type, state, data, error) => {
  switch (type) {
    case FETCH_REG_INPUTS:
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('regInputs', null)
        .set('registryId', null)
        .set('emailVerReq', false);
    case CREATE_REG:
      return state
        .set('createRegistryModalPopUp', true)
        .set('isFetchingCreateRegCall', true)
        .set(
          'regTypeFormData',
          data['registryVO.registryType.registryTypeName']
        )
        .set('takeOurQuiz', false)
        .set('error', null)
        .set('registryId', null);
    case SET_FORM_REG_TYPE:
      return state.set('regTypeFormData', data);
    case RESET_STORE_DATA:
      return state.set('emailVerReq', false).set('registryId', null);
    case FETCH_REG_INPUTS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('regInputs', data)
        .set('registryId', null);
    case FETCH_REG_INPUTS_FAILURE:
      return state
        .set('isFetching', false)
        .set('isFetchingCreateRegCall', false)
        .set('error', error)
        .set('registryId', null);
    case CLEAR_ERROR_STATE:
      return state.set('error', null);
    case CREATE_REG_SUCCESS:
      return state
        .set('error', null)
        .set('regInputs', null)
        .set('createRegistryModalPopUp', true)
        .set('isFetchingCreateRegCall', false)
        .set('takeOurQuiz', false)
        .set('registryId', data)
        .set('emailVerReq', pathOr('', 'component.emailVerReq', data))
        .set('verificationType', pathOr('', 'component.verificationType', data))
        .set(
          'phoneLast4Digits',
          pathOr(null, 'component.phoneLast4Digits', data)
        )
        .set('userCreated', pathOr(false, 'component.userCreated', data));
    case CLEAR_REGISTRY_RESPONSE:
      return state.set('registryId', null).set('emailVerReq', false);
    case CLEAR_CREATE_REGISTRY:
      return state
        .set('createRegistryModalPopUp', false)
        .set('takeOurQuiz', false)
        .set('emailVerReq', false);
    case FETCH_QUIZ_MODAL:
      return state
        .set('createRegistryModalPopUp', true)
        .set('takeOurQuiz', true)
        .set('scrollPosition', data);
    case SET_SCROLL_POSITION:
      return state.set('skipRegistryPosition', data);
    case CLEAR_QUIZ_MODAL:
      return state.set('takeOurQuiz', false);
    case CLEAR_REGISTRY_VER_TYPE:
      return state
        .set('verificationType', null)
        .set('phoneLast4Digits', null)
        .set('userCreated', false);
    default:
      return handleCoReg(type, state, data, error);
  }
};
// This method handle regInputCreateType state
const handleCoReg = (type, state, data, error) => {
  switch (type) {
    case GET_CO_PROFILE_STATUS:
      return state
        .set('isProfileStatusFetching', true)
        .set('profileStatusError', null)
        .set('coRegProfileStatus', null);
    case GET_CO_PROFILE_STATUS_SUCCESS:
      return state
        .set('isProfileStatusFetching', false)
        .set('profileStatusError', null)
        .set('coRegProfileStatus', data);
    case GET_CO_PROFILE_STATUS_FAILURE:
      return state
        .set('isProfileStatusFetching', false)
        .set('profileStatusError', error)
        .set('coRegProfileStatus', null);
    case RESET_CO_PROFILE_STATUS:
      return state
        .set('isProfileStatusFetching', false)
        .set('profileStatusError', null)
        .set('coRegProfileStatus', null);
    default:
      return state;
  }
};
// This method handle modalQASType state
const handleModalQASState = (
  type,
  state,
  isAddAddressModalVisible,
  data,
  error
) => {
  switch (type) {
    case UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY:
      return state.set(
        'isContactAddressModalVisible',
        isAddAddressModalVisible
      );
    case UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY:
      return state.set(
        'isShippingAddressModalVisible',
        isAddAddressModalVisible
      );
    case UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY:
      return state.set('isMovingAddressModalVisible', isAddAddressModalVisible);
    default:
      return handleRegInputCreate(type, state, data, error);
  }
};
function registryInputReducer(
  state = initialState,
  { type, error, data, isAddAddressVisible }
) {
  switch (type) {
    case UPDATE_PASSWORD_COMPONENT:
      return state
        .set('passwordError', data.passwordError)
        .set('confirmPasswordError', data.confirmPasswordError);
    case UPDATE_SUBMIT_STATE:
      return state.set('submitCalled', data).set('emailVerReq', false);
    default:
      return handleModalQASState(type, state, isAddAddressVisible, data, error);
  }
}
export default registryInputReducer;
