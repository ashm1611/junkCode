// Prduct Details Chunk reduced
import {
  injectReducerInStore,
  injectSagaInStore,
} from '@bbb-app/utils/asyncInjectors';
import {
  RESET_IS_ITEM_FETCHING,
  REGISTRY_OWNER_ITEMS_STATE_KEY,
  REGISTRY_DETAILS_STATE_KEY,
} from './constants';
import reducer from './RegistryOwnerReducer';
import saga from './sagas';
import {
  updatedRegistryFromQuickAddAction,
  fetchRegistryOwnerItemsFirstCategoryAction,
} from './RegistryOwnerAction';

function injectSagaAndReducer() {
  if (!isSagaInjected.sagaAndReducerInjectedForRegistryOwner) {
    injectReducerInStore({ key: REGISTRY_OWNER_ITEMS_STATE_KEY, reducer });
    // injecting saga with Registry details as Saga file is same
    injectSagaInStore({ key: REGISTRY_DETAILS_STATE_KEY, saga });
    isSagaInjected.sagaAndReducerInjectedForRegistryOwner = true;
  }
}
export function fetchRegistryOwnerItemsFirstCategory(...args) {
  injectSagaAndReducer();
  return fetchRegistryOwnerItemsFirstCategoryAction(...args);
}

export function updatedRegistryFromQuickAdd() {
  injectSagaAndReducer();
  return updatedRegistryFromQuickAddAction();
}

export function resetIsItemsFetchingStatus() {
  injectSagaAndReducer();
  return {
    type: RESET_IS_ITEM_FETCHING,
  };
}

class isSagaInjected {
  static sagaAndReducerInjectedForRegistryOwner = false;
}
