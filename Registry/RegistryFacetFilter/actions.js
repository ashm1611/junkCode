import {
  UPDATE_SELECTED_FILTER,
  CLEAR_AND_UPDATE_SELECTED_FILTER,
  RESET_ALL_FILTERS,
  RESET_FILTERS_AND_SORT,
} from './constant';
/**
 * Action creator for when user selects a filter.  Portable to both search results
 * and category pages.
 *
 * @param {object} payload The selected filter value.
 * @return {{type: string, payload: *}}
 */
export function updateSelectedFilters(payload) {
  return {
    type: UPDATE_SELECTED_FILTER,
    payload,
  };
}

export function clearAndUpdateSelectedFilters(updatedFilters) {
  return {
    type: CLEAR_AND_UPDATE_SELECTED_FILTER,
    updatedFilters,
  };
}

export function resetAllFilters() {
  return { type: RESET_ALL_FILTERS };
}

export function resetFiltersAndSort() {
  return { type: RESET_FILTERS_AND_SORT };
}
