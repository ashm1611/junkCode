import { fromJS } from 'immutable';

import {
  registryList,
  getRegistryDetails,
  makeSelectOwnerFirstCategoryList,
  getItemsFetchingStatus,
  makeSelectSortedBy,
  makeSelectInactivityModalReset,
  makeSelectActiveRegistryCallFlag,
  selectCloseModalFlag,
  makeSelectOwnerFirstCategoryError,
  makeSelectOwnerRemainingCategoryError,
  selectIsItemDeleted,
  makeSelectOwnerRemainingCategoryTotalPrice,
  getRegistryEditData,
  getTYMData,
  getFilterCount,
  selectQuickItemAdded,
  getIsPriceFetching,
  getIsFromReplace,
  makeSelectUpdatedSkuId,
  getSiteSpectDateSort,
  isFilterItemReady,
  isSocialAnnexReady,
  getRemainingItemFetchingStatus,
  isRegistrantDetailModalOpen,
  isGoodyBoxModalOpen,
  makeSelectEditRegistryFromMoreInfoBtn,
  getShowChecklist,
  selectMyFundsDetailsData,
} from '../selectors';
import {
  getRegistryData,
  getFetchingStatus,
  getErrorStatus,
  makeSelectSocialAnxWriteReview,
  getFacetData,
} from '../commonSelectors';
import { getRemainingItemFetchingStatus as getRemainingItemFetchingStatusMain } from '../RegistryOwnerItemsSelectors';
import { selectRegistrantModalData } from '../../../../../components/Pages/Registry/RegistryOwnerModal/selectors';

describe('#selectors', () => {
  const enableBookAppointment = true;
  const enableLiveChat = true;
  const registryBookAppointmentEnabled = true;
  const registryLiveChatEnabled = true;
  const selectOwnerFirstCategoryError = makeSelectOwnerFirstCategoryError();
  const remainingCategoryError = makeSelectOwnerRemainingCategoryError();

  const mockedState = fromJS({
    labels: { Registry: 'xyz' },
    mobileScreen: {
      isNavMobileScreen: 'true',
      isMobileScreen: 'true',
    },
    Registry: 'registry',
    registryIsCopied: { data: 'xyz' },
    viewportConfig: {
      siteConfig: { endpoints: 'xyz' },
      switchConfig: {
        createRegistry: {
          registryBookAppointmentEnabled,
          registryLiveChatEnabled,
          enableTYMTab: 'xyz',
        },
        Global: {
          enableBookAppointment,
          enableLiveChat,
        },
        RegistryOwner: {
          socialAnnex: true,
          bazaarVoice: true,
        },
      },
    },
    registryDetails: {
      data: 'xyz',
      isFetching: 'xyz',
      closeOtherModal: true,
      inactivityModalReset: true,
      activeRegistryCallFlag: true,
      editRegistryData: 'xyz',
      tymData: true,
      filterCount: true,
      error: true,
      isEditRegistryFromMoreInfoBtn: false,
      showChecklist: false,
    },
  });
  it('should select the "isEditRegistryFromMoreInformation" flag', () => {
    expect(makeSelectEditRegistryFromMoreInfoBtn()(mockedState)).to.equal(
      false
    );
  });
  it('should select the "getShowChecklist" flag', () => {
    expect(getShowChecklist()(mockedState)).to.equal(false);
  });
  it('should select the "inactivityModalReset" flag', () => {
    expect(makeSelectInactivityModalReset()(mockedState)).to.equal(true);
  });

  it('should select the "activeRegistryCallFlag" flag', () => {
    expect(makeSelectActiveRegistryCallFlag()(mockedState)).to.equal(true);
  });
  it('should select the "activeRegistryCallFlag" flag', () => {
    expect(selectCloseModalFlag()(mockedState)).to.equal(true);
  });
  it('should select the "getTYMData" flag', () => {
    expect(getTYMData()(mockedState)).to.equal(true);
  });
  it('should select the "getErrorStatus" flag', () => {
    expect(getErrorStatus()(mockedState)).to.equal(true);
  });
  it('should select the "getFilterCount" flag', () => {
    expect(getFilterCount()(mockedState)).to.equal(true);
  });

  it('should select the "isFetching" state', () => {
    expect(getFetchingStatus()(mockedState)).to.equal('xyz');
  });

  it('should select the "registryData" state', () => {
    expect(getRegistryData()(mockedState)).to.equal('xyz');
  });

  it('should select the "editRegistryData" state', () => {
    expect(getRegistryEditData()(mockedState)).to.equal('xyz');
  });

  it('should select the "registryDetails" state', () => {
    expect(getRegistryDetails(mockedState)).to.deep.equal(
      fromJS({
        data: 'xyz',
        isFetching: 'xyz',
        closeOtherModal: true,
        inactivityModalReset: true,
        activeRegistryCallFlag: true,
        editRegistryData: 'xyz',
        tymData: true,
        filterCount: true,
        error: true,
        isEditRegistryFromMoreInfoBtn: false,
        showChecklist: false,
      })
    );
  });

  it('should select the "makeSelectSocialAnxWriteReview" state', () => {
    const socialAnxWriteReviewSelector = makeSelectSocialAnxWriteReview();
    const reviewYourProductsConfig = {
      writeReview: true,
      uploadPhoto: true,
    };
    expect(socialAnxWriteReviewSelector(mockedState)).to.deep.equal(
      reviewYourProductsConfig
    );
  });

  it('should select the "registryList" state', () => {
    expect(registryList(mockedState)).to.equal('registry');
  });

  it('should select the error state for first Item category', () => {
    const error = { error: { errorMsg: 'something went wrong' } };
    const mocked = fromJS({
      registryOwnerItems: error,
    });

    expect(selectOwnerFirstCategoryError(mocked).toJS()).to.deep.equal(
      error.error
    );
  });

  it('should select the error state for remaining Item category', () => {
    const error = {
      remainingCategoryError: { errorMsg: 'something went wrong' },
    };
    const mocked = fromJS({
      registryOwnerItems: error,
    });

    expect(remainingCategoryError(mocked).toJS()).to.deep.equal(
      error.remainingCategoryError
    );
  });
  it('should select the "isRemainingItemFetching" key', () => {
    const isRemainingItemFetching = true;
    const mocked = fromJS({
      registryOwnerItems: {
        isRemainingItemFetching,
      },
    });
    expect(getRemainingItemFetchingStatus()(mocked)).to.equal(
      isRemainingItemFetching
    );
  });
  it('should select the "isSocialAnnexReady" key', () => {
    const isSocialAnnex = true;
    const mocked = fromJS({
      registryOwnerItems: {
        isSocialAnnexReady: isSocialAnnex,
      },
    });
    expect(isSocialAnnexReady()(mocked)).to.equal(isSocialAnnex);
  });
  it('should select the "isFilterItemReady" key', () => {
    const isFilterItem = true;
    const mocked = fromJS({
      registryOwnerItems: {
        isFilterItemReady: isFilterItem,
      },
    });
    expect(isFilterItemReady()(mocked)).to.equal(isFilterItem);
  });
  it('should select the "updatedSkuId" key', () => {
    const updatedSkuId = 'sku1234';
    const mocked = fromJS({
      registryOwnerItems: {
        updatedSkuId,
      },
    });
    expect(makeSelectUpdatedSkuId()(mocked)).to.equal(updatedSkuId);
  });
  it('should select the "isQuickitemAddedTS" key', () => {
    const isQuickitemAddedTS = '1591897154844';
    const mocked = fromJS({
      registryOwnerItems: {
        isQuickitemAddedTS,
      },
    });
    expect(selectQuickItemAdded()(mocked)).to.equal(isQuickitemAddedTS);
  });
  it('should select the "isPriceItemFetching" key', () => {
    const isPriceItemFetching = true;
    const mocked = fromJS({
      registryOwnerItems: {
        isPriceItemFetching,
      },
    });
    expect(getIsPriceFetching()(mocked)).to.equal(isPriceItemFetching);
  });
  it('should select the "fromReplace" key', () => {
    const fromReplace = true;
    const mocked = fromJS({
      registryOwnerItems: {
        fromReplace,
      },
    });
    expect(getIsFromReplace()(mocked)).to.equal(fromReplace);
  });
  it('should select the "siteSpectDateSort" key', () => {
    const siteSpectDateSort = true;
    const mocked = fromJS({
      registryOwnerItems: {
        siteSpectDateSort,
      },
    });
    expect(getSiteSpectDateSort()(mocked)).to.equal(siteSpectDateSort);
  });
  it('should select isItemsFetching from state', () => {
    const isItemsFetching = true;

    const mockedstate = fromJS({
      registryOwnerItems: {
        isItemsFetching,
      },
    });

    expect(getItemsFetchingStatus()(mockedstate)).to.deep.equal(
      isItemsFetching
    );
  });
  it('should select remaining-category api itemsTotalPrice from state', () => {
    const data = [
      {
        test: 'test1',
        itemsTotalPrice: '$111',
      },
      {
        test: 'test2',
        itemsTotalPrice: '$222',
      },
    ];

    let mockedstate = fromJS({
      registryOwnerItems: {
        firstCategorydata: data,
      },
    });
    expect(
      makeSelectOwnerRemainingCategoryTotalPrice()(mockedstate)
    ).to.deep.equal(data[1].itemsTotalPrice);

    // if registryOwnerItems is empty
    mockedstate = fromJS({
      registryOwnerItems: {
        firstCategorydata: null,
      },
    });
    expect(
      makeSelectOwnerRemainingCategoryTotalPrice()(mockedstate)
    ).to.deep.equal('');
  });

  describe('#makeSelectOwnerFirstCategoryList', () => {
    const selector = makeSelectOwnerFirstCategoryList();
    it('should select firstCategorydata from state', () => {
      const data = { test: 'test' };

      const mockedstate = fromJS({
        registryOwnerItems: {
          firstCategorydata: {
            test: 'test',
          },
        },
      });

      expect(selector(mockedstate).toJS()).to.deep.equal(data);
    });
  });

  describe('#isItemDeleted', () => {
    const selector = selectIsItemDeleted();
    it('should select variation from state', () => {
      const isItemDeleted = true;

      const mockedstate = fromJS({
        registryOwnerItems: {
          isItemDeleted,
        },
      });

      expect(selector(mockedstate)).to.deep.equal(isItemDeleted);
    });
  });
});

describe('#makeSelectSortedBy', () => {
  const selector = makeSelectSortedBy();
  it('should select variation from state', () => {
    const variation = 'Category';

    const mockedstate = fromJS({
      registryOwnerItems: {
        variation,
      },
    });

    expect(selector(mockedstate)).to.deep.equal(variation);
  });
});

describe('#showFacetData', () => {
  it('getFacetsData should return value facetsData', () => {
    const selector = getFacetData();
    const data = {
      test: 'test',
    };
    const mockedstate = fromJS({
      registryOwnerItems: {
        facetsData: {
          test: 'test',
        },
      },
    });
    expect(selector(mockedstate).toJS()).to.deep.equal(data);
  });

  it('isRegistrantDetailModalOpen selector', () => {
    const selector = isRegistrantDetailModalOpen();
    const mockedstate = fromJS({
      registryOwnerItems: {
        isRegistrantDetailModalOpen: false,
      },
    });
    expect(selector(mockedstate)).to.equal(false);
  });

  it('selectRegistrantModalData selector', () => {
    const selector = selectRegistrantModalData();
    const data = {
      test: 'test',
    };
    const mockedstate = fromJS({
      registryOwnerItems: {
        registrantModalData: data,
      },
    });
    expect(selector(mockedstate).toJS()).to.deep.equal(data);
  });
});

it('isGoodyBoxModalOpen selector', () => {
  const selector = isGoodyBoxModalOpen();
  const mockedstate = fromJS({
    registryOwnerItems: {
      isGoodyBoxModalOpen: false,
    },
  });
  expect(selector(mockedstate)).to.equal(false);
});

describe('#RegistryOwnerItemsSelectors', () => {
  it('getRemainingItemFetchingStatusMain', () => {
    const isRemainingItemFetching = true;
    const mocked = fromJS({
      registryOwnerItems: {
        isRemainingItemFetching,
      },
    });
    expect(getRemainingItemFetchingStatusMain()(mocked)).to.equal(
      isRemainingItemFetching
    );
  });

  it('should select the MyFundsDetails info', () => {
    const dataSelector = selectMyFundsDetailsData();

    const myFundsData = fromJS({});
    const mockedState = fromJS({
      MyFunds: {
        data: myFundsData,
      },
    });

    expect(dataSelector(mockedState)).to.deep.equal(myFundsData);
  });
});
