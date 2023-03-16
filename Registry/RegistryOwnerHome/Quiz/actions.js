import {
  FETCH_QUIZ_PERSONA,
  RESET_QUIZ_PERSONA_QUICKPICKID,
  SET_QUIZ_PERSONA_QUICKPICKID,
  SET_FROM_RECOMMENDATION,
} from '../constants';

export function fetchQuizPersona(data, customerId) {
  return {
    type: FETCH_QUIZ_PERSONA,
    data,
    customerId,
  };
}
export function resetQuizPersona() {
  return {
    type: RESET_QUIZ_PERSONA_QUICKPICKID,
  };
}

export function setQuizPersona(data) {
  return {
    type: SET_QUIZ_PERSONA_QUICKPICKID,
    data,
  };
}

export function setQuizFromRecommendation() {
  return {
    type: SET_FROM_RECOMMENDATION,
  };
}
