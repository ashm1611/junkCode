import { createSelector } from 'reselect';
import { DEACTIVATE_REGISTRY_KEY } from './constants';

export const deactivateRegistryState = state =>
  state.get(DEACTIVATE_REGISTRY_KEY);

export const makeSelectIsFetching = () => {
  return createSelector(deactivateRegistryState, state =>
    state.get('isFetching')
  );
};

export const makeSelectDeactivatedRegId = () => {
  return createSelector(deactivateRegistryState, state => {
    if (state && state.has('deactivatedRegId')) {
      return state.get('deactivatedRegId');
    }
    return null;
  });
};

export const makeSelectError = () => {
  return createSelector(deactivateRegistryState, state => state.get('error'));
};
