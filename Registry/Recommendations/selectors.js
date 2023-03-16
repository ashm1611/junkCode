import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  REGISTRY_DETAILS_STATE_KEY,
  REGISTRY_RECOMMENDATIONS_STATE_KEY,
} from './constants';

export const getRegistryDetails = state =>
  state.get(REGISTRY_DETAILS_STATE_KEY, Map());
export const makeSelectRecommnedationData = state =>
  state.get(REGISTRY_RECOMMENDATIONS_STATE_KEY);
export const getRegistryData = () =>
  createSelector(getRegistryDetails, registryDetails => {
    if (
      registryDetails.get('data') &&
      registryDetails.get('data').recommendationCount
    ) {
      return registryDetails.get('data');
    }
    return false;
  });

export const selectRecommendationList = () =>
  createSelector(makeSelectRecommnedationData, registryState =>
    registryState.get('recommendationList')
  );

export const selectRecommenderSummary = () =>
  createSelector(makeSelectRecommnedationData, registryState =>
    registryState.get('recommenderSummary')
  );
export const isFetching = () =>
  createSelector(makeSelectRecommnedationData, registryState =>
    registryState.get('isFetching')
  );

export const selectMayBeLaterFlag = () =>
  createSelector(makeSelectRecommnedationData, registryState =>
    registryState.get('mayBeLaterFlag')
  );

export const selectBlockUnblockSuccess = () =>
  createSelector(makeSelectRecommnedationData, registryState =>
    registryState.get('recommendationBlockUnblockSuccess')
  );

export const selectBlockUnblockError = () =>
  createSelector(makeSelectRecommnedationData, registryState =>
    registryState.get('recommendationBlockUnblockError')
  );
