import { fromJS } from 'immutable';
import RegistryQuickAddReducer from '../reducer';
import {
  fetchRegistryQuickAddItems,
  fetchRegistryQuickAddItemsSuccess,
  fetchRegistryQuickAddItemsError,
} from '../actions';

describe('RegistryQuickAddReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      quickAddItems: null,
      regType: null,
      isFetchingQuickAddItems: false,
      error: null,
      quickAddProductsData: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(RegistryQuickAddReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the fetchRegistryQuickAddItems action correctly', () => {
    const regType = 'BA1';
    const expectedResult = state
      .set('isFetchingQuickAddItems', true)
      .set('regType', regType)
      .set('quickAddItems', null)
      .set('error', null)
      .set('quickAddProductsData', null);

    expect(
      RegistryQuickAddReducer(
        state,
        fetchRegistryQuickAddItems('1234', regType)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryQuickAddItemsSuccess action correctly', () => {
    const data = {
      prod1: 'product1',
    };
    const productsData = [
      {
        product_id: '1042372998',
        recommendedQuantity: '1',
        badgeDescription: null,
      },
    ];
    const expectedResult = state
      .set('isFetchingQuickAddItems', false)
      .set('quickAddItems', data)
      .set('quickAddProductsData', productsData);

    expect(
      RegistryQuickAddReducer(
        state,
        fetchRegistryQuickAddItemsSuccess(data, productsData)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryQuickAddItemsError action correctly', () => {
    const error = 'error';
    const expectedResult = state
      .set('isFetchingQuickAddItems', false)
      .set('error', error);

    expect(
      RegistryQuickAddReducer(state, fetchRegistryQuickAddItemsError(error))
    ).to.deep.equal(expectedResult);
  });
});
