import { fromJS } from 'immutable';

import {
  FETCH_QUICK_PICKS_COLLECTION,
  SET_QUICK_PICKS_COLLECTION,
  FETCH_QUICK_PICKS_COLLECTION_ERROR,
  SELECT_PRODUCTS,
  SET_TOAST_NOTIFICATION,
  UPDATE_PRODUCT_QTY,
  RESET_QUICK_PICKS_COLLECTION,
} from './constants';

const initialState = fromJS({
  registryType: {},
  collections: [],
  products: [],
  configuration: {},
  isLoading: false,
  selectedCollection: {},
  hero: [],
  category: {},
  categories: {},
  error: null,
  selectedProducts: {},
  previousSelectedProducts: {},
  eventType: '',
  toastNotification: {
    content: null,
    show: false,
  },
  cacheKey: 'magicValue',
  cacheHit: false,
});

const updateProductQty = (stateParam, payload) => {
  let state = stateParam;
  const index = state
    .get('products')
    .findIndex(v => v.get('defaultSkuCMS') === payload.defaultSkuCMS);
  const product = state.getIn(['products', index]);
  state = state.setIn(['products', index], product.set('qty', payload.qty));

  if (state.hasIn(['selectedProducts', payload.defaultSkuCMS])) {
    const selectedProduct = state.getIn([
      'selectedProducts',
      payload.defaultSkuCMS,
    ]);
    state = state.setIn(
      ['selectedProducts', payload.defaultSkuCMS],
      selectedProduct.set('qty', payload.qty)
    );
  }
  return state;
};

const reducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case FETCH_QUICK_PICKS_COLLECTION:
      return state.set('isLoading', true).set('error', false);
    case SET_QUICK_PICKS_COLLECTION:
      return state.merge({
        ...payload,
        isLoading: false,
      });
    case RESET_QUICK_PICKS_COLLECTION:
      return state.set('collections', []).set('selectedProducts', {});
    case FETCH_QUICK_PICKS_COLLECTION_ERROR:
      return state.merge({
        ...error,
        isLoading: false,
      });
    case SELECT_PRODUCTS:
      if (!state.hasIn(['selectedProducts', payload.defaultSkuCMS])) {
        return state.set(
          'selectedProducts',
          state
            .get('selectedProducts')
            .set(payload.defaultSkuCMS, fromJS(payload))
        );
      }
      return state.set(
        'selectedProducts',
        state.get('selectedProducts').delete(payload.defaultSkuCMS)
      );
    case UPDATE_PRODUCT_QTY:
      return updateProductQty(state, payload);
    case SET_TOAST_NOTIFICATION:
      return state.set(
        'toastNotification',
        state.get('toastNotification').merge(payload)
      );
    default:
      return state;
  }
};

export default reducer;
