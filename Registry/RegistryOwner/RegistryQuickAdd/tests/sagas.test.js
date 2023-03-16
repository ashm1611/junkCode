import { put, takeLatest } from 'redux-saga/effects';
import {
  fetchRegistryQuickAddItemsSuccess,
  fetchRegistryQuickAddItemsError,
} from '../actions';

import {
  fetchRegistryQuickAddItems,
  fetchRegistryQuickAddItemsSaga,
} from '../sagas';
import { FETCH_REGISTRY_QUICK_ADD_ITEMS } from '../constants';

describe('fetchRegistryQuickAddItemsSaga', () => {
  describe('#fetchRegistryQuickAddItemsSaga Saga', () => {
    let fetchRegistryQuickAddItemsSagaGenerator;
    let productInformation;
    let products;
    beforeEach(() => {
      productInformation = {
        prod1: 'prod1',
        prod2: 'prod2',
      };
      products = [
        {
          product_id: '1042372998',
          recommendedQuantity: '1',
          badgeDescription: null,
        },
      ];
      fetchRegistryQuickAddItemsSagaGenerator = fetchRegistryQuickAddItems(
        'RM1001'
      );
      fetchRegistryQuickAddItemsSagaGenerator.next();
    });

    it('should dispatch the "fetchRegistryQuickAddItemsSuccess" action if response contains no error', () => {
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: { message: '' },
          data: { productInformation, products },
        },
      };
      const putDescriptor = fetchRegistryQuickAddItemsSagaGenerator.next(
        response
      ).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryQuickAddItemsSuccess(productInformation, products))
      );
    });

    it('should dispatch the "fetchRegistryQuickAddItemsError" action if response contains error', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: 'Some Error' },
          data: {},
        },
      };
      const putDescriptor = fetchRegistryQuickAddItemsSagaGenerator.next(
        response
      ).value;

      expect(putDescriptor).to.deep.equal(
        put(
          fetchRegistryQuickAddItemsError(response.body.errorMessages.message)
        )
      );
    });

    it('should call the "fetchCollegeListByStateError" action for error response', () => {
      const error = new Error('some error');
      const response = { body: error };
      const putDescriptor = fetchRegistryQuickAddItemsSagaGenerator.throw(
        response
      ).value;

      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryQuickAddItemsError(error))
      );
    });
  });
  describe('#fetchRegistryQuickAddItemsSaga Saga', () => {
    let fetchRegistryQuickAddItemsSagaGenerator;

    beforeEach(() => {
      fetchRegistryQuickAddItemsSagaGenerator = fetchRegistryQuickAddItemsSaga();
    });

    it('should start task to watch for FETCH_REGISTRY_QUICK_ADD_ITEMS action', () => {
      const takeLatestDescriptor = fetchRegistryQuickAddItemsSagaGenerator.next()
        .value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_REGISTRY_QUICK_ADD_ITEMS, fetchRegistryQuickAddItems)
      );
    });
  });
});
