import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { ADD_TO_REGISTRY_STATE_KEY } from '@bbb-app/constants/state-keys/registryStateKeys';

import { REGISTRY_QUICK_ADD } from './constants';

export const quickAddState = state => state.get(REGISTRY_QUICK_ADD);

export const makeSelectIsFetching = () => {
  return createSelector(quickAddState, state =>
    state.get('isFetchingQuickAddItems')
  );
};

export const makeSelectQuickAddItems = () => {
  return createSelector(quickAddState, state => state.get('quickAddItems'));
};

export const makeSelectQuickAddProducts = () => {
  return createSelector(quickAddState, state =>
    state.get('quickAddProductsData')
  );
};

export const selectQuickAddItemsForRegType = () => {
  return createSelector(quickAddState, state => state.get('regType'));
};

export const selectSiteConfig = state => {
  const siteConfig = state.get('viewportConfig', Map());
  return siteConfig;
};

const getAddToRegistryState = state =>
  state.get(ADD_TO_REGISTRY_STATE_KEY, Map());

export const makeSelectQuickAddATRState = () =>
  createSelector(getAddToRegistryState, addToRegistryState =>
    addToRegistryState.get('quickAddATRState')
  );
