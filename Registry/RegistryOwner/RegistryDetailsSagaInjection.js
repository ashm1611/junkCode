import {
  injectReducerInStore,
  injectSagaInStore,
} from '@bbb-app/utils/asyncInjectors';
import {
  FETCH_REGISTRY_DATA,
  SHOWN_REGISTRY_MYANALYZER_BUTTON,
  CLOSE_OTHERMODAL_INACTIVITYMODAL,
  MAKE_ACTIVE_REGISTRY_CALL,
  UPDATE_FILTER_COUNT,
  REGISTRY_DETAILS_STATE_KEY,
  UPDATE_RBYR_OPT_IN,
  UPDATE_GROUP_GIFT_OPT_IN,
} from './constants';
import reducer from './reducer';
import saga from './sagas';
import {
  updateDashboardDataAction,
  updateGiftDataAction,
} from './RegistryOwnerAction';

function injectSagaAndReducer() {
  if (!isSagaInjected.sagaAndReducerInjected) {
    injectReducerInStore({ key: REGISTRY_DETAILS_STATE_KEY, reducer });
    injectSagaInStore({ key: REGISTRY_DETAILS_STATE_KEY, saga });
    isSagaInjected.sagaAndReducerInjected = true;
  }
}

export function updateDashboardData(...args) {
  injectSagaAndReducer();
  /* istanbul ignore next */
  return updateDashboardDataAction(...args);
}

export function updateGiftData(...args) {
  injectSagaAndReducer();
  return updateGiftDataAction(...args);
}

export function fetchRegistryData(
  registryId,
  giftGiver,
  fromRegistryController
) {
  injectSagaAndReducer();
  return {
    type: FETCH_REGISTRY_DATA,
    registryId,
    giftGiver,
    fromRegistryController,
  };
}

export function updateRBYROptInInfo(isOptIn) {
  injectSagaAndReducer();
  return {
    type: UPDATE_RBYR_OPT_IN,
    isOptIn,
  };
}

export function updateGroupGiftOptInInfo(isGroupGiftOptIn) {
  injectSagaAndReducer();
  return {
    type: UPDATE_GROUP_GIFT_OPT_IN,
    isGroupGiftOptIn,
  };
}

export function closeOtherOpenModal(modalCloseOpenFlag) {
  injectSagaAndReducer();
  return {
    type: CLOSE_OTHERMODAL_INACTIVITYMODAL,
    modalCloseOpenFlag,
  };
}

export function shownRegistryMyAnalyzerBtn(hasShown = false) {
  injectSagaAndReducer();
  return {
    type: SHOWN_REGISTRY_MYANALYZER_BUTTON,
    hasShown,
  };
}

export function updateFilterCount(filterCount) {
  injectSagaAndReducer();
  return {
    type: UPDATE_FILTER_COUNT,
    filterCount,
  };
}

export function makeActiveRegistryCall() {
  injectSagaAndReducer();
  return {
    type: MAKE_ACTIVE_REGISTRY_CALL,
  };
}

class isSagaInjected {
  static sagaAndReducerInjected = false;
}
