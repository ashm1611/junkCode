import { fromJS } from 'immutable';

import {
  CHECK_TOKEN,
  CHECK_TOKEN_ERROR,
  CHECK_TOKEN_SUCCESS,
  MAP_TO_RECOMMENDER_SUCCESS,
  MAP_TO_RECOMMENDER_ERROR,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  error: null,
  data: null,
  maptoRecommenderData: false,
  maptoRecommenderError: null,
});

function checkTokenReducer(state = initialState, { type, data, error }) {
  switch (type) {
    case CHECK_TOKEN:
      return state.set('isFetching', true).set('error', null);

    case CHECK_TOKEN_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', data);

    case CHECK_TOKEN_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error || true)
        .set('data', null);
    case MAP_TO_RECOMMENDER_SUCCESS:
      return state.set('maptoRecommenderData', data);
    case MAP_TO_RECOMMENDER_ERROR:
      return state.set('maptoRecommenderError', error);
    default:
      return state;
  }
}

export default checkTokenReducer;
