import { fromJS } from 'immutable';

import { selectFavStore, makeSelectFavStoreId } from '../selectors';

describe(__filename, () => {
  describe('registryFavoriteStoreSelector', () => {
    describe('#selectFavStore', () => {
      it('should select the favStore state from redux store', () => {
        const favStoreId = { favStoreId: '12' };
        const mockedState = fromJS({
          favStore: favStoreId,
        });

        expect(selectFavStore(mockedState).toJS()).to.deep.equal(favStoreId);
      });
      it('should select the makeSelectFavStoreId state from redux store', () => {
        const favStoreId = { favStoreId: '12' };
        const mockedState = fromJS({
          favStore: favStoreId,
        });
        const selector = makeSelectFavStoreId();
        expect(selector(mockedState)).to.deep.equal('12');
      });
    });
  });
});
