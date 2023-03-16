/**
 * RegistryAnalyzer Selectors
 */

import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  REGISTRY_ANALYZER_STATE_KEY,
  REGISTRY_DETAILS_STATE_KEY,
} from './constants';

/**
 * Selector required to fetch current RegistryAnalyzer state.
 *
 * @param {object} state
 *
 * @returns {Map} RegistryAnalyzer state `registryAnalyzer`
 */
export const selectRegistryAnalyzerState = state =>
  state.get(REGISTRY_ANALYZER_STATE_KEY);

/**
 * Selector required to fetch current RegistryDetails state.
 *
 * @param {object} state
 *
 * @returns {Map} RegistryDetails state `registryDetails`
 */
export const selectRegistryDetailsState = state =>
  state.get(REGISTRY_DETAILS_STATE_KEY, Map());

/**
 * Selector required to fetch current RegistryAnalyzer state of `isAnalyzerDataFetching`
 *
 * @returns {Map} isAnalyzerDataFetching - current state value
 */
export const makeSelectIsRegAnalyzerFetching = () =>
  createSelector(selectRegistryAnalyzerState, regAnalyzerState => {
    return regAnalyzerState.get('isAnalyzerDataFetching');
  });

/**
 * Selector required to fetch current RegistryAnalyzer state of `error`
 *
 * @returns {Map} error - current state value
 */
export const makeSelectRegAnalyzerError = () =>
  createSelector(selectRegistryAnalyzerState, regAnalyzerState => {
    return regAnalyzerState.get('error');
  });

/**
 * Selector required to fetch current RegistryAnalyzer state of `analyzerData`
 *
 * @returns {Map} analyzerData - current state value
 */
export const makeSelectRegAnalyzerData = () =>
  createSelector(selectRegistryAnalyzerState, regAnalyzerState => {
    return regAnalyzerState.get('analyzerData');
  });

/**
 * Selector required to fetch current RegistryDetails state of `hasShownAnalyzerBtn`
 *
 * @returns {Map} hasShownAnalyzerBtn - current state value
 */
export const makeSelectRegAnalyzerShownBtn = () =>
  createSelector(selectRegistryDetailsState, regDetailsState => {
    return regDetailsState.get('hasShownAnalyzerBtn');
  });
