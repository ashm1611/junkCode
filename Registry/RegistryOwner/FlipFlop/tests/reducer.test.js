import { fromJS, Map } from 'immutable';
import FlipFlopReducerExtn, { FlipFlopReducer } from '../reducer';

import {
  getFlipFlopData,
  getFlipFlopDataError,
  getFlipFlopDataSuccess,
  setFlipFlopCookie,
  deleteFlipFlopData,
  setIsItemsCountLow,
} from '../actions';

describe('FlipFlopReducerExtn', () => {
  let state;
  const initialState = fromJS({
    isItemsFetching: false,
    flipFlopItemsList: null,
    totalItemsCount: 0,
    errorMsg: null,
    flipFlopCookieCountInStore: null,
    regType: null,
    flipFlopSelectedCategories: null,
    isItemsCountLow: false,
  });
  beforeEach(() => {
    state = fromJS({
      isItemsFetching: false,
      flipFlopItemsList: null,
      totalItemsCount: 0,
      errorMsg: null,
      flipFlopCookieCountInStore: [],
      regType: null,
      isFlipFlopEnabled: null,
      isItemsCountLow: false,
    });
  });

  it('should return the initial state with undefined state', () => {
    expect(FlipFlopReducer(undefined, {})).to.deep.equal(initialState);
  });
  it('should return the initial state with undefined state', () => {
    expect(FlipFlopReducerExtn(undefined, {})).to.deep.equal(initialState);
  });

  it('should call getFlipFlopData and return the initial state', () => {
    const expectedResult = state
      .set('isItemsFetching', true)
      .set('flipFlopItemsList', null)
      .set('totalItemsCount', 0)
      .set('errorMsg', null)
      .set('flipFlopCookieCountInStore', fromJS([]))
      .set('regType', null);

    expect(FlipFlopReducerExtn(state, getFlipFlopData())).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the getFlipFlopDataError action correctly', () => {
    const expectedResult = state
      .set('isItemsFetching', false)
      .set('errorMsg', 'Error Msg');

    expect(
      FlipFlopReducerExtn(state, getFlipFlopDataError('Error Msg'))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the getFlipFlopDataSuccess action correctly', () => {
    const data = [
      {
        test1: 'test',
        COLLECTION_FLAG: '0',
        PERSONALIZATION_TYPE: undefined,
        CUSTOMIZATION_OFFERED_FLAG: ['NO'],
      },
      { test2: 'test', COLLECTION_FLAG: '1', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '1', PERSONALIZATION_TYPE: undefined },
      { test5: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test6: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    const expecteddata = [
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test5: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test6: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    const count = 8;
    const expectedResult = state
      .set('flipFlopItemsList', fromJS(expecteddata))
      .set('isItemsFetching', false)
      .set('totalItemsCount', count)
      .set('flipFlopCookieCountInStore', fromJS([]))
      .set('regType', 'BRD')
      .set('isItemsCountLow', true);

    expect(
      FlipFlopReducerExtn(
        state,
        getFlipFlopDataSuccess(count, data, 1, 'BRD', true, true)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the getFlipFlopDataSuccess action correctly while having items in list', () => {
    const data = [
      { test5: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test6: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test7: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test8: 'test', COLLECTION_FLAG: '1', PERSONALIZATION_TYPE: undefined },
    ];
    const flipFlopListInState = [
      { test1: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test2: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    state = fromJS({
      isItemsFetching: false,
      flipFlopItemsList: flipFlopListInState,
      totalItemsCount: 100,
      errorMsg: null,
      flipFlopCookieCountInStore: [],
      regType: 'BRD',
      isFlipFlopEnabled: null,
      isItemsCountLow: true,
    });
    const expecteddata = [
      { test4: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test5: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test6: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test7: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    const count = 100;
    const expectedResult = state
      .set('flipFlopItemsList', fromJS(expecteddata))
      .set('isItemsFetching', false)
      .set('totalItemsCount', count)
      .set('flipFlopCookieCountInStore', fromJS([]))
      .set('isItemsCountLow', true);

    expect(
      FlipFlopReducerExtn(
        state,
        getFlipFlopDataSuccess(count, data, 1, 'BRD', true)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the getFlipFlopDataSuccess action correctly while having personalized items in list', () => {
    const data = [
      { test5: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test6: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test7: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: ['N'] },
      { test8: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: ['Y'] },
    ];
    const flipFlopListInState = [
      { test1: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test2: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    state = fromJS({
      isItemsFetching: false,
      flipFlopItemsList: flipFlopListInState,
      totalItemsCount: 100,
      regType: 'BRD',
      isItemsCountLow: false,
    });
    const expecteddata = [
      { test2: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test5: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test6: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test7: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: ['N'] },
    ];
    const count = 100;
    const expectedResult = state
      .set('flipFlopItemsList', fromJS(expecteddata))
      .set('isItemsFetching', false)
      .set('totalItemsCount', count)
      .set('regType', 'BRD')
      .set('isItemsCountLow', false);

    expect(
      FlipFlopReducerExtn(
        state,
        getFlipFlopDataSuccess(count, data, 4, 'BRD', false)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the setFlipFlopCookie action correctly when cookie is not present in store', () => {
    const flipFlopCookieCountInStore = null;
    const immutableFlipFlopCookieCountInStore = new Map();
    const expectedFlipFlopCookieCountInStore = immutableFlipFlopCookieCountInStore.set(
      'flipFlopAllCategory_BRD',
      150
    );
    const flipFlopSelectedCategories = null;
    const immutableFlipFLopSelectedCategories = new Map();
    const expectedFlipFLopSelectedCategories = immutableFlipFLopSelectedCategories.set(
      'BRD',
      'flipFlopAllCategory'
    );
    state = fromJS({
      flipFlopCookieCountInStore,
      flipFlopSelectedCategories,
    });
    const expectedResult = state
      .set(
        'flipFlopCookieCountInStore',
        fromJS(expectedFlipFlopCookieCountInStore)
      )
      .set('flipFlopSelectedCategories', expectedFlipFLopSelectedCategories);

    expect(
      FlipFlopReducerExtn(
        state,
        setFlipFlopCookie(150, 'BRD', 'flipFlopAllCategory')
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the setFlipFlopCookie action correctly', () => {
    const immutableFlipFlopCookieCountInStore = new Map();
    const flipFlopCookieCountInStore = immutableFlipFlopCookieCountInStore.set(
      'flipFlopAllCategory_BRD',
      100
    );

    const expectedFlipFlopCookieCountInStore = immutableFlipFlopCookieCountInStore.set(
      'flipFlopAllCategory_BRD',
      150
    );
    const flipFlopSelectedCategories = immutableFlipFlopCookieCountInStore.set(
      'BRD',
      'Bedding'
    );
    const expectedFlipFLopSelectedCategories = immutableFlipFlopCookieCountInStore.set(
      'BRD',
      'flipFlopAllCategory'
    );

    state = fromJS({
      flipFlopCookieCountInStore,
      flipFlopSelectedCategories,
    });

    const expectedResult = state
      .set(
        'flipFlopCookieCountInStore',
        fromJS(expectedFlipFlopCookieCountInStore)
      )
      .set('flipFlopSelectedCategories', expectedFlipFLopSelectedCategories);

    expect(
      FlipFlopReducerExtn(
        state,
        setFlipFlopCookie(150, 'BRD', 'flipFlopAllCategory')
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the deleteFlipFlopData action correctly when store have the list', () => {
    const itemsViewed = 1;
    const flipFlopListInState = [
      { test1: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test2: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    const expectedFlipFlopListInState = [
      { test2: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
    ];
    state = fromJS({
      isItemsFetching: false,
      flipFlopItemsList: flipFlopListInState,
    });
    const expectedResult = state.set(
      'flipFlopItemsList',
      fromJS(expectedFlipFlopListInState)
    );

    expect(
      FlipFlopReducerExtn(state, deleteFlipFlopData(itemsViewed))
    ).to.deep.equal(expectedResult);
  });

  it('should handle setIsItemsCountLow action correctly', () => {
    const expectedResult = state.set('isItemsCountLow', true);
    expect(FlipFlopReducerExtn(state, setIsItemsCountLow(true))).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the default action correctly', () => {
    const expectedResult = state
      .set('isItemsFetching', false)
      .set('flipFlopItemsList', null)
      .set('totalItemsCount', 0)
      .set('errorMsg', null)
      .set('flipFlopCookieCountInStore', fromJS([]))
      .set('regType', null)
      .set('isFlipFlopEnabled', null)
      .set('isItemsCountLow', false);
    expect(FlipFlopReducerExtn(state, '')).to.deep.equal(expectedResult);
  });
});
