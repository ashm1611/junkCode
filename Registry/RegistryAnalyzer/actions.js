/**
 * RegistryAnalyzer Actions
 */

import {
  FETCH_REGISTRY_ANALYZER_DATA,
  FETCH_REGISTRY_ANALYZER_DATA_SUCCESS,
  FETCH_REGISTRY_ANALYZER_DATA_ERROR,
} from './constants';

/**
 * Dispatched from RegistryAnalyzer component to RegistryAnalyzer container.
 *
 * @param {string} regId - current registry id
 * @param {string} regType - current registry type
 * @param {number} numberOfGuests - guest count in current registry
 *
 * @return {object}
 *  - (type) FETCH_REGISTRY_ANALYZER_DATA action type
 *  - (regId) regId current registry id
 *  - (regType) regType current registry type
 *      BA1 (Baby registry)
 *      BRD (Wedding registry)
 *      HSW (Housewarming registry)
 *      COM (Commitment Ceremony registry)
 *      ANN (Anniversary registry)
 *      RET (Retirement registry)
 *      OTH (Other registry)
 *      COL (College/University registry)
 *      BIR (Birthday registry)
 *  - (numberOfGuests) numberOfGuests guest count in current registry
 */
export function fetchRegAnalyzerData(regId, regType, numberOfGuests) {
  return {
    type: FETCH_REGISTRY_ANALYZER_DATA,
    regId,
    regType,
    numberOfGuests,
  };
}

/**
 * Dispatched from Saga when API resposne successfully return the data.
 *
 * @param {array{}} analyzerData - analyzer data
 *
 * @return {object}
 *  - (type) FETCH_REGISTRY_ANALYZER_DATA_SUCCESS action type
 *  - (analyzerData) analyzerData analyzer data
 */
export function fetchRegAnalyzerDataSuccess(analyzerData) {
  return {
    type: FETCH_REGISTRY_ANALYZER_DATA_SUCCESS,
    analyzerData,
  };
}

/**
 * Dispatched from Saga when API resposne fail or serviceStatus is not equal to SUCCESS.
 *
 * @param {array{} || object || string} error - error info
 *
 * @return {object}
 *  - (type) FETCH_REGISTRY_ANALYZER_DATA_ERROR action type
 *  - (error) error error info
 */
export function fetchRegAnalyzerDataError(error) {
  return {
    type: FETCH_REGISTRY_ANALYZER_DATA_ERROR,
    error,
  };
}
