import {
  FETCH_QUIZ_PERSONA,
  SET_QUIZ_PERSONA_QUICKPICKID,
  RESET_QUIZ_PERSONA_QUICKPICKID,
  SET_FROM_RECOMMENDATION,
} from '../../constants';
import {
  fetchQuizPersona,
  setQuizPersona,
  resetQuizPersona,
  setQuizFromRecommendation,
} from '../actions';

describe('Actions for Quiz', () => {
  describe('fetchQuizPersona', () => {
    it('should return the proper object', () => {
      const output = fetchQuizPersona();
      expect(output.type).to.equal(FETCH_QUIZ_PERSONA);
    });
  });
  describe('setQuizPersona', () => {
    it('should return the proper object', () => {
      const output = setQuizPersona();
      expect(output.type).to.equal(SET_QUIZ_PERSONA_QUICKPICKID);
    });
  });
  describe('resetQuizPersona', () => {
    it('should return the proper object', () => {
      const output = resetQuizPersona();
      expect(output.type).to.equal(RESET_QUIZ_PERSONA_QUICKPICKID);
    });
  });
  describe('setQuizFromRecommendation', () => {
    it('should return the proper object', () => {
      const output = setQuizFromRecommendation();
      expect(output.type).to.equal(SET_FROM_RECOMMENDATION);
    });
  });
});
