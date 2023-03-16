/* eslint complexity: ["error", 27]*/

/*
  The above eslint config should be removed after
  decreasing the complexity of RegistryDetailReducer to under 12.
  Added temporarily as BBBFEO-14605 was gated due to it.
*/

import { fromJS } from 'immutable';
import { isEmpty } from 'lodash';
import { INITIATE_INACTIVITY_MODAL } from '@bbb-app/actions/registryActions';
import {
  FETCH_REGISTRY_DATA,
  FETCH_REGISTRY_DATA_SUCCESS,
  FETCH_REGISTRY_DATA_ERROR,
  FETCH_TYM_DATA,
  FETCH_TYM_DATA_SUCCESS,
  FETCH_TYM_DATA_ERROR,
  SHOWN_REGISTRY_MYANALYZER_BUTTON,
  UPDATE_GIFT_DATA,
  CLEAR_REGISTRY_DATA_SERVER,
  FETCH_REGISTRY_DATA_SERVER,
  UPDATE_DASHBOARD_DATA,
  CLOSE_OTHERMODAL_INACTIVITYMODAL,
  MAKE_ACTIVE_REGISTRY_CALL_SUCCESS,
  MAKE_ACTIVE_REGISTRY_CALL_ERROR,
  MAKE_ACTIVE_REGISTRY_CALL,
  UPDATE_REMOVE_ITEM_DATA,
  UPDATE_FILTER_COUNT,
  SET_TRACK_FLAG,
  UPDATE_RBYR_OPT_IN,
  UPDATE_GROUP_GIFT_OPT_IN,
  EDIT_REGISTRY_FROM_MORE_INFORMATION_BTN,
  SHOW_CHECKLIST,
} from './constants';

const initialState = fromJS({
  hasShownAnalyzerBtn: false,
  isFetching: true,
  data: {},
  error: null,
  remainingCategoryError: null,
  tymData: {},
  isContactAddressModalVisible: false,
  isShippingAddressModalVisible: false,
  isMovingAddressModalVisible: false,
  activeRegistryCallFlag: false,
  filterCount: 0,
  trackFlag: false,
  regResponse: null,
  isEditRegistryFromMoreInfoBtn: false,
  showChecklist: null,
});

let registryData;
let giftRegistered;
let giftPurchased;
let updatedDashboardquantity;
let filterCountValue;
let regDetails;
let giftTotalPurchased;
let giftTotalRemaining;

const RBYROptnInState = (state, isOptIn) => {
  regDetails = state.get('data', {});
  if (regDetails && Object.keys(regDetails).length) {
    regDetails.registryResVO.registrySummaryVO.storedValueOptIn = isOptIn;
    return regDetails;
  }
  return null;
};

const groupGiftOptnInState = (state, isGroupGiftOptIn) => {
  regDetails = state.get('data', {});
  if (regDetails && Object.keys(regDetails).length) {
    regDetails.registryResVO.registrySummaryVO.groupGiftOptIn = isGroupGiftOptIn;
    return regDetails;
  }
  return null;
};

const handleUpdateRegistryQtyData = (
  requestedQuantity,
  purchasedQuantity,
  isUndoItem
) => {
  giftRegistered = isUndoItem
    ? Number(registryData.registryResVO.registrySummaryVO.giftRegistered) +
      Number(requestedQuantity)
    : Number(registryData.registryResVO.registrySummaryVO.giftRegistered) -
      Number(requestedQuantity);
  giftPurchased = isUndoItem
    ? Number(registryData.registryResVO.registrySummaryVO.giftPurchased) +
      Number(purchasedQuantity)
    : Number(registryData.registryResVO.registrySummaryVO.giftPurchased) -
      Number(purchasedQuantity);
  giftTotalPurchased = isUndoItem
    ? Number(registryData.registryResVO.registrySummaryVO.giftTotalPurchased) +
      Number(purchasedQuantity)
    : Number(registryData.registryResVO.registrySummaryVO.giftTotalPurchased) -
      Number(purchasedQuantity);
  giftTotalRemaining = isUndoItem
    ? Number(registryData.registryResVO.registrySummaryVO.giftRegistered) +
      Number(requestedQuantity) -
      giftTotalPurchased
    : Number(registryData.registryResVO.registrySummaryVO.giftRegistered) -
      Number(requestedQuantity);
  registryData.registryResVO.registrySummaryVO.giftRegistered = giftRegistered;
  registryData.registryResVO.registrySummaryVO.giftPurchased = giftPurchased;
  registryData.registryResVO.registrySummaryVO.giftTotalPurchased = giftTotalPurchased;
  registryData.registryResVO.registrySummaryVO.giftRemaining = giftTotalRemaining;
};

function RegistryDetailReducer(
  state = initialState,
  {
    type,
    error,
    data,
    updateGiftPurchased,
    updateGiftRegistered,
    hasShown,
    updatedQuantity,
    modalCloseOpenFlag,
    inactivityModalState,
    requestedQuantity,
    purchasedQuantity,
    isUndoItem,
    filterCount,
    value,
    isOptIn,
    headers,
    isGroupGiftOptIn,
    isEditRegistry,
  }
) {
  switch (type) {
    case FETCH_REGISTRY_DATA:
    case FETCH_REGISTRY_DATA_SERVER:
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('data', null)
        .set('tymData', null);
    case FETCH_REGISTRY_DATA_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('trackFlag', true)
        .set('data', data)
        .set('regResponse', headers);
    case FETCH_REGISTRY_DATA_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('data', null);
    case UPDATE_RBYR_OPT_IN:
      return state.set('data', RBYROptnInState(state, isOptIn));
    case UPDATE_GROUP_GIFT_OPT_IN:
      return state.set('data', groupGiftOptnInState(state, isGroupGiftOptIn));
    case CLEAR_REGISTRY_DATA_SERVER:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', null);
    case FETCH_TYM_DATA:
      return state.set('tymData', null);
    case FETCH_TYM_DATA_SUCCESS:
      return state.set('tymData', data);
    case FETCH_TYM_DATA_ERROR:
      return state.set('tymData', error);
    case UPDATE_GIFT_DATA:
      registryData = state.get('data');
      if (!isEmpty(registryData)) {
        giftRegistered =
          Number(registryData.registryResVO.registrySummaryVO.giftRegistered) +
          Number(updateGiftRegistered);
        giftPurchased =
          Number(registryData.registryResVO.registrySummaryVO.giftPurchased) +
          Number(updateGiftPurchased);
        giftTotalPurchased =
          Number(
            registryData.registryResVO.registrySummaryVO.giftTotalPurchased
          ) + Number(updateGiftPurchased);
        giftTotalRemaining =
          Number(registryData.registryResVO.registrySummaryVO.giftRemaining) +
          Number(updateGiftRegistered) -
          Number(updateGiftPurchased);

        registryData.registryResVO.registrySummaryVO.giftRegistered = giftRegistered;
        registryData.registryResVO.registrySummaryVO.giftPurchased = giftPurchased;
        registryData.registryResVO.registrySummaryVO.giftTotalPurchased = giftTotalPurchased;
        registryData.registryResVO.registrySummaryVO.giftRemaining = giftTotalRemaining;
      }
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', registryData);
    case UPDATE_DASHBOARD_DATA:
      registryData = state.get('data');
      if (!isEmpty(registryData)) {
        updatedDashboardquantity =
          Number(registryData.registryResVO.registrySummaryVO.giftRegistered) +
          Number(updatedQuantity);
        registryData.registryResVO.registrySummaryVO.giftRegistered = updatedDashboardquantity;
      }
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', registryData);
    case UPDATE_REMOVE_ITEM_DATA:
      registryData = state.get('data');
      if (!isEmpty(registryData)) {
        handleUpdateRegistryQtyData(
          requestedQuantity,
          purchasedQuantity,
          isUndoItem
        );
      }
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', registryData);
    case UPDATE_FILTER_COUNT:
      filterCountValue = state.get('filterCount');
      filterCountValue = filterCount;
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('filterCount', filterCountValue);
    case SHOWN_REGISTRY_MYANALYZER_BUTTON:
      return state.set('hasShownAnalyzerBtn', hasShown);
    case CLOSE_OTHERMODAL_INACTIVITYMODAL:
      return state.set('closeOtherModal', modalCloseOpenFlag);
    case INITIATE_INACTIVITY_MODAL:
      return state.set('inactivityModalReset', inactivityModalState);
    case MAKE_ACTIVE_REGISTRY_CALL:
      return state.set('activeRegistryCallFlag', true);
    case MAKE_ACTIVE_REGISTRY_CALL_SUCCESS:
      return state.set('activeRegistryCallFlag', false);
    case MAKE_ACTIVE_REGISTRY_CALL_ERROR:
      return state.set('activeRegistryCallFlag', false);
    case SET_TRACK_FLAG:
      return state.set('trackFlag', !!value);
    case EDIT_REGISTRY_FROM_MORE_INFORMATION_BTN:
      return state.set('isEditRegistryFromMoreInfoBtn', isEditRegistry);
    case SHOW_CHECKLIST:
      return state.set('showChecklist', data);

    default:
      return state;
  }
}

export default RegistryDetailReducer;
