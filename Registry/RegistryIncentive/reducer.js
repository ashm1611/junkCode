import { fromJS } from 'immutable';

import {
  FETCH_MY_REGISTRIES,
  FETCH_MY_REGISTRIES_SUCCESS,
  FETCH_MY_REGISTRIES_ERROR,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  incentiveInfo: [],
  error: '',
});
/* eslint-disable complexity */
function RegistryIncentiveReducer(state = initialState, { type, data, error }) {
  switch (type) {
    case FETCH_MY_REGISTRIES:
      return state.set('isFetching', true);
    case FETCH_MY_REGISTRIES_SUCCESS:
      if (data) {
        return state
          .set('isFetching', false)
          .set('incentiveInfo', data.incentives)
          .set('error', '');
      }
      return state.set('isFetching', false);
    case FETCH_MY_REGISTRIES_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('incentiveInfo', []);

    default:
      return state;
  }
}

/* eslint-enable complexity */
export default RegistryIncentiveReducer;
