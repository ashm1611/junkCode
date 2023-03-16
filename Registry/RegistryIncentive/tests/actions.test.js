import {
  FETCH_MY_REGISTRIES,
  FETCH_MY_REGISTRIES_SUCCESS,
  FETCH_MY_REGISTRIES_ERROR,
} from '../constants';

import {
  fetchMyRegistriesInfo,
  fetchMyRegistriesInfoSuccess,
  fetchMyRegistriesInfoError,
} from '../actions';

describe('RegistryIncentiveActions', () => {
  it('should return the correct type "FETCH_MY_REGISTRIES_INFO"', () => {
    const registryId = '12345';
    const expectedResult = {
      type: FETCH_MY_REGISTRIES,
      payload: { registryId },
    };

    expect(fetchMyRegistriesInfo(registryId)).to.deep.equal(expectedResult);
  });

  it('should return the success type with registries incentive info', () => {
    const data = {
      incentiveInfo: {},
    };
    const expectedResult = {
      type: FETCH_MY_REGISTRIES_SUCCESS,
      data,
    };

    expect(fetchMyRegistriesInfoSuccess(data)).to.deep.equal(expectedResult);
  });

  it('should return the error type with actual error', () => {
    const error = new Error('some error');
    const expectedResult = {
      type: FETCH_MY_REGISTRIES_ERROR,
      error,
    };

    expect(fetchMyRegistriesInfoError(error)).to.deep.equal(expectedResult);
  });
});
