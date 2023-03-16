import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { REGISTRY_OWNER_ITEMS_STATE_KEY } from './constants';

export const selectRegistryOwnerItems = state =>
  state.get(REGISTRY_OWNER_ITEMS_STATE_KEY, Map());

export const getRemainingItemFetchingStatus = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isRemainingItemFetching')
  );
