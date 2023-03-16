import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { REGISTRY_FACET_FILTER } from './constant';

export const selectRegistryFacetFilter = state => {
  return state.getIn([REGISTRY_FACET_FILTER], Map());
};

export const selectRegsitryFacetFilter = () => {
  return createSelector(selectRegistryFacetFilter, registryFacetFilterSate =>
    registryFacetFilterSate.get('selectedFilters', Map())
  );
};

export const getGiftGiver = state => state.get('giftGiver', Map());

export const makeSelectFirstCategoryDateSortedList = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('dateSortedfirstCategorydata');
  });
};

export const makeSelectOosCategoryDateSortedList = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('dateSortedOosCategorydata');
  });
};
