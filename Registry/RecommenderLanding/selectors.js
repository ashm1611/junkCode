import { createSelector } from 'reselect';
import { RECOMMENDER_LANDING_STATEKEY } from './constants';

export const selectLabels = state => state.get('labels');
export const recommenderLandingPage = state =>
  state.get(RECOMMENDER_LANDING_STATEKEY);

export const makeSelectRecommederLandingPage = () =>
  createSelector(selectLabels, recommenderPage =>
    recommenderPage.getIn(['Registry', 'RecommederLandingPage'])
  );

export const makeSelectValidateTokenResult = () =>
  createSelector(recommenderLandingPage, recommenderLandingSuccess =>
    recommenderLandingSuccess.get('data')
  );

export const makeSelectIsFetching = () =>
  createSelector(recommenderLandingPage, isFetching =>
    isFetching.get('isFetching')
  );

export const makeSelectIsError = () =>
  createSelector(recommenderLandingPage, isError => isError.get('error'));
