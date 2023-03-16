import { fromJS } from 'immutable';
import {
  fetchRegistryOwnerItemsFirstCategoryError,
  fetchRegistryOwnerItemsFirstCategorySuccess,
  fetchRegistryOwnerRemainingCategoryError,
  removeRegistryItemError,
  removeRegistryItem,
  removeRegistryItemSuccess,
  undoRemoveRegistryItemError,
  undoRemoveRegistryItem,
  undoRemoveRegistryItemSuccess,
  markFavRegistryItemError,
  markFavRegistryItemSuccess,
  fetchRegistryOwnerRemainingCategory,
  getUpdatedCategoryData,
  fetchRegistryOwnerRemainingCategorySuccess,
  openRegistrantDetailModal,
  openGoodyBoxModalOpen,
  setFacetData,
  updateBopisCheckBoxState,
} from '../actions';
import {
  fetchRegistryOwnerItemsFirstCategory,
  resetIsItemsFetchingStatus,
} from '../RegistryOwnerItemSagaInjection';
import { updatedRegistryFromQuickAddAction } from '../RegistryOwnerAction';
import RegistryOwnerItemsCategoryReducer, {
  handleRemoveRegistryItem,
  handleUndoRemoveRegistryItem,
  handleMarkFavRegistryItem,
} from '../RegistryOwnerReducer';
import { MARK_FAV_REGISTRY_ITEM } from '../constants';

describe('RegistryOwnerItemsCategoryReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      firstCategorydata: null,
      error: null,
      variation: '',
      isItemsFetching: true,
      isRemainingItemFetching: false,
      updatedSkuId: '',
      siteSpectDateSort: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state
      .set('error', null)
      .set('isItemsFetching', true)
      .set('firstCategorydata', null)
      .set('variation', '')
      .set('isFilterItemReady', true)
      .set('isPriceItemFetching', false);
    expect(
      RegistryOwnerItemsCategoryReducer(
        undefined,
        fetchRegistryOwnerItemsFirstCategory()
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerItemsFirstCategoryError action correctly', () => {
    const error = new Error('some error');
    const expectedResult = state
      .set('error', error)
      .set('isItemsFetching', false)
      .set('firstCategorydata', null)
      .set('isSocialAnnexReady', true);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerItemsFirstCategoryError(error)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the resetIsItemsFetchingStatus action correctly', () => {
    const expectedResult = state.set('isItemsFetching', true);

    expect(
      RegistryOwnerItemsCategoryReducer(state, resetIsItemsFetchingStatus())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerItemsFirstCategorySuccess if action correctly', () => {
    const data = { registryItemList: [{ test: 'test' }] };
    const expectedResult = state
      .set('error', null)
      .set('isItemsFetching', false)
      .set('firstCategorydata', fromJS([data]))
      .set('variation', 'Category');

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerItemsFirstCategorySuccess(data)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerRemainingCategorySuccess action', () => {
    const fromReplace = true;
    const data = {
      atgResponse: {
        '10001_BEDDING': {
          registryItemList: [{ skuid: '4322' }],
        },
      },
    };
    let arr = [{ registryItemList: [] }];
    state = state.set('firstCategorydata', fromJS(arr));
    arr = arr.concat(Object.values(data.atgResponse));
    const expectedResult = state
      .set('isRemainingItemFetching', false)
      .set('fromReplace', fromReplace)
      .set('firstCategorydata', fromJS(arr));

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerRemainingCategorySuccess(data, false, fromReplace)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerRemainingCategorySuccess action in date sort', () => {
    const fromReplace = true;
    const data = {
      atgResponse: {
        JDAAllCategoryBucket: {
          registryItemList: [{ skuid: '4322' }],
        },
      },
    };
    const arr = [{ registryItemList: [] }];
    state = state.set('firstCategorydata', fromJS(arr));
    const arrDate = arr[0].registryItemList.concat(
      Object.values(data.atgResponse.JDAAllCategoryBucket.registryItemList)
    );
    arr[0].registryItemList = arrDate;
    const expectedResult = state
      .set('isRemainingItemFetching', false)
      .set('fromReplace', fromReplace)
      .set('firstCategorydata', fromJS(arr));

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerRemainingCategorySuccess(data, true, fromReplace)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the removeRegistryItemError action correctly', () => {
    const error = new Error('some error');
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', error)
      .set('isFetching', false)
      .set('isItemDeleted', false)
      .set('updatedSkuId', updatedSkuId)
      .set('firstCategorydata', null);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        removeRegistryItemError(error, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the removeRegistryItem action correctly', () => {
    const data = [{ test: 'test' }];
    const updatedSkuId = '';
    const expectedResult = state
      .set('isFetching', true)
      .set('isItemDeleted', false)
      .set('error', null);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        removeRegistryItem(data, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the removeRegistryItemSuccess action correctly', () => {
    const data = [{ test: 'test' }];
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', null)
      .set('isFetching', false)
      .set('isItemDeleted', true)
      .set('updatedSkuId', updatedSkuId)
      .set('firstCategorydata', fromJS(data));

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        removeRegistryItemSuccess(data, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the markFavRegistryItemError action correctly', () => {
    const error = new Error('some error');
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', error)
      .set('isFetching', false)
      .set('updatedSkuId', updatedSkuId)
      .set('firstCategorydata', null);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        markFavRegistryItemError(error, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the undoRemoveRegistryItemError action correctly', () => {
    const error = new Error('some error');
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', error)
      .set('isFetching', false)
      .set('updatedSkuId', updatedSkuId);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        undoRemoveRegistryItemError(error, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the undoRemoveRegistryItem action correctly', () => {
    const expectedResult = state.set('isFetching', true).set('error', null);
    expect(
      RegistryOwnerItemsCategoryReducer(state, undoRemoveRegistryItem())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the removeRegistryItemSuccess action correctly', () => {
    const data = [{ test: 'test' }];
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', null)
      .set('isFetching', false)
      .set('updatedSkuId', updatedSkuId)
      .set('firstCategorydata', fromJS(data));

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        undoRemoveRegistryItemSuccess(data, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the markFavRegistryItem action correctly', () => {
    const actionData = { type: MARK_FAV_REGISTRY_ITEM };

    const expectedResult = state.set('error', null).set('isFetching', true);

    expect(RegistryOwnerItemsCategoryReducer(state, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the markFavRegistryItemSuccess action correctly', () => {
    const data = [{ test: 'test' }];
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', null)
      .set('isFetching', false)
      .set('updatedSkuId', updatedSkuId)
      .set('firstCategorydata', fromJS(data));

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        markFavRegistryItemSuccess(data, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the markFavRegistryItemSuccess action correctly when data is not available', () => {
    const data = undefined;
    const updatedSkuId = '';
    const expectedResult = state
      .set('error', null)
      .set('isFetching', false)
      .set('updatedSkuId', updatedSkuId);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        markFavRegistryItemSuccess(data, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerItemsFirstCategorySuccess action correctly when data doesnot have registryItemList', () => {
    const data = { atgResponse: null };
    const expectedResult = state
      .set('error', null)
      .set('isItemsFetching', false)
      .set('firstCategorydata', fromJS([]))
      .set('variation', 'Category');

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerItemsFirstCategorySuccess(data)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerItemsFirstCategorySuccess when date sort applied', () => {
    const data = { registryItemList: [{ test: 'test' }] };
    const expectedResult = state
      .set('error', null)
      .set('isItemsFetching', false)
      .set('isFilterItemReady', true)
      .set('firstCategorydata', fromJS([data]))
      .set('variation', 'Date');

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerItemsFirstCategorySuccess(data, true)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerRemainingCategoryError action correctly', () => {
    const error = new Error('some error');
    const expectedResult = state
      .set('remainingCategoryError', error)
      .set('isRemainingItemFetching', false)
      .set('isSocialAnnexReady', true);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerRemainingCategoryError(error)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryOwnerRemainingCategory action correctly', () => {
    const registryId = '546840256';
    const eventTypeCode = 'BA1';
    const eventDate = '11/30/2018';
    const isDateSort = false;
    const bypassCertonaCall = undefined;
    const expectedResult = state
      .set('isRemainingItemFetching', true)
      .set('isSocialAnnexReady', true);

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        fetchRegistryOwnerRemainingCategory(
          registryId,
          eventTypeCode,
          eventDate,
          isDateSort,
          bypassCertonaCall
        )
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the getUpdatedCategoryData action correctly', () => {
    const productObj = {};
    const updatedSkuId = '';
    const expectedResult = state
      .set('isFetching', false)
      .set('error', null)
      .set('updatedSkuId', updatedSkuId)
      .set('firstCategorydata', fromJS(productObj));

    expect(
      RegistryOwnerItemsCategoryReducer(
        state,
        getUpdatedCategoryData(productObj, updatedSkuId)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updatedRegistryFromQuickAddAction action correctly', () => {
    const result = RegistryOwnerItemsCategoryReducer(
      state,
      updatedRegistryFromQuickAddAction()
    );
    const expectedResult = state.set(
      'isQuickitemAddedTS',
      result.get('isQuickitemAddedTS')
    );

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the isRegistrantDetailModalOpen action correctly', () => {
    const result = RegistryOwnerItemsCategoryReducer(
      state,
      openRegistrantDetailModal()
    );
    const expectedResult = state
      .set(
        'isRegistrantDetailModalOpen',
        result.get('isRegistrantDetailModalOpen')
      )
      .set('registrantModalData', result.get('registrantModalData'));

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the isGoodyBoxModalOpen action correctly', () => {
    const result = RegistryOwnerItemsCategoryReducer(
      state,
      openGoodyBoxModalOpen()
    );
    const expectedResult = state.set(
      'isGoodyBoxModalOpen',
      result.get('isGoodyBoxModalOpen')
    );

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the setFacetData action correctly', () => {
    const data = [{}];
    const result = RegistryOwnerItemsCategoryReducer(state, setFacetData(data));
    const expectedResult = state.set('facetsData', result.get('facetsData'));

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the updateBopisCheckBoxState action correctly', () => {
    const data = {};
    const result = RegistryOwnerItemsCategoryReducer(
      state,
      updateBopisCheckBoxState(data)
    );
    const expectedResult = state.set(
      'checkBoxState',
      result.get('checkBoxState')
    );

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the close modal action correctly', () => {
    const actionData = { type: 'BBB/CLOSE_MODAL' };
    const result = RegistryOwnerItemsCategoryReducer(state, actionData);

    const expectedResult = state
      .set('isRegistrantDetailModalOpen', false)
      .set('registrantModalData', undefined)
      .set('isGoodyBoxModalOpen', false);

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the location change action correctly', () => {
    const actionData = { type: '@@router/LOCATION_CHANGE' };
    const result = RegistryOwnerItemsCategoryReducer(state, actionData);
    const expectedResult = state
      .set(
        'isRegistrantDetailModalOpen',
        result.get('isRegistrantDetailModalOpen')
      )
      .set('registrantModalData', result.get('registrantModalData'));

    expect(result).to.deep.equal(expectedResult);
  });

  it('should handle the default action type', () => {
    const actionData = { type: 'null' };
    const result = RegistryOwnerItemsCategoryReducer(state, actionData);

    expect(result).to.deep.equal(state);
  });

  it('should handle the default action type in handleRemoveRegistryItem function', () => {
    const result = handleRemoveRegistryItem('null', state);

    expect(result).to.deep.equal(state);
  });

  it('should handle the default action type in handleUndoRemoveRegistryItem function', () => {
    const result = handleUndoRemoveRegistryItem('null', state);

    expect(result).to.deep.equal(state);
  });

  it('should handle the default action type in handleMarkFavRegistryItem function', () => {
    const result = handleMarkFavRegistryItem('null', state);

    expect(result).to.deep.equal(state);
  });
});
