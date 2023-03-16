import {
  FETCH_REGISTRY_RECOMMENDATIONS,
  FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS,
  FETCH_REGISTRY_RECOMMENDATIONS_ERROR,
  FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
  SAVE_EMAIL_FREQUENCY,
  MAY_BE_LATER,
  MAY_BE_LATER_SUCCESS,
  MAY_BE_LATER_ERROR,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_RESET,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS,
  FETCH_EDIT_REGISTRY_DATA,
} from './constants';

export function fetchRecommendations(
  registryId,
  tabId,
  sortOption,
  eventTypeCode
) {
  return {
    type: FETCH_REGISTRY_RECOMMENDATIONS,
    registryId,
    tabId,
    sortOption,
    eventTypeCode,
  };
}
export function fetchRecommenderSummary(registryId, tabId) {
  return {
    type: FETCH_REGISTRY_RECOMMENDER_SUMMARY,
    registryId,
    tabId,
  };
}

export function fetchEditRegistryData(registryId, timerFlag, openEdit) {
  return {
    type: FETCH_EDIT_REGISTRY_DATA,
    registryId,
    timerFlag,
    openEdit,
  };
}

export function getRecommenderSummarySuccess(data) {
  return {
    type: FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS,
    data,
  };
}

export function getRecommenderSummaryError(error) {
  return {
    type: FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR,
    error,
  };
}

export function fetchEmailFrequency(registryId, emailOptionValue) {
  return {
    type: SAVE_EMAIL_FREQUENCY,
    registryId,
    emailOptionValue,
  };
}

export function fetchRecommendationsSuccess(data) {
  return {
    type: FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS,
    data,
  };
}

export function fetchRecommendationsError(error) {
  return {
    type: FETCH_REGISTRY_RECOMMENDATIONS_ERROR,
    error,
  };
}

export function fetchRecommendationsDateSorted(
  registryId,
  tabId,
  sortOption,
  eventTypeCode
) {
  return {
    type: FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
    registryId,
    tabId,
    sortOption,
    eventTypeCode,
  };
}

export function mayBeLaterCall(payload) {
  return {
    type: MAY_BE_LATER,
    payload,
  };
}

export function mayBeLaterCallSuccess() {
  return {
    type: MAY_BE_LATER_SUCCESS,
  };
}

export function mayBeLaterCallError() {
  return {
    type: MAY_BE_LATER_ERROR,
  };
}

export function socialRecommendUserBlockUnblock(data) {
  return {
    type: SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK,
    data,
  };
}

export function socialRecommendUserBlockUnblockSuccess(data) {
  return {
    type: SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS,
    data,
  };
}

export function socialRecommendUserBlockUnblockDataReset() {
  return {
    type: SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_RESET,
  };
}

export function socialRecommendUserBlockUnblockError(data) {
  return {
    type: SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR,
    data,
  };
}
