import { fromJS } from 'immutable';
import reducer from '../reducer';

import {
  setQuickPicksCollection,
  fetchQuickPicksCollectionError,
  selectProducts,
  setToastNotification,
  updateProductQty,
  fetchQuickPicksCollection,
  resetQuickPicksCollection,
} from '../actions';

describe(__filename, () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
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
  });

  it('should return the initial state', () => {
    const currentState = reducer(undefined, {});
    expect(currentState.toJS()).to.deep.equal(initialState.toJS());
  });

  it('should return the same states', () => {
    const currentState = reducer(initialState, { type: 'foo' });
    expect(currentState.toJS()).to.deep.equal(initialState.toJS());
  });

  it('should reduce: fetchQuickPicksCollection', () => {
    const currentState = reducer(initialState, fetchQuickPicksCollection('a'));
    expect(currentState.toJS()).to.have.property('isLoading', true);
  });

  it('should reduce: setQuickPicksCollection', () => {
    const currentState = reducer(
      initialState,
      setQuickPicksCollection({ collections: [1] })
    );
    expect(currentState.toJS()).to.have.property('collections');
  });

  it('should call resetQuickPicksCollection', () => {
    const currentState = reducer(initialState, resetQuickPicksCollection([]));
    expect(currentState.toJS()).to.have.property('collections');
  });

  it('should reduce: selectProducts', () => {
    const payload = { defaultSkuCMS: '123' };
    const state = fromJS({
      selectedProducts: { '123': { productId: '123', qty: 1 } },
    });
    const currentState = reducer(state, selectProducts(payload));
    expect(currentState.toJS()).to.have.property('selectedProducts');
  });

  it('should reduce: selectProducts with not change', () => {
    const currentState = reducer(
      fromJS({ selectedProducts: { '123': { productId: '123', qty: 1 } } }),
      selectProducts({ productId: '123', qty: 1 })
    );
    expect(currentState.toJS()).to.have.property('selectedProducts');
  });

  it('should reduce: setToastNotification', () => {
    const currentState = reducer(
      initialState,
      setToastNotification({ foo: 'bar' })
    );
    expect(currentState.toJS()).to.have.property('toastNotification');
  });

  it('should reduce: fetchQuickPicksCollectionError', () => {
    const currentState = reducer(
      initialState,
      fetchQuickPicksCollectionError({
        error: { message: 'There was an error!' },
      })
    );
    expect(currentState.toJS())
      .to.have.property('error')
      .that.is.a('object');
  });

  it('should reduce: updateProductQty and selected products', () => {
    const payload = { defaultSkuCMS: '123' };
    const currentState = reducer(
      fromJS({
        selectedProducts: { '123': { productId: '123', qty: 1 } },
        products: [{ productId: '123', qty: 1 }],
      }),
      updateProductQty(payload)
    );
    expect(currentState.toJS()).to.have.property('selectedProducts');
  });

  it('should reduce: updateProductQty Only', () => {
    const currentState = reducer(
      fromJS({
        products: [{ productId: '123', qty: 1 }],
      }),
      updateProductQty({ productId: '123', qty: 3 })
    );
    expect(currentState.toJS()).to.have.property('products');
  });
});
