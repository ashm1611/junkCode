import { createSelector } from 'reselect';

const replaceProductState = state => {
  return state.get('ReplaceProductFromRegistry');
};

export const closeModalState = () =>
  createSelector(replaceProductState, value => value.get('closeModalState'));
