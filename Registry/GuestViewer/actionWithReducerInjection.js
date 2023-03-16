import { injectReducerInStore } from '@bbb-app/utils/asyncInjectors';
import {
  CLEAR_REGISTRY_DATA_SERVER,
  REGISTRY_DETAILS_STATE_KEY,
} from '../RegistryOwner/constants';
import reducer from '../RegistryOwner/reducer';

function injectReducer() {
  injectReducerInStore({ key: REGISTRY_DETAILS_STATE_KEY, reducer });
}

export function clearGuestViewData() {
  injectReducer();
  return {
    type: CLEAR_REGISTRY_DATA_SERVER,
  };
}
