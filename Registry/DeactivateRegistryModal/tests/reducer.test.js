import { fromJS } from 'immutable';
import DeactivateRegistryReducer from '../reducer';
import {
  deactivateRegistry,
  deactivateRegistrySuccess,
  deactivateRegistryError,
  clearDeactivatedRegId,
} from '../actions';

describe('DeactivateRegistryReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isFetching: false,
      error: null,
      deactivatedRegId: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(DeactivateRegistryReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the deactivateRegistry action correctly', () => {
    const expectedResult = state.set('isFetching', true).set('error', null);

    expect(
      DeactivateRegistryReducer(state, deactivateRegistry('1234'))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the deactivateRegistrySuccess action correctly', () => {
    const deactivatedRegId = '123';
    const expectedResult = state
      .set('deactivatedRegId', deactivatedRegId)
      .set('isFetching', false);

    expect(
      DeactivateRegistryReducer(
        state,
        deactivateRegistrySuccess(deactivatedRegId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the deactivateRegistryError action correctly', () => {
    const error = 'error';
    const expectedResult = state.set('isFetching', false).set('error', error);

    expect(
      DeactivateRegistryReducer(state, deactivateRegistryError(error))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the clearDeactivatedRegId action correctly', () => {
    const expectedResult = state.set('deactivatedRegId', null);

    expect(
      DeactivateRegistryReducer(state, clearDeactivatedRegId())
    ).to.deep.equal(expectedResult);
  });
});
