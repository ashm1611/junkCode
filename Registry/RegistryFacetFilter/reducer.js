import { fromJS } from 'immutable';
import {
  UPDATE_SELECTED_FILTER,
  CLEAR_AND_UPDATE_SELECTED_FILTER,
  RESET_ALL_FILTERS,
  RESET_FILTERS_AND_SORT,
} from './constant';

const initialState = fromJS({
  selectedFilters: { sort: ['recommended'] }, // Works with Filter components.  Optimization may be required
});

export const reducer = (
  state = initialState,
  { type, payload, updatedFilters }
) => {
  switch (type) {
    case UPDATE_SELECTED_FILTER: {
      const updateFilters = {
        ...state.get('selectedFilters').toJS(),
        ...payload,
      };
      return state.merge({
        selectedFilters: updateFilters,
      });
    }
    case CLEAR_AND_UPDATE_SELECTED_FILTER: {
      return state.merge({ selectedFilters: updatedFilters });
    }
    case RESET_ALL_FILTERS: {
      return state.merge({
        selectedFilters: {
          sort: [state.getIn(['selectedFilters', 'sort', 0], 'recommended')],
        },
      });
    }
    case RESET_FILTERS_AND_SORT: {
      return state.merge({ selectedFilters: { sort: ['recommended'] } });
    }
    default:
      return state;
  }
};
