import { fromJS } from 'immutable';

import {
  getPersonaType,
  getQuickPickId,
  getErrorMessage,
  getQuizCompleted,
  getRegistryId,
  getQuizIsQuizFetching,
  getFromRecommendation,
} from '../selectors';

describe('QuizSelectors', () => {
  const mockedState = fromJS({
    fetchQuizPersona: {
      personaType: 'test',
      quickPickId: '123',
      quizErrorMessage: 'error',
      quizCompleted: 'true',
      registryId: '1234',
      isQuizFetching: 'true',
      isFromRecommendation: 'true',
    },
  });
  it('should select the personaType', () => {
    const value = 'test';
    const selector = getPersonaType();
    expect(selector(mockedState)).to.deep.equal(value);
  });
  it('should select the getQuickPickId', () => {
    const value = '123';
    const selector = getQuickPickId();
    expect(selector(mockedState)).to.deep.equal(value);
  });
  it('should select the getErrorMessage', () => {
    const value = 'error';
    const selector = getErrorMessage();
    expect(selector(mockedState)).to.deep.equal(value);
  });
  it('should select the getQuizCompleted', () => {
    const value = 'true';
    const selector = getQuizCompleted();
    expect(selector(mockedState)).to.deep.equal(value);
  });
  it('should select the getRegistryId', () => {
    const value = '1234';
    const selector = getRegistryId();
    expect(selector(mockedState)).to.deep.equal(value);
  });
  it('should select the getQuizIsQuizFetching', () => {
    const value = 'true';
    const selector = getQuizIsQuizFetching();
    expect(selector(mockedState)).to.deep.equal(value);
  });
  it('should select the getFromRecommendation', () => {
    const value = 'true';
    const selector = getFromRecommendation();
    expect(selector(mockedState)).to.deep.equal(value);
  });
});
