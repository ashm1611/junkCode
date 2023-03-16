import { fromJS } from 'immutable';
import {
  makeSelectIsFetching,
  makeSelectQuickAddItems,
  selectQuickAddItemsForRegType,
  makeSelectQuickAddProducts,
} from '../selectors';
import { REGISTRY_QUICK_ADD } from '../constants';

describe('RegistryQuickAddSelectors', () => {
  describe('#makeSelectIsFetching', () => {
    const selector = makeSelectIsFetching();
    it('should select isFetching', () => {
      const isFetchingQuickAddItems = false;
      const mockedState = fromJS({
        [REGISTRY_QUICK_ADD]: {
          isFetchingQuickAddItems,
        },
      });
      expect(selector(mockedState)).to.deep.equal(isFetchingQuickAddItems);
    });
  });
  describe('#makeSelectQuickAddItems', () => {
    const selector = makeSelectQuickAddItems();
    it('should select quickAddItems', () => {
      const quickAddItems = { prod1: 'product1' };
      const mockedState = fromJS({
        [REGISTRY_QUICK_ADD]: {
          quickAddItems,
        },
      });
      expect(selector(mockedState).toJS()).to.deep.equal(quickAddItems);
    });
  });
  describe('#selectQuickAddItemsForRegType', () => {
    const selector = selectQuickAddItemsForRegType();
    it('should selectQuickAddItemsForRegType', () => {
      const regType = 'BA1';
      const mockedState = fromJS({
        [REGISTRY_QUICK_ADD]: {
          regType,
        },
      });
      expect(selector(mockedState)).to.deep.equal(regType);
    });
  });
  describe('#makeSelectQuickAddProducts', () => {
    const selector = makeSelectQuickAddProducts();
    it('should select quickAddProductsData', () => {
      const quickAddProductsData = [{ prod1: 'product1' }];
      const mockedState = fromJS({
        [REGISTRY_QUICK_ADD]: {
          quickAddProductsData,
        },
      });
      expect(selector(mockedState).toJS()).to.deep.equal(quickAddProductsData);
    });
  });
});
