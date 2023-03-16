import { fromJS } from 'immutable';
import {
  UPDATE_SELECTED_FILTER,
  CLEAR_AND_UPDATE_SELECTED_FILTER,
  RESET_ALL_FILTERS,
  RESET_FILTERS_AND_SORT,
} from '../constant';

import { reducer } from '../reducer';

describe(__filename, () => {
  const initialState = fromJS({ selectedFilters: {} });

  it('should return the initial state when state is empty', () => {
    const expectedResult = fromJS({
      selectedFilters: { sort: ['recommended'] },
    });
    expect(reducer(undefined, {})).to.deep.equal(expectedResult);
  });

  it('should return the initial state', () => {
    const registryFacetReducer = reducer(initialState, {
      type: '',
      payload: '',
    });
    expect(registryFacetReducer).to.equal(initialState);
  });

  it('should update selected filters', () => {
    const payload = { status: ['Gifts Purchased'] };
    const data = { selectedFilters: payload };
    const registryFacetReducer = reducer(initialState, {
      type: UPDATE_SELECTED_FILTER,
      payload,
    });
    const expectedResult = initialState.merge(data);

    expect(registryFacetReducer).to.deep.equal(expectedResult);
  });

  it('should clear selected filters', () => {
    const registryFacetReducer = reducer(initialState, {
      type: CLEAR_AND_UPDATE_SELECTED_FILTER,
      updatedFilters: {},
    });
    const expectedResult = initialState.merge({});
    expect(registryFacetReducer).to.equal(expectedResult);
  });

  it('should reset filters', () => {
    const registryFacetReducer = reducer(initialState, {
      type: RESET_ALL_FILTERS,
    });
    const data = { selectedFilters: { sort: ['recommended'] } };
    const expectedResult = initialState.merge(data);
    expect(registryFacetReducer).to.deep.equal(expectedResult);
  });

  it('should reset filters and sort', () => {
    const registryFacetReducer = reducer(initialState, {
      type: RESET_FILTERS_AND_SORT,
    });
    const data = { selectedFilters: { sort: ['recommended'] } };
    const expectedResult = initialState.merge(data);
    expect(registryFacetReducer).to.deep.equal(expectedResult);
  });
});
