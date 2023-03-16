import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { FETCH_QUIZ_PERSONA } from '../constants';

export const quizData = state => state.get(FETCH_QUIZ_PERSONA, Map());

export const getPersonaType = () =>
  createSelector(quizData, quizDetails => quizDetails.get('personaType'));

export const getQuickPickId = () =>
  createSelector(quizData, quizDetails => quizDetails.get('quickPickId'));

export const getQuizCompleted = () =>
  createSelector(quizData, quizDetails => quizDetails.get('quizCompleted'));

export const getFromRecommendation = () =>
  createSelector(quizData, quizDetails =>
    quizDetails.get('isFromRecommendation')
  );

export const getQuizIsQuizFetching = () =>
  createSelector(quizData, quizDetails => quizDetails.get('isQuizFetching'));

export const getErrorMessage = () =>
  createSelector(quizData, quizDetails => quizDetails.get('quizErrorMessage'));

export const getRegistryId = () =>
  createSelector(quizData, quizDetails => quizDetails.get('registryId'));
