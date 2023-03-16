import { put, takeLatest, call } from 'redux-saga/effects';
import ServiceUtils from '@bbb-app/utils/serviceUtil';
import pathOr from 'lodash/fp/pathOr';
import {
  FETCH_QUIZ_PERSONA,
  FETCH_QUIZ_PERSONA_QUICKPICKID,
  FETCH_PERSONA,
  QUIZ_ERROR_MESSAGE,
} from '../constants';

export function* getQuizPersonaSaga(payload) {
  try {
    yield put({ type: FETCH_PERSONA });
    const {
      body: { data, errorMessages, serviceStatus },
    } = yield call(ServiceUtils.triggerServerRequest, {
      url: `/apis/stateful/v1.0/customers/${payload.customerId}/registry/quiz`,
      method: 'POST',
      showLoader: true,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(payload.data),
    });
    if (serviceStatus === 'ERROR') {
      const errorMessage = errorMessages[0].message;
      yield put({ type: QUIZ_ERROR_MESSAGE, data: errorMessage });
    } else {
      data.registryId = payload.data.registryId;
      yield put({ type: FETCH_QUIZ_PERSONA_QUICKPICKID, data });
    }
  } catch (error) {
    const errorMsg = pathOr(null, 'body.response.axiosErrorMessage', error);
    yield put({
      type: QUIZ_ERROR_MESSAGE,
      data: errorMsg,
    });
  }
}

export function* getQuizPersona() {
  yield takeLatest(FETCH_QUIZ_PERSONA, getQuizPersonaSaga);
}

export const QuizPersona = [getQuizPersona];
