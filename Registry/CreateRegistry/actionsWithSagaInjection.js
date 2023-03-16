import {
  injectSagaInStore,
  injectReducerInStore,
} from '@bbb-app/utils/asyncInjectors';
import {
  GET_CO_PROFILE_STATUS,
  CLEAR_REGISTRY_RESPONSE,
  REG_INPUTS_STATE_KEY,
} from './constants';
import registryInputReducer from './reducer';
import RegistryTypesSagas from './sagas';
import coProfileSaga from './coProfileSagas';

const injectSagaAndReducer = () => {
  injectReducerInStore({
    key: REG_INPUTS_STATE_KEY,
    reducer: registryInputReducer,
  });
  injectSagaInStore({ key: REG_INPUTS_STATE_KEY, saga: RegistryTypesSagas });
  injectSagaInStore({ key: 'CO_PROFILE_SAGA', saga: coProfileSaga });
};

export function clearRegistryResponse() {
  injectSagaAndReducer();
  return {
    type: CLEAR_REGISTRY_RESPONSE,
  };
}

export function fetchProfileStatus(emailId, showLoader) {
  injectSagaAndReducer();
  return {
    type: GET_CO_PROFILE_STATUS,
    emailId,
    showLoader,
  };
}
