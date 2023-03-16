import { fromJS } from 'immutable';

import { submitAccountSignOut } from '@bbb-app/account-signin/containers/actions';
import registryFavoriteReducer from '../reducer';
import { setFavoriteStoreId, removeFavoriteStoreId } from '../actions';

describe('registryFavoriteReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      favStoreId: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(registryFavoriteReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the setFavoriteStoreId action correctly', () => {
    const id = '12';
    const expectedResult = state.set('favStoreId', id);

    expect(
      registryFavoriteReducer(state, setFavoriteStoreId(id))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the removeFavoriteStoreId action correctly', () => {
    const id = '';
    const expectedResult = state.set('favStoreId', id);

    expect(
      registryFavoriteReducer(state, removeFavoriteStoreId(id))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the submitAccountSignOut action correctly', () => {
    const id = '';
    const expectedResult = state.set('favStoreId', id);

    expect(
      registryFavoriteReducer(state, submitAccountSignOut(id))
    ).to.deep.equal(expectedResult);
  });
});
