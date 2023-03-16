import {
  FETCH_REGISTRY_QUICK_ADD_ITEMS,
  FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS,
  FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR,
} from '../constants';

import {
  fetchRegistryQuickAddItems,
  fetchRegistryQuickAddItemsSuccess,
  fetchRegistryQuickAddItemsError,
} from '../actions';

describe('#fetchRegistryQuickAddItems', () => {
  it('should return fetchRegistryQuickAddItems', () => {
    const quickAddId = 'RM1001';
    const regType = 'BA1';
    const expectedResult = {
      type: FETCH_REGISTRY_QUICK_ADD_ITEMS,
      quickAddId,
      regType,
    };

    expect(fetchRegistryQuickAddItems(quickAddId, regType)).to.deep.equal(
      expectedResult
    );
  });
  it('should return the correct type FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS', () => {
    const items = { product1: 'product1', product2: 'product2' };
    const products = [{ product1: 'product1', product2: 'product2' }];
    const expectedResult = {
      type: FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS,
      data: items,
      productsData: products,
    };

    expect(fetchRegistryQuickAddItemsSuccess(items, products)).to.deep.equal(
      expectedResult
    );
  });

  it('should return the correct type FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR', () => {
    const error = 'error';
    const expectedResult = {
      type: FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR,
      error,
    };

    expect(fetchRegistryQuickAddItemsError(error)).to.deep.equal(
      expectedResult
    );
  });
});
