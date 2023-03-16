export const QUERY_SEARCH_PARAM = '?showWelcomeMsg=true';
export const CHECK_TOKEN = 'recommenderLanding/check_token';
export const CHECK_TOKEN_ERROR = 'recommenderLanding/check_token_error';
export const CHECK_TOKEN_SUCCESS = 'recommenderLanding/check_token_success';
export const RECOMMENDER_LANDING_STATEKEY = 'recommenderLanding';
export const MAP_RECOMMEDNDER = 'BBB/Recommender/Map/Recommender';
export const MAP_TO_RECOMMENDER_SUCCESS =
  'BBB/RECOMMENDER/MAP_TO_RECOMMENDER_SUCCESS';
export const MAP_TO_RECOMMENDER_ERROR =
  'BBB/RECOMMENDER/MAP_TO_RECOMMENDER_ERROR';

export const INVALID_TOKEN = -1;
export const EXPIRED_TOKEN = 0;
export const VALID_TOKEN = 1;
export const INVALID_REGISTRY = 2;
export const PRIVATE_REGISTRY = 3;

export class RecommenderVar {
  static registryId;
  static token;
}
