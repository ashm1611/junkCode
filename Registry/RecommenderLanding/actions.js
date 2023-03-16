import {
  CHECK_TOKEN,
  CHECK_TOKEN_ERROR,
  CHECK_TOKEN_SUCCESS,
  MAP_RECOMMEDNDER,
  MAP_TO_RECOMMENDER_ERROR,
  MAP_TO_RECOMMENDER_SUCCESS,
} from './constants';

export function checkToken(token, registryID) {
  return {
    type: CHECK_TOKEN,
    token,
    registryID,
  };
}

export function checkTokenSuccess(data) {
  return {
    type: CHECK_TOKEN_SUCCESS,
    data,
  };
}

export function checkTokenError(error) {
  return {
    type: CHECK_TOKEN_ERROR,
    error,
  };
}

export const mapRecommender = data => {
  return {
    type: MAP_RECOMMEDNDER,
    data,
  };
};

export function mapRecommenderError(error) {
  return {
    type: MAP_TO_RECOMMENDER_ERROR,
    error,
  };
}

export const mapRecommenderSuccess = data => {
  return {
    type: MAP_TO_RECOMMENDER_SUCCESS,
    data,
  };
};
