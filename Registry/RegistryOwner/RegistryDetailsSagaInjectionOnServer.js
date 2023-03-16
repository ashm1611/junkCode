import {
  injectReducerInStore,
  injectSagaInStore,
} from '@bbb-app/utils/asyncInjectors';
import {
  FETCH_REGISTRY_DATA_SERVER,
  REGISTRY_DETAILS_STATE_KEY,
  REGISTRY_DETAILS_ON_SERVER_SAGA_KEY,
} from './constants';
import registryDetailsPageTransitionSaga from './registryDetailsPageTransitionSaga';
import reducer from './reducer';

function injectReducer() {
  injectReducerInStore({ key: REGISTRY_DETAILS_STATE_KEY, reducer });
}

function injectSaga() {
  injectSagaInStore({
    key: REGISTRY_DETAILS_ON_SERVER_SAGA_KEY,
    saga: registryDetailsPageTransitionSaga,
  });
}

export function fetchRegistryDataonServer(args) {
  /* istanbul ignore next */
  injectReducer();
  return {
    type: FETCH_REGISTRY_DATA_SERVER,
    args,
  };
}

export function fetchRegistryData(args) {
  /* istanbul ignore next */
  injectReducer();
  injectSaga();
  return {
    type: FETCH_REGISTRY_DATA_SERVER,
    args,
  };
}
