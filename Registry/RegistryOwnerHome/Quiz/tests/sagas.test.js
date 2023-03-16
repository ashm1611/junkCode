import { put, takeLatest } from 'redux-saga/effects';
import { getQuizPersonaSaga, getQuizPersona } from '../sagas';
import {
  FETCH_QUIZ_PERSONA,
  FETCH_QUIZ_PERSONA_QUICKPICKID,
  QUIZ_ERROR_MESSAGE,
} from '../../constants';

describe('QuizSagas', () => {
  describe('#addToShoppingList Saga', () => {
    let contentGenerator;

    beforeEach(() => {
      const payload = {
        customerId: '123',
        data: {
          registryId: '123',
          selection: [
            { Answer: 'A' },
            { Answer: 'A' },
            { Answer: 'A' },
            { Answer: 'A' },
            { Answer: 'A' },
          ],
        },
      };
      contentGenerator = getQuizPersonaSaga(payload);
      contentGenerator.next();
    });

    it('should dispatch the  action for success response', () => {
      const quizResponse = {
        personaType: 'test',
        quickPickid: '123',
        registryId: '123',
      };

      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: [],
          data: quizResponse,
        },
      };
      contentGenerator.next();
      const result = contentGenerator.next(response).value;
      expect(result).to.deep.equal(
        put({
          type: FETCH_QUIZ_PERSONA_QUICKPICKID,
          data: quizResponse,
        })
      );
    });

    it('should set error message', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: [{ message: 'error' }],
          data: 'error',
        },
      };
      contentGenerator.next();
      const result = contentGenerator.next(response).value;
      expect(result).to.deep.equal(
        put({
          type: QUIZ_ERROR_MESSAGE,
          data: response.body.errorMessages[0].message,
        })
      );
    });

    it('should dispatch the action for error response', () => {
      const error = {
        body: {
          error: 'errorMessages',
          response: {
            axiosErrorMessage: 'error message',
            data: {
              errorMessages: 'errorMessages',
            },
          },
        },
      };
      const result = contentGenerator.throw(error).value;
      expect(result).to.deep.equal(
        put({
          type: QUIZ_ERROR_MESSAGE,
          data: 'error message',
        })
      );
    });
  });
  describe('#getQuizPersona Saga', () => {
    let getQuizPersonaSagaGenarator;
    beforeEach(() => {
      getQuizPersonaSagaGenarator = getQuizPersona();
    });
    it('should start task to watch for FETCH_QUIZ_PERSONA action', () => {
      const takeLatestDescriptor = getQuizPersonaSagaGenarator.next().value;
      getQuizPersonaSagaGenarator.next();
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_QUIZ_PERSONA, getQuizPersonaSaga)
      );
    });
  });
});
