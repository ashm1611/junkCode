import { fromJS } from 'immutable';
import {
  DEACTIVATE_REGISTRY_ACTION,
  DEACTIVATE_REGISTRY_SUCCESS,
  DEACTIVATE_REGISTRY_ERROR,
  CLEAR_DEACTIVATED_REG_ID,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  error: null,
  deactivatedRegId: null,
});

function DeactivateRegistryReducer(
  state = initialState,
  { type, error, deactivatedRegId }
) {
  switch (type) {
    case DEACTIVATE_REGISTRY_ACTION:
      return state.set('isFetching', true).set('error', null);
    case DEACTIVATE_REGISTRY_SUCCESS:
      return state
        .set('deactivatedRegId', deactivatedRegId)
        .set('isFetching', false);
    case DEACTIVATE_REGISTRY_ERROR:
      return state.set('isFetching', false).set('error', error);
    case CLEAR_DEACTIVATED_REG_ID:
      return state.set('deactivatedRegId', null);
    default:
      return state;
  }
}

export default DeactivateRegistryReducer;
