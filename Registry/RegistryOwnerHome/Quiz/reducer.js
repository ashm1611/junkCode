import { fromJS } from 'immutable';
import {
  FETCH_QUIZ_PERSONA_QUICKPICKID,
  QUIZ_ERROR_MESSAGE,
  RESET_QUIZ_PERSONA_QUICKPICKID,
  FETCH_PERSONA,
  SET_QUIZ_PERSONA_QUICKPICKID,
  SET_FROM_RECOMMENDATION,
} from '../constants';

const initialState = fromJS({
  isQuizFetching: false,
  personaType: null,
  quickPickId: null,
  quizCompleted: false,
  quizErrorMessage: null,
  registryId: null,
  isFromRecommendation: false,
});

export function QuizReducer(state = initialState, { type, data }) {
  switch (type) {
    case FETCH_PERSONA:
      return state.set('isQuizFetching', true);
    case FETCH_QUIZ_PERSONA_QUICKPICKID:
      return state
        .set('quickPickId', data.quickPickid)
        .set('personaType', data.personaType)
        .set('quizCompleted', true)
        .set('isQuizFetching', false)
        .set('isFromRecommendation', true)
        .set('registryId', data.registryId)
        .set('quizErrorMessage', null);
    case SET_QUIZ_PERSONA_QUICKPICKID:
      return state
        .set('quickPickId', data.quickPickid)
        .set('personaType', data.personaType)
        .set('quizCompleted', false)
        .set('isQuizFetching', false)
        .set('registryId', data.registryId)
        .set('quizErrorMessage', null);
    case QUIZ_ERROR_MESSAGE:
      return state.set('quizErrorMessage', data).set('isQuizFetching', false);
    case SET_FROM_RECOMMENDATION:
      return state.set('isFromRecommendation', false);
    case RESET_QUIZ_PERSONA_QUICKPICKID:
      return state
        .set('quickPickId', null)
        .set('personaType', null)
        .set('quizCompleted', false)
        .set('isFromRecommendation', true)
        .set('isQuizFetching', false)
        .set('registryId', null)
        .set('quizErrorMessage', null);
    default:
      return state;
  }
}
