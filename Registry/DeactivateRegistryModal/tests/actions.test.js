import {
  DEACTIVATE_REGISTRY_ACTION,
  DEACTIVATE_REGISTRY_SUCCESS,
  DEACTIVATE_REGISTRY_ERROR,
  CLEAR_DEACTIVATED_REG_ID,
} from '../constants';

import {
  deactivateRegistry,
  deactivateRegistrySuccess,
  deactivateRegistryError,
  clearDeactivatedRegId,
} from '../actions';

describe('#DeactivateRegistryActions', () => {
  it('should return deactivateRegistry', () => {
    const regId = '123456';
    const expectedResult = {
      type: DEACTIVATE_REGISTRY_ACTION,
      regId,
    };

    expect(deactivateRegistry(regId)).to.deep.equal(expectedResult);
  });
  it('deactivateRegistrySuccess', () => {
    const deactivatedRegId = '12345';
    const expectedResult = {
      type: DEACTIVATE_REGISTRY_SUCCESS,
      deactivatedRegId,
    };

    expect(deactivateRegistrySuccess(deactivatedRegId)).to.deep.equal(
      expectedResult
    );
  });

  it('deactivateRegistryError', () => {
    const error = 'error';
    const expectedResult = {
      type: DEACTIVATE_REGISTRY_ERROR,
      error,
    };

    expect(deactivateRegistryError(error)).to.deep.equal(expectedResult);
  });

  it('clearDeactivatedRegId', () => {
    const expectedResult = {
      type: CLEAR_DEACTIVATED_REG_ID,
    };

    expect(clearDeactivatedRegId()).to.deep.equal(expectedResult);
  });
});
