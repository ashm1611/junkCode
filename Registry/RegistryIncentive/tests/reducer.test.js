import { fromJS } from 'immutable';

import RegistryIncentiveReducer from '../reducer';
import {
  fetchMyRegistriesInfo,
  fetchMyRegistriesInfoSuccess,
  fetchMyRegistriesInfoError,
} from '../actions';

describe('RegistryIncentiveReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      isFetching: false,
      incentiveInfo: [],
      error: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(RegistryIncentiveReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the fetchMyRegistriesInfo action correctly', () => {
    const expectedResult = state.set('isFetching', true);

    expect(
      RegistryIncentiveReducer(state, fetchMyRegistriesInfo())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchMyRegistriesInfoSuccess action correctly if atgResponse is available', () => {
    const myRegistriesIncentiveInfo = {
      incentives: [{}],
    };
    const expectedResult = state
      .set('isFetching', false)
      .set('incentiveInfo', myRegistriesIncentiveInfo.incentives);

    expect(
      RegistryIncentiveReducer(
        state,
        fetchMyRegistriesInfoSuccess(myRegistriesIncentiveInfo)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchMyRegistriesInfoSuccess action correctly even if atgResponse is not available', () => {
    const expectedResult = state.set('isFetching', false);

    expect(
      RegistryIncentiveReducer(state, fetchMyRegistriesInfoSuccess())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchMyRegistriesInfoError action correctly', () => {
    const error = new Error('some error');
    const expectedResult = state
      .set('isFetching', false)
      .set('error', error)
      .set('incentiveInfo', []);

    expect(
      RegistryIncentiveReducer(state, fetchMyRegistriesInfoError(error))
    ).to.deep.equal(expectedResult);
  });
});
