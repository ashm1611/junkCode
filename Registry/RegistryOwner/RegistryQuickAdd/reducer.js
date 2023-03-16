import { fromJS } from 'immutable';
import {
  FETCH_REGISTRY_QUICK_ADD_ITEMS,
  FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR,
  FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS,
} from './constants';

const initialState = fromJS({
  quickAddItems: null,
  regType: null,
  isFetchingQuickAddItems: false,
  error: null,
  quickAddProductsData: null,
});

function RegistryQuickAddReducer(
  state = initialState,
  { type, error, data, productsData, regType }
) {
  switch (type) {
    case FETCH_REGISTRY_QUICK_ADD_ITEMS:
      return state
        .set('isFetchingQuickAddItems', true)
        .set('regType', regType)
        .set('quickAddItems', null)
        .set('error', null)
        .set('quickAddProductsData', null);
    case FETCH_REGISTRY_QUICK_ADD_ITEMS_SUCCESS:
      return state
        .set('isFetchingQuickAddItems', false)
        .set('quickAddItems', data)
        .set('quickAddProductsData', productsData);
    case FETCH_REGISTRY_QUICK_ADD_ITEMS_ERROR:
      return state.set('isFetchingQuickAddItems', false).set('error', error);
    default:
      return state;
  }
}

export default RegistryQuickAddReducer;
