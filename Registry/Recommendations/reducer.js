import { fromJS } from 'immutable';

import {
  FETCH_REGISTRY_RECOMMENDATIONS,
  FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS,
  FETCH_REGISTRY_RECOMMENDATIONS_ERROR,
  FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
  MAY_BE_LATER,
  MAY_BE_LATER_SUCCESS,
  MAY_BE_LATER_ERROR,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_RESET,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY,
} from './constants';

const initialState = fromJS({
  data: {},
  isFetching: true,
  mayBeLaterFlag: false,
  recommendationBlockUnblockError: null,
});

const successTypes = [
  FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS,
  MAY_BE_LATER_SUCCESS,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS,
];

const errorTypes = [
  FETCH_REGISTRY_RECOMMENDATIONS_ERROR,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR,
  MAY_BE_LATER_ERROR,
];

// This method return success type
const getType = (type, typeSet) => {
  if (typeSet.indexOf(type) !== -1) {
    return type;
  }
  return null;
};

export function handleSuccessType(state, { type, data }) {
  switch (type) {
    case FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS:
      return state.set('recommendationList', data).set('isFetching', false);
    case FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS:
      return state.set('recommenderSummary', data).set('isFetching', false);
    case MAY_BE_LATER_SUCCESS:
      return state.set('mayBeLaterFlag', true);
    case SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS:
      return state
        .set('recommendationBlockUnblockSuccess', data ? data.result : null)
        .set('isFetching', false);
    default:
      return state;
  }
}

export function handleErrorType(state, { type, data, error }) {
  switch (type) {
    case FETCH_REGISTRY_RECOMMENDATIONS_ERROR:
      return state.set('recommendationError', error).set('isFetching', false);
    case FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR:
      return state
        .set('recommenderSummaryError', error)
        .set('isFetching', false);
    case SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR:
      return state
        .set('recommendationBlockUnblockError', data)
        .set('isFetching', false);
    case MAY_BE_LATER_ERROR:
      return state.set('mayBeLaterFlag', false);
    default:
      return state;
  }
}

function RegistryRecommendationsReducer(
  state = initialState,
  { type, data, error }
) {
  switch (type) {
    case getType(type, successTypes):
      return handleSuccessType(state, { type, data, error });
    case getType(type, errorTypes):
      return handleErrorType(state, { type, data, error });
    case FETCH_REGISTRY_RECOMMENDATIONS:
      return state.set('isFetching', true);
    case FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED:
      return state.set('isFetching', true);
    case FETCH_REGISTRY_RECOMMENDER_SUMMARY:
      return state.set('isFetching', true);
    case MAY_BE_LATER:
      return state.set('mayBeLaterFlag', false);

    case SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_RESET:
      return state.set('recommendationBlockUnblockSuccess', null);
    default:
      return state;
  }
}

export default RegistryRecommendationsReducer;
