import { fromJS } from 'immutable';

import { FETCH_QUICK_PICKS, SET_QUICK_PICKS } from './constants';

const initialState = fromJS({
  registryTypes: [],
  selectedRegistryType: '',
  categories: [],
  fetching: false,
  selectedCategory: '',
  hero: [],
  error: false,
  cacheKey: 'magicValue',
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_QUICK_PICKS:
      return state.set('fetching', true).set('error', false);
    case SET_QUICK_PICKS:
      return state.merge({
        ...payload,
        fetching: false,
      });
    default:
      return state;
  }
};

export default reducer;
