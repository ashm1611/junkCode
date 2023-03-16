import {
  replaceProductFromRegistry,
  replaceProductFromRegistrySuccess,
  replaceProductFromRegistryError,
} from '../actions';

import {
  REPLACE_PRODUCT_FROM_REGISTRY,
  REPLACE_PRODUCT_FROM_REGISTRY_SUCCESS,
  REPLACE_PRODUCT_FROM_REGISTRY_ERROR,
} from '../constants';

describe('ReplaceProductFromRegistryActionTest', () => {
  describe('#replaceProductFromRegistry', () => {
    it('should return the correct type', () => {
      const payload = {};

      expect(replaceProductFromRegistry(payload)).to.deep.equal({
        type: REPLACE_PRODUCT_FROM_REGISTRY,
        payload,
      });
    });
  });
  describe('#replaceProductFromRegistrySuccess', () => {
    it('should return the correct type', () => {
      const data = {};

      expect(replaceProductFromRegistrySuccess(data)).to.deep.equal({
        type: REPLACE_PRODUCT_FROM_REGISTRY_SUCCESS,
        data,
      });
    });
  });
  describe('#replaceProductFromRegistryError', () => {
    it('should return the correct type', () => {
      const error = {};

      expect(replaceProductFromRegistryError(error)).to.deep.equal({
        type: REPLACE_PRODUCT_FROM_REGISTRY_ERROR,
        error,
      });
    });
  });
});
