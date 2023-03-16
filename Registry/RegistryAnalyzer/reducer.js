/**
 * RegistryAnalyzer Reducer
 */

import { fromJS } from 'immutable';

import {
  FETCH_REGISTRY_ANALYZER_DATA,
  FETCH_REGISTRY_ANALYZER_DATA_SUCCESS,
  FETCH_REGISTRY_ANALYZER_DATA_ERROR,
} from './constants';

/**
 * initial immutable state
 */
const initialState = fromJS({
  isAnalyzerDataFetching: false,
  analyzerData: null,
  error: null,
});

/**
 * Redux Reducer responsible for setting the store values
 *
 * @param {Map} state - Current Store state
 * @param {string} type - Action type.
 * @param {array{}} analyzerData - Analyzer data response from API call.
 * @param {array{} || object || string} error - Error info in case API fails.
 *
 * @return {Map} New State
 */
export function RegistryAnalyzerReducer(
  state = initialState,
  { type, analyzerData, error }
) {
  switch (type) {
    case FETCH_REGISTRY_ANALYZER_DATA:
      return state.set('isAnalyzerDataFetching', true);
    case FETCH_REGISTRY_ANALYZER_DATA_SUCCESS:
      return state
        .set('isAnalyzerDataFetching', false)
        .set('analyzerData', analyzerData);
    case FETCH_REGISTRY_ANALYZER_DATA_ERROR:
      return state.set('isAnalyzerDataFetching', false).set('error', error);
    default:
      return state;
  }
}

export default RegistryAnalyzerReducer;
