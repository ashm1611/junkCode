import { put, takeLatest } from 'redux-saga/effects';
import { REPLACE_PRODUCT_FROM_REGISTRY } from '../constants';
import {
  replaceProductFromRegistryError,
  replaceProductFromRegistrySuccess,
} from '../actions';
import {
  replaceProductFromRegistrySaga,
  replaceProductFromRegistry,
} from '../sagas';

describe('ReplaceProductFromRegistrySaga', () => {
  describe('#replaceProductFromRegistry', () => {
    let replaceProductFromRegistryGenerator;
    beforeEach(() => {
      const skuId = '77122';
      const prodId = '1077122';
      const registryId = '520589269';
      const qty = '1';
      const registryName = 'Baby';
      const actionData = {
        payload: {
          discontinuedProductDetails: {
            skuId,
            prodId,
            registryId,
            qty,
            registryName,
          },
          replacedProductDetails: {
            skuId,
            prodId,
            registryId,
            qty,
            registryName,
          },
        },
      };
      replaceProductFromRegistryGenerator = replaceProductFromRegistry(
        actionData
      );
      replaceProductFromRegistryGenerator.next();
    });
    it('should dispatch the "replaceProductFromRegistrySuccess" action for error response', () => {
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: null,
          body: { response: {} },
        },
      };
      const putDescriptor = replaceProductFromRegistryGenerator.next(response)
        .value;

      expect(putDescriptor).to.deep.equal(
        put(replaceProductFromRegistrySuccess())
      );
    });
    it('should dispatch the "replaceProductFromRegistryError" action for error response', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: null,
          body: { response: {} },
        },
      };
      const putDescriptor = replaceProductFromRegistryGenerator.next(response)
        .value;

      expect(putDescriptor).to.deep.equal(
        put(replaceProductFromRegistryError())
      );
    });
  });
  describe('#replaceProductFromRegistrySaga', () => {
    let replaceProductFromRegistryGenerator;

    beforeEach(() => {
      replaceProductFromRegistryGenerator = replaceProductFromRegistrySaga();
    });
    it('should start task to watch for REPLACE_PRODUCT_FROM_REGISTRY action', () => {
      const takeLatestDescriptor = replaceProductFromRegistryGenerator.next()
        .value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(REPLACE_PRODUCT_FROM_REGISTRY, replaceProductFromRegistry)
      );
    });
  });
});
