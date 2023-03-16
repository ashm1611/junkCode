import { fromJS } from 'immutable';
import {
  makeSelectFetchingStatus,
  makeSelectSolrAPICallErrorMsg,
  makeSelectTotalCollectionCount,
  makeSelectCookieCountInStore,
  makeSelectFlipFlopItemsList,
  makeSelectMobileOrientationType,
  getRegTypeFromStore,
  makeSelectFlipFLopSelectedCategory,
  makeSelectIsItemsCountLow,
} from '../selectors';

describe('#selectors', () => {
  const registryState = fromJS({ test: 'xyz' });
  const globalState = fromJS({ mobile: { isMobile: true } });
  const mockedState = fromJS({
    flipFlopStateKey: {
      flipFlopItemsList: [
        { Product_id: '123', Product_name: 'abc' },
        { Product_id: '987', Product_name: 'xyz' },
      ],
      isItemsFetching: false,
      errorMsg: 'Error Msg',
      totalItemsCount: 120,
      flipFlopCookieCountInStore: 77,
      regType: 'BRD',
      isFlipFlopEnabled: false,
      flipFlopSelectedCategories: { BRD: 'flipFlopAllCategory' },
      isItemsCountLow: true,
    },
    viewportConfig: {
      siteConfig: { registry: registryState },
      switchConfig: { Global: globalState },
    },
    content: { id: 'abc' },
  });

  const flipFlopItemsList = [
    { Product_id: '123', Product_name: 'abc' },
    { Product_id: '987', Product_name: 'xyz' },
  ];
  const fetchingStatus = false;
  const solrAPICallErrorMsg = 'Error Msg';
  const totalCollectionCount = 120;
  const flipFlopCookieCountInStore = 77;
  const regTypeInStore = 'BRD';
  const flipFLopSelectedCategories = { BRD: 'flipFlopAllCategory' };
  const isMobileOrientationLandscape = true;
  const isItemsCountLow = true;

  it('should select the "flipFlopItemsList" ', () => {
    expect(makeSelectFlipFlopItemsList()(mockedState).toJS()).to.deep.equal(
      flipFlopItemsList
    );
  });

  it('should select the "fetchingStatus" flag ', () => {
    expect(makeSelectFetchingStatus()(mockedState)).to.equal(fetchingStatus);
  });

  it('should select the "solrAPICallErrorMsg" ', () => {
    expect(makeSelectSolrAPICallErrorMsg()(mockedState)).to.equal(
      solrAPICallErrorMsg
    );
  });

  it('should select the "totalCollectionCount" ', () => {
    expect(makeSelectTotalCollectionCount()(mockedState)).to.equal(
      totalCollectionCount
    );
  });

  it('should select the "flipFlopCookieCountInStore" ', () => {
    expect(makeSelectCookieCountInStore()(mockedState)).to.equal(
      flipFlopCookieCountInStore
    );
  });

  it('should select the "makeSelectMobileOrientationType" ', () => {
    const mockedStateFlipFlop = fromJS({
      viewportConfig: {
        isMobileOrientationLandscape: true,
      },
    });

    expect(makeSelectMobileOrientationType()(mockedStateFlipFlop)).to.equal(
      isMobileOrientationLandscape
    );
  });

  it('should select the "regType" ', () => {
    expect(getRegTypeFromStore()(mockedState)).to.equal(regTypeInStore);
  });

  it('should select the "flipFLopSelectedCategories" ', () => {
    expect(
      makeSelectFlipFLopSelectedCategory()(mockedState).toJS()
    ).to.deep.equal(flipFLopSelectedCategories);
  });

  it('should select the "isItemsCountLow" ', () => {
    expect(makeSelectIsItemsCountLow()(mockedState)).to.equal(isItemsCountLow);
  });
});
