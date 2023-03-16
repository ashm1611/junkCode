// import isEmpty  from 'lodash/fp/isEmpty';
import { OrderedSet } from 'immutable';
import { map, forEach } from 'lodash';

export const getFacets = selectedFilters => {
  let appliedFiltersOrderedSet = OrderedSet([]);
  forEach(selectedFilters, (filters, id) => {
    map(filters, (filter, key) => {
      const facetData = {
        id,
        key,
        selected: true,
        label: typeof filter !== 'string' ? `${filter}` : filter,
        value: filter,
        singleSelection: true,
      };
      appliedFiltersOrderedSet = OrderedSet(appliedFiltersOrderedSet).add(
        facetData
      );
    });
  });
  return appliedFiltersOrderedSet;
};
