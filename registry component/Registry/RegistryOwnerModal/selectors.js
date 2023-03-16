import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const selectRegistryOwnerItems = state =>
  state.get('registryOwnerItems', Map());

export const selectRegistrantModalData = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem => {
    return registryOwnerItem.get('registrantModalData');
  });
};
