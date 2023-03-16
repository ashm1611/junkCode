import { setFavoriteStoreId } from '../actions';
import { SET_FAVORITE_STOREID } from '../constants';

describe(__filename, () => {
  describe('#setFavoriteStoreId', () => {
    it('should return the correct type', () => {
      const data = '213';
      const actual = setFavoriteStoreId(data);
      const expected = {
        type: SET_FAVORITE_STOREID,
        data,
      };
      expect(actual).to.deep.equal(expected);
    });
  });
});
