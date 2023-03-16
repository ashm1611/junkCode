import { injectReducerInStore } from '@bbb-app/utils/asyncInjectors';
import {
  UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
  REG_INPUTS_STATE_KEY,
} from './constants';
import registryInputReducer from './reducer';

const injectReducer = () => {
  injectReducerInStore({
    key: REG_INPUTS_STATE_KEY,
    reducer: registryInputReducer,
  });
};

export function updateContactAddressModalVisibility(isAddAddressVisible) {
  injectReducer();
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
    isAddAddressVisible,
  };
}

export function updateMovingAddressModalVisibility(isAddAddressVisible) {
  injectReducer();
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
    isAddAddressVisible,
  };
}

export function updateShippingAddressModalVisibility(isAddAddressVisible) {
  injectReducer();
  return {
    type: UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
    isAddAddressVisible,
  };
}
