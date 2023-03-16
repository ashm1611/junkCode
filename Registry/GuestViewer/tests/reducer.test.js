import { fromJS } from 'immutable';
import CopyRegistryReducer, {
  BuyOffContextReducer,
  GiftGiverReducer,
} from '../reducer';
import {
  resetIsItemsFetchingStatus,
  updateBopisCheckBoxState,
  setFacetData,
} from '../actions';
import {
  COPY_REGISTRY,
  FETCH_COPY_REGISTRY_SUCCESS,
  FETCH_COPY_REGISTRY_ERROR,
  RESET_COPY_REGISTRY_RESPONSE,
  FETCH_FIRST_CATEGORY,
  FETCH_FIRST_CATEGORY_SUCCESS,
  FETCH_FIRST_CATEGORY_ERROR,
  FETCH_OTHER_CATEGORIES,
  FETCH_OTHER_CATEGORIES_SUCCESS,
  FETCH_OTHER_CATEGORIES_ERROR,
  FETCH_SORTED_DATA,
  FETCH_OOS_CATEGORIES,
  FETCH_OOS_CATEGORIES_SUCCESS,
  FETCH_OOS_CATEGORIES_ERROR,
  SET_BUYOFF_CONTEXT,
  SET_BUYOFF_CONTEXT_VALUE,
  SET_BUYOFF_CONTEXT_ERROR,
} from '../constants';

describe('BuyOffContextReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isFetching: true,
      error: null,
      buyOffContext: null,
    });
  });
  it('should return the intital state', () => {
    const expectedResult = state;
    expect(BuyOffContextReducer(undefined, {})).to.deep.equal(expectedResult);
  });
  it('should handle the setBuyOffContext action correctly', () => {
    const setBuyOffContext = BuyOffContextReducer(state, {
      type: SET_BUYOFF_CONTEXT,
      error: null,
      data: null,
    });
    expect(setBuyOffContext.get('isFetching')).to.equal(true);
  });
  it('should handle the setBuyOffContextValue action correctly', () => {
    const setBuyOffContextValue = BuyOffContextReducer(state, {
      type: SET_BUYOFF_CONTEXT_VALUE,
      error: null,
      data: true,
    });
    expect(setBuyOffContextValue.get('buyOffContext')).to.equal(true);
  });
  it('should handle the setBuyOffContextError action correctly', () => {
    const error = new Error('some error');
    const setBuyOffContextError = BuyOffContextReducer(state, {
      type: SET_BUYOFF_CONTEXT_ERROR,
      error,
      data: null,
    });
    expect(setBuyOffContextError.get('error')).to.deep.equal(error);
  });
});

describe('GiftGiverReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isFetching: false,
      isFetchingFirst: true,
      isFetchingRemaining: true,
      isFetchingOos: true,
      data: {},
      firstCategorydata: null,
      oosCategoryData: null,
      error: null,
      errorOos: null,
      sortedData: null,
    });
  });
  it('should return the initial state', () => {
    const expectedResult = state;

    expect(GiftGiverReducer(undefined, {})).to.deep.equal(expectedResult);
  });

  it('should call fetch first category', () => {
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_FIRST_CATEGORY,
      error: null,
      data: null,
    });
    const actual = fetchRegistryFirstCategory.get('isFetchingFirst');
    expect(actual).to.equal(true);
  });

  it('should call fetch first category success', () => {
    const categoryBuckets = [];
    const fetchData = {
      categoryBuckets,
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_FIRST_CATEGORY_SUCCESS,
      error: null,
      data: fetchData,
    });
    const actual = fetchRegistryFirstCategory.get('firstCategorydata').toJS();
    expect(actual.length).to.equal(1);
  });
  it('should call fetch first category success else', () => {
    const fetchData = {};
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_FIRST_CATEGORY_SUCCESS,
      error: null,
      data: fetchData,
    });
    const actual = fetchRegistryFirstCategory.get('firstCategorydata').toJS();
    expect(actual.length).to.equal(0);
  });
  it('should call fetch first category success when isDateSort is true', () => {
    const categoryBuckets = [];

    const fetchData = {
      categoryBuckets,
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_FIRST_CATEGORY_SUCCESS,
      error: null,
      isDateSort: true,
      data: fetchData,
    });
    const actual = fetchRegistryFirstCategory
      .get('dateSortedfirstCategorydata')
      .toJS();
    expect(actual.length).to.equal(1);
  });

  it('should call fetch first category error', () => {
    const error = {
      data: {},
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_FIRST_CATEGORY_ERROR,
      error,
      data: null,
    });
    const actual = fetchRegistryFirstCategory.get('error');
    expect(actual).to.equal(error);
  });

  it('should call fetch other category', () => {
    const fetchRegistryOtherCategories = GiftGiverReducer(state, {
      type: FETCH_OTHER_CATEGORIES,
      error: null,
      data: null,
    });
    const actual = fetchRegistryOtherCategories.get('isFetchingRemaining');
    expect(actual).to.equal(true);
  });

  it('should call fetch other category success', () => {
    const dummyState = fromJS({
      isFetching: false,
      isFetchingOos: false,
      data: {},
      firstCategorydata: [],
      oosCategoryData: null,
      error: null,
      errorOos: null,
      sortedData: null,
    });
    const remainingCategoryBuckets = [];
    const fetchData = {
      remainingCategoryBuckets,
    };
    const fetchRegistryOtherCategoriesSuccess = GiftGiverReducer(dummyState, {
      type: FETCH_OTHER_CATEGORIES_SUCCESS,
      error: null,
      data: fetchData,
    });
    const actual = fetchRegistryOtherCategoriesSuccess
      .get('firstCategorydata')
      .toJS();
    expect(actual.length).to.equal(0);
  });
  it('should handle the resetIsItemsFetchingStatus action correctly', () => {
    const expectedResult = state
      .set('isFetching', false)
      .set('isFetchingRemaining', true)
      .set('isFetchingFirst', true)
      .set('data', null)
      .set('firstCategorydata', null)
      .set('oosCategoryData', null);

    expect(GiftGiverReducer(state, resetIsItemsFetchingStatus())).to.deep.equal(
      expectedResult
    );
  });

  it('should call fetch other category success with isDatesort true', () => {
    const dummyState = fromJS({
      isFetching: false,
      isFetchingOos: false,
      data: {},
      dateSortedfirstCategorydata: [{ registryItemList: [] }],
      oosCategoryData: null,
      error: null,
      errorOos: null,
      sortedData: null,
    });
    const remainingCategoryBuckets = [{ registryItemList: [] }];
    const fetchData = {
      remainingCategoryBuckets,
    };
    const fetchRegistryOtherCategoriesSuccess = GiftGiverReducer(dummyState, {
      type: FETCH_OTHER_CATEGORIES_SUCCESS,
      error: null,
      data: fetchData,
      isDateSort: true,
    });
    const actual = fetchRegistryOtherCategoriesSuccess
      .get('dateSortedfirstCategorydata')
      .toJS();
    expect(actual.length).to.equal(1);
  });
  it('should call fetch other category success with isDatesort  else', () => {
    const dummyState = fromJS({
      isFetching: false,
      isFetchingOos: false,
      data: {},
      dateSortedfirstCategorydata: [{ registryItemList: [] }],
      oosCategoryData: null,
      error: null,
      errorOos: null,
      sortedData: null,
    });
    const remainingCategoryBuckets = {};
    const fetchData = {
      remainingCategoryBuckets,
    };
    const fetchRegistryOtherCategoriesSuccess = GiftGiverReducer(dummyState, {
      type: FETCH_OTHER_CATEGORIES_SUCCESS,
      error: null,
      data: fetchData,
      isDateSort: true,
    });
    const actual = fetchRegistryOtherCategoriesSuccess
      .get('dateSortedfirstCategorydata')
      .toJS();
    expect(actual.length).to.equal(1);
  });
  it('should call fetch other category error', () => {
    const error = {
      data: {},
    };
    const fetchRegistryOtherCategoriesError = GiftGiverReducer(state, {
      type: FETCH_OTHER_CATEGORIES_ERROR,
      error,
      data: null,
    });
    const actual = fetchRegistryOtherCategoriesError.get('error');
    expect(actual).to.equal(error);
  });

  it('should call fetch sorted data', () => {
    const fetchSortedData = GiftGiverReducer(state, {
      type: FETCH_SORTED_DATA,
      error: null,
      data: null,
    });
    const actual = fetchSortedData.get('isFetching');
    expect(actual).to.equal(false);
  });

  it('should call Unavailable category', () => {
    const fetchRegistryOtherCategories = GiftGiverReducer(state, {
      type: FETCH_OOS_CATEGORIES,
      error: null,
      data: null,
    });
    const actual = fetchRegistryOtherCategories.get('isFetchingOos');
    expect(actual).to.equal(true);
  });

  it('should call Unavailable category success', () => {
    const fetchData = {
      data: {},
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_OOS_CATEGORIES_SUCCESS,
      error: null,
      data: fetchData,
    });
    const actual = fetchRegistryFirstCategory.get('oosCategoryData');
    expect(actual).to.equal(fetchData);
  });
  it('should call Unavailable category success with isDateSort = true', () => {
    const fetchData = {
      data: {},
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_OOS_CATEGORIES_SUCCESS,
      error: null,
      data: fetchData,
      isDateSort: true,
    });
    const actual = fetchRegistryFirstCategory.get('dateSortedOosCategorydata');
    expect(actual).to.equal(fetchData);
  });

  it('should fetch Unavailable category error', () => {
    const error = {
      data: {},
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_OOS_CATEGORIES_ERROR,
      error,
      data: null,
    });
    const actual = fetchRegistryFirstCategory.get('errorOos');
    expect(actual).to.equal(error);
  });
});

describe('copyRegistryReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isFetching: true,
      error: null,
      data: {},
    });
  });

  it('should return the intital state', () => {
    const expectedResult = state;
    expect(CopyRegistryReducer(undefined, {})).to.deep.equal(expectedResult);
  });

  it('should check the copyRegistryreducer for copyRegistry', () => {
    const fetchNaviDataSuccess = CopyRegistryReducer(state, {
      type: COPY_REGISTRY,
      error: null,
      data: { state },
    });
    expect(fetchNaviDataSuccess.get('data')).to.deep.equal(null);
  });

  it('should check the copyRegistryReducer for CopyRegistrysuccess', () => {
    const fetchData = {
      data: {},
    };
    const fetchNaviDataSuccess = CopyRegistryReducer(state, {
      type: FETCH_COPY_REGISTRY_SUCCESS,
      error: null,
      data: fetchData,
    });
    const actual = fetchNaviDataSuccess.get('data');
    expect(actual).to.equal(fetchData);
  });

  it('should check the copyRegistryReducer for error', () => {
    const fetchNaviDataSuccess = CopyRegistryReducer(state, {
      type: FETCH_COPY_REGISTRY_ERROR,
      error: null,
      data: null,
    });
    const actual = fetchNaviDataSuccess.get('data');
    expect(actual).to.equal(null);
  });

  it('should check the copyRegistryReducer for resetStatus', () => {
    const fetchNaviDataSuccess = CopyRegistryReducer(state, {
      type: RESET_COPY_REGISTRY_RESPONSE,
      error: null,
      data: null,
    });
    const actual = fetchNaviDataSuccess.get('data');
    expect(actual).to.equal(null);
  });

  it('should call fetch first category success with show start browsing', () => {
    const categoryBuckets = [];
    const showStartBrowsing = true;
    const fetchData = {
      categoryBuckets,
      showStartBrowsing,
    };
    const fetchRegistryFirstCategory = GiftGiverReducer(state, {
      type: FETCH_FIRST_CATEGORY_SUCCESS,
      error: null,
      data: fetchData,
    });
    const actual = fetchRegistryFirstCategory.get('firstCategorydata').toJS();
    expect(actual.length).to.equal(1);
  });
  it('BOPIS_CHECK_BOX checkbox state', () => {
    const expectedResult = GiftGiverReducer(state, updateBopisCheckBoxState());
    expect(expectedResult.get('data').toJS()).to.deep.equal({});
  });
  it('SET_FACET_DATA data state', () => {
    const expectedResult = GiftGiverReducer(state, setFacetData());
    expect(expectedResult.get('data').toJS()).to.deep.equal({});
  });
});
