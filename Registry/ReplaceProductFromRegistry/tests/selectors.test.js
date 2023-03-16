import { fromJS } from 'immutable';
import { closeModalState } from '../selectors';

describe('ReplaceProductFromRegistrySelectors', () => {
  describe('#closeModalState', () => {
    const closeModalStateSelector = closeModalState();

    it('should select value of closeModalState', () => {
      const activeModalState = {
        closeModalState: undefined,
      };

      const mockedState = fromJS({
        ReplaceProductFromRegistry: {
          activeModalState,
        },
      });

      expect(closeModalStateSelector(mockedState)).to.deep.equal(
        fromJS(activeModalState.closeModalState)
      );
    });
  });
});
