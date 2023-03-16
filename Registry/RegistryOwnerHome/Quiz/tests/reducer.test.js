import { fromJS } from 'immutable';

import { QuizReducer } from '../reducer';
import {
  FETCH_PERSONA,
  QUIZ_ERROR_MESSAGE,
  FETCH_QUIZ_PERSONA_QUICKPICKID,
  RESET_QUIZ_PERSONA_QUICKPICKID,
  SET_QUIZ_PERSONA_QUICKPICKID,
  SET_FROM_RECOMMENDATION,
} from '../../constants';

describe('QuizReducer', () => {
  const state = fromJS({
    isQuizFetching: false,
    personaType: null,
    quickPickId: null,
    quizCompleted: false,
    quizErrorMessage: null,
    registryId: null,
    isFromRecommendation: false,
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(QuizReducer(undefined, {})).to.deep.equal(expectedResult);
  });

  it('should set isQuizFetching', () => {
    const actionData = { type: FETCH_PERSONA };
    const expectedResult = state.set('isQuizFetching', true);
    expect(QuizReducer(state, actionData)).to.deep.equal(expectedResult);
  });

  it('should set isQuizFetching', () => {
    const actionData = { type: SET_FROM_RECOMMENDATION };
    const expectedResult = state.set('isFromRecommendation', false);
    expect(QuizReducer(state, actionData)).to.deep.equal(expectedResult);
  });

  it('should set error message', () => {
    const data = {};
    const actionData = { type: QUIZ_ERROR_MESSAGE, data };
    const expectedResult = state
      .set('quizErrorMessage', data)
      .set('isQuizFetching', false);
    expect(QuizReducer(state, actionData)).to.deep.equal(expectedResult);
  });

  it('should set quickPickid and personaType message', () => {
    const data = { quickPickid: '1', personaType: 'test', registryId: '123' };
    const actionData = { type: FETCH_QUIZ_PERSONA_QUICKPICKID, data };
    const expectedResult = state
      .set('quickPickId', data.quickPickid)
      .set('personaType', data.personaType)
      .set('quizCompleted', true)
      .set('isQuizFetching', false)
      .set('isFromRecommendation', true)
      .set('registryId', data.registryId)
      .set('quizErrorMessage', null);
    expect(QuizReducer(state, actionData)).to.deep.equal(expectedResult);
  });
  it('should set Quiz Persona and QuicPickId', () => {
    const data = { quickPickid: '1', personaType: 'test', registryId: '123' };
    const actionData = { type: SET_QUIZ_PERSONA_QUICKPICKID, data };
    const expectedResult = state
      .set('quickPickId', data.quickPickid)
      .set('personaType', data.personaType)
      .set('quizCompleted', false)
      .set('isQuizFetching', false)
      .set('registryId', data.registryId)
      .set('quizErrorMessage', null);
    expect(QuizReducer(state, actionData)).to.deep.equal(expectedResult);
  });
  it('should set intial state on ', () => {
    const data = {};
    const actionData = { type: RESET_QUIZ_PERSONA_QUICKPICKID, data };
    const expectedResult = state
      .set('quickPickId', null)
      .set('personaType', null)
      .set('quizCompleted', false)
      .set('isFromRecommendation', true)
      .set('isQuizFetching', false)
      .set('registryId', null)
      .set('quizErrorMessage', null);
    expect(QuizReducer(state, actionData)).to.deep.equal(expectedResult);
  });
});
