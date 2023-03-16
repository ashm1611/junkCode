import { fromJS } from 'immutable';

import {
  recommenderLandingPage,
  makeSelectRecommederLandingPage,
  makeSelectValidateTokenResult,
  makeSelectIsFetching,
  makeSelectIsError,
} from '../selectors';

describe('Recommender Landing Page selectors', () => {
  const RecommederLandingPage = fromJS({
    description: 'hello',
  });
  const state = fromJS({
    labels: {
      Registry: {
        RecommederLandingPage: {
          description: 'hello',
        },
        recommenderLanding: {
          id: 'abc',
        },
      },
    },
  });
  it('should select recommenderLandingPage', () => {
    const stateNew = fromJS({
      recommenderLanding: {
        id: 'abc',
      },
    });
    const recommenderLanding = fromJS({
      id: 'abc',
    });
    const recommenderLandingSelectors = recommenderLandingPage(stateNew);
    expect(recommenderLandingSelectors).to.deep.equal(recommenderLanding);
  });
  it('should select makeSelectRecommederLandingPage', () => {
    const labelSelectors = makeSelectRecommederLandingPage();
    expect(labelSelectors(state)).to.deep.equal(RecommederLandingPage);
  });

  it('makeSelectValidateTokenResult', () => {
    const validateTokensState = fromJS({
      recommenderLanding: {
        isFetching: false,
        data: {},
        error: null,
      },
    });
    const selector = makeSelectValidateTokenResult();
    expect(selector(validateTokensState)).to.be.a('object');
  });

  it('makeSelectIsFetching for recommender landing', () => {
    const validateTokensState = fromJS({
      recommenderLanding: {
        isFetching: true,
        data: {},
        error: null,
      },
    });
    const selector = makeSelectIsFetching();
    expect(selector(validateTokensState)).to.be.equal(true);
  });

  it('error selectro for token validation api for recommender landing', () => {
    const validateTokensState = fromJS({
      recommenderLanding: {
        isFetching: true,
        data: {},
        error: true,
      },
    });
    const selector = makeSelectIsError();
    expect(selector(validateTokensState)).to.be.equal(true);
  });
});
