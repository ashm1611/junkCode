import { fromJS } from 'immutable';

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

const initialState = fromJS({
  closeEditModal: false,
  isContactAddressModalVisible: false,
  isShippingAddressModalVisible: false,
  isMovingAddressModalVisible: false,
  isFetchingEditRegistryDetails: false,
  isTymTabClicked: false,
  data: {},
  error: null,
  modalEditMount: false,
});

const modalQASState = [
  UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_EDIT_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_EDIT_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_EDIT_REGISTRY,
];

// getting modalState types
const getModalStateType = type => {
  if (modalQASState.indexOf(type) !== -1) {
    return type;
  }
  return null;
};

// This method handle modalQASType state
export const handleModalQASState = (type, state, isAddAddressModalVisible) => {
  switch (type) {
    case UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_EDIT_REGISTRY:
      return state.set(
        'isContactAddressModalVisible',
        isAddAddressModalVisible
      );
    case UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_EDIT_REGISTRY:
      return state.set(
        'isShippingAddressModalVisible',
        isAddAddressModalVisible
      );
    case UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_EDIT_REGISTRY:
      return state.set('isMovingAddressModalVisible', isAddAddressModalVisible);
    default:
      return state;
  }
};

const getEditRegistryDetailsType = type => {
  const editRegistryDetailType = [
    FETCH_EDIT_REGISTRY_DATA,
    FETCH_EDIT_REGISTRY_DATA_SUCCESS,
    FETCH_EDIT_REGISTRY_DATA_ERROR,
    CLEAR_EDIT_REGISTRY_DATA,
    UPDATE_TYM_TAB_CLICK_STATUS,
  ];

  if (editRegistryDetailType.indexOf(type) !== -1) {
    return type;
  }
  return null;
};

// This method handle shipping state
export const handleEditRegistryDetails = (
  type,
  state,
  data,
  error,
  timerFlag,
  openEdit,
  tymClickParam
) => {
  switch (type) {
    case FETCH_EDIT_REGISTRY_DATA:
      if (timerFlag) {
        return state
          .set('isFetchingEditRegistryDetails', true)
          .set('timerInactivity', true);
      }
      if (openEdit) {
        return state
          .set('isFetchingEditRegistryDetails', true)
          .set('modalEditMount', true);
      }
      return state.set('isFetchingEditRegistryDetails', true);

    case FETCH_EDIT_REGISTRY_DATA_SUCCESS:
      return state
        .set('isFetchingEditRegistryDetails', false)
        .set('editRegistryData', data)
        .set('timerInactivity', false)
        .set('isEditModalOpen', true)
        .set('modalEditMount', false);

    case FETCH_EDIT_REGISTRY_DATA_ERROR:
      return state
        .set('isFetchingEditRegistryDetails', false)
        .set('error', error)
        .set('closeEditModal', true)
        .set('timerInactivity', false)
        .set('modalEditMount', false);
    case UPDATE_TYM_TAB_CLICK_STATUS:
      return state.set('isTymTabClicked', tymClickParam);
    case CLEAR_EDIT_REGISTRY_DATA:
      return state
        .set('editRegistryData', null)
        .set('isEditModalOpen', false)
        .set('modalEditMount', false);
    default:
      return state;
  }
};

function EditRegistryDetailReducer(
  state = initialState,
  { type, error, data, isAddAddressVisible, timerFlag, openEdit, tymClickParam }
) {
  switch (type) {
    case getEditRegistryDetailsType(type):
      return handleEditRegistryDetails(
        type,
        state,
        data,
        error,
        timerFlag,
        openEdit,
        tymClickParam
      );
    case getModalStateType(type):
      return handleModalQASState(type, state, isAddAddressVisible);
    default:
      return state;
  }
}

export default EditRegistryDetailReducer;
