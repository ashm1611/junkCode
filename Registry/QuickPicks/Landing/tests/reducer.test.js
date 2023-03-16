import { fromJS } from 'immutable';
import reducer from '../reducer';

import { fetchQuickPicks, setQuickPicks } from '../actions';

describe(__filename, () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      registryTypes: [],
      selectedRegistryType: '',
      categories: [],
      fetching: false,
      selectedCategory: '',
    });
  });
  it('should return the same states', () => {
    const reduced = reducer(initialState, { type: 'foo' });
    expect(reduced.toJS()).to.deep.equal(initialState.toJS());
  });
  it('should return the initialState when state is undefined', () => {
    const initialStateObj = fromJS({
      registryTypes: [],
      selectedRegistryType: '',
      categories: [],
      fetching: false,
      selectedCategory: '',
      hero: [],
      error: false,
      cacheKey: 'magicValue',
    });
    const reduced = reducer(undefined, { type: 'foo' });
    expect(reduced.toJS()).to.deep.equal(initialStateObj.toJS());
  });
  it('should reduce: fetchQuickPicks', () => {
    const reduced = reducer(initialState, fetchQuickPicks('a', 'b', 'c'));
    expect(reduced.toJS()).to.have.property('fetching', true);
  });
  it('should reduce: setQuickPicks', () => {
    const reduced = reducer(initialState, setQuickPicks({ categories: [1] }));
    expect(reduced.toJS()).to.have.property('fetching', false);
  });
});
