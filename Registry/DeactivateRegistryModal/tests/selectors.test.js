import { fromJS } from 'immutable';
import {
  makeSelectIsFetching,
  makeSelectDeactivatedRegId,
  makeSelectError,
} from '../selectors';
import { DEACTIVATE_REGISTRY_KEY } from '../constants';

describe('DeactivateRegistrySelectors', () => {
  describe('#makeSelectIsFetching', () => {
    const selector = makeSelectIsFetching();
    it('should select isFetching', () => {
      const isFetching = false;
      const mockedState = fromJS({
        [DEACTIVATE_REGISTRY_KEY]: {
          isFetching,
        },
      });
      expect(selector(mockedState)).to.deep.equal(isFetching);
    });
  });
  describe('#makeSelectDeactivatedRegId', () => {
    const selector = makeSelectDeactivatedRegId();
    it('should select deactivatedRegId', () => {
      const deactivatedRegId = '123';
      const mockedState = fromJS({
        [DEACTIVATE_REGISTRY_KEY]: {
          deactivatedRegId,
        },
      });
      const mockedStateObj = fromJS({
        [DEACTIVATE_REGISTRY_KEY]: {
          abc: '123',
        },
      });
      expect(selector(mockedState)).to.deep.equal(deactivatedRegId);
      expect(selector(mockedStateObj)).to.deep.equal(null);
    });
  });
  describe('#makeSelectError', () => {
    const selector = makeSelectError();
    it('should select error', () => {
      const error = 'some error';
      const mockedState = fromJS({
        [DEACTIVATE_REGISTRY_KEY]: {
          error,
        },
      });
      expect(selector(mockedState)).to.deep.equal(error);
    });
  });
});
