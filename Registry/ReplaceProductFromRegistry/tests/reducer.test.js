import { fromJS } from 'immutable';
import ReplaceProductFromRegistryReducer from '../reducer';
import {
  replaceProductFromRegistry,
  replaceProductFromRegistrySuccess,
  replaceProductFromRegistryError,
} from '../actions';

describe('ReplaceProductFromRegistryReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      closeModalState: false,
    });
  });
  it('should return the initial state', () => {
    const expectedResult = state;

    expect(ReplaceProductFromRegistryReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the REPLACE_PRODUCT_FROM_REGISTRY action correctly', () => {
    const payload = {
      closeModalState: true,
    };
    const expectedResult = state.set(
      'closeModalState',
      payload.closeModalState
    );

    expect(
      ReplaceProductFromRegistryReducer(
        state,
        replaceProductFromRegistry(payload)
      )
    ).to.deep.equal(expectedResult);
  });
  it('should handle the repalceProductFromRegistrySuccess action correctly', () => {
    const payload = {
      closeModalState: false,
    };
    const expectedResult = state.set(
      'closeModalState',
      payload.closeModalState
    );

    expect(
      ReplaceProductFromRegistryReducer(
        state,
        replaceProductFromRegistrySuccess(payload)
      )
    ).to.deep.equal(expectedResult);
  });
  it('should handle the repalceProductFromRegistryError action correctly', () => {
    const payload = {
      closeModalState: true,
    };
    const expectedResult = state.set(
      'closeModalState',
      payload.closeModalState
    );

    expect(
      ReplaceProductFromRegistryReducer(
        state,
        replaceProductFromRegistryError(payload)
      )
    ).to.deep.equal(expectedResult);
  });
});
