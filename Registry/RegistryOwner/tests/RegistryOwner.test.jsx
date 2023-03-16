/* eslint-disable max-lines */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as getStoreFromCookies from '@bbb-app/utils/getStoreFromCookies';
import { setNearestStoreFromApi } from '@bbb-app/redux/akamai/constants';
import { RegistryOwner, mapDispatchToProps } from '../RegistryOwner';

configure({ adapter: new Adapter() });

const resetGlobalNotification = sinon.spy();
describe(__filename, () => {
  const matchParamId = 1;
  const onComponentMount = sinon.spy();
  const getThankYouList = sinon.spy();
  const resetFirstCategoryCallFired = sinon.spy();
  const resetIsItemsFetchingStatus = sinon.spy();
  const getEditRegistryData = sinon.spy();
  const getRegistryOwnerFirstCategory = sinon.spy();
  const updateFilterItemCount = sinon.spy();
  const emptyStoreData = sinon.spy();
  const switchConfig = {
    enableQuickAdd: true,
  };
  const mPulseSiteConfig = {
    PageSpecificMarks: {
      'ux-destination-verified': [
        'ux-text-registrant-name',
        'ux-text-event-date',
      ],
      'ux-primary-content-displayed': [],
      'ux-primary-action-available': [],
      'ux-secondary-content-displayed': [
        'ux-text-item-requested',
        'ux-text-item-purchased',
      ],
    },
  };
  const removeConditionalMarksFlag = sinon.stub();
  const setPageMarks = sinon.stub();
  const fetchSiteSpectDateSort = sinon.stub();
  window.instrumentation = {
    removeConditionalMarksFlag,
    setPageMarks,
  };
  const props = {
    labels: {
      referredContent: [
        {
          id: '9942',
          key: 'tymSurpriseContentHeading',
        },
        {
          id: '9943',
          key: 'tymSurpriseContentSubHeading',
        },
        {
          id: '9944',
          key: 'sendThankYouHeading',
        },
        {
          id: '9945',
          key: 'sendThankYouDescription',
        },
      ],
      QuickPicksCollection: {
        BRD: '',
        BA1: '',
      },
    },
    filter: '',
    filteredItemsCount: 0,
    isFiltered: false,
    selectedFilterOption: 'View All',
    registrylist: [
      { registryId: '12345' },
      { registryId: '22222' },
      { registryId: '33333' },
    ],
    selectedFilters: {},
    registryOwnerFirstCategoryList: [
      { sku: 123, registryItemList: [{ sku: 123 }] },
      { sku: 124 },
      { sku: 125 },
    ],
    resetGlobalNotification,
    switchConfig,
    isMPulseEnabled: true,
    mPulseSiteConfig,
    resetIsItemsFetchingStatus,
    fetchSiteSpectDateSort,
    maxItemInRegToShowQuickAdd: 10,
    deviceConfig: {
      DESKTOP: 1024,
    },
    quickAddConfig: {
      BRD: 'RM1001',
    },
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 0,
          registryType: {
            registryTypeName: 'BRD',
          },
        },
      },
    },
    isPickupInStoreModalOpen: true,
    updateBopisCheckBoxState: () => {},
    saveLandingZip: () => {},
    onPickupInStoreButtonClick: () => {},
    saveStoreInfo: sinon.stub(),
  };
  const tree = shallow(
    <RegistryOwner
      matchParamId={matchParamId}
      getEditRegistryData={getEditRegistryData}
      onComponentMount={onComponentMount}
      getThankYouList={getThankYouList}
      resetFirstCategoryCallFired={resetFirstCategoryCallFired}
      registryId={1}
      showExpertPicks
      {...props}
    />
  );
  it('should call dispatch fetchReferredContent', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);
    props1.getContent();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should render correctly', () => {
    tree.setState({ registryId: 1 });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly in new registry flow for mobile view', () => {
    const registryDataNew = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 0,
          registryType: {
            registryTypeName: 'BRD',
          },
          eventType: 'Baby',
        },
      },
    };
    const switchConfigGlobal = { enableCSLabels: true };
    tree.setState({ registryId: 1 });
    const treeNew = shallow(
      <RegistryOwner
        switchConfigGlobal={switchConfigGlobal}
        matchParamId={matchParamId}
        getEditRegistryData={getEditRegistryData}
        onComponentMount={onComponentMount}
        getThankYouList={getThankYouList}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        registryId={1}
        registryData={registryDataNew}
        newReg
        isMobile
        siteId="BuyBuyBaby"
        {...props}
      />
    );

    expect(toJson(treeNew)).to.not.equal(null);
  });
  it('should render correctly in new registry flow for desktop view', () => {
    const registryDataNew = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 0,
          registryType: {
            registryTypeName: 'BRD',
          },
          eventType: 'Baby',
        },
      },
    };
    const switchConfigGlobal = { enableCSLabels: true };
    tree.setState({ registryId: 1 });
    const treeNew = shallow(
      <RegistryOwner
        switchConfigGlobal={switchConfigGlobal}
        matchParamId={matchParamId}
        getEditRegistryData={getEditRegistryData}
        onComponentMount={onComponentMount}
        getThankYouList={getThankYouList}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        registryId={1}
        registryData={registryDataNew}
        newReg
        siteId="BuyBuyBaby"
        {...props}
      />
    );

    expect(toJson(treeNew)).to.not.equal(null);
  });
  it('#nearestStoreApiResolvedCall ', () => {
    tree.instance().nearestStoreApiResolvedCall();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('#nearestStoreApiResolvedCall else', () => {
    tree.instance().storeId = '12';
    tree.instance().nearestStoreApiResolvedCall();
    expect(tree.instance().state.nearestStoreApiResolved).to.equal(true);
  });

  it('#handleBopisCheckboxChange ', () => {
    tree.instance().handleBopisCheckboxChange();
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('#handleChangePickupInStore ', () => {
    tree.instance().handleChangePickupInStore({ preventDefault: () => {} });
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should setState registryId componentWillReceiveProps', () => {
    const nextProps = {
      matchParamId: '1234',
      selectedFilters: {},
      storeDetails: {
        storeId: '8908',
      },
      registryId: '1231',
      registryCode: 1,
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const registryId = tree.instance().state.registryId;
    expect(registryId).to.equal('1234');
  });

  it('should setState repositoryId componentWillReceiveProps 1', () => {
    tree.setState({ registryId: '1234' });
    const nextProps = {
      matchParamId: '1234',
      profileData: { repositoryId: '6789' },
      selectedFilters: {},
      storeDetails: {
        storeId: '8908',
      },
      registryId: '1234',
      registryCode: 1,
      isSlideoutOverlayOpen: false,
      newReg: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            giftRegistered: 0,
            registryType: {
              registryTypeName: 'BRD',
            },
            eventType: 'Wedding',
          },
        },
      },
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const repositoryId = tree.instance().state.repositoryId;

    expect(repositoryId).to.equal('6789');
  });

  it('should setState isAddingQuickAddItemToList With Category Variation componentWillReceiveProps', () => {
    const nextProps = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 124 },
        { sku: 125 },
      ],
      selectedFilters: {},
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const isAddingQuickAddItemToList = tree.instance().state
      .isAddingQuickAddItemToList;
    expect(isAddingQuickAddItemToList).to.equal(false);
  });

  it('should setState filteredFirstCategoryItems in sorted manner', () => {
    const nextProps = {
      registryOwnerFirstCategoryList: [
        {
          registryItemList: [
            { sku: 123, priceVal: 2 },
            { sku: 124, priceVal: 1 },
            { sku: 125, priceVal: 3 },
          ],
        },
      ],
      selectedFilters: {
        sort: ['hightolow'],
      },
    };
    const updatedState = [
      { sku: 125, priceVal: 3 },
      { sku: 123, priceVal: 2 },
      { sku: 124, priceVal: 1 },
    ];
    tree.instance().componentWillReceiveProps(nextProps);
    const filteredFirstCategoryItems = tree.instance().state
      .filteredFirstCategoryItems;
    expect(filteredFirstCategoryItems).to.deep.equal(updatedState);
  });

  it('should setState isAddingQuickAddItemToList With Date componentWillReceiveProps', () => {
    const nextProps = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 124 },
        { sku: 125 },
      ],
      selectedFilters: {},
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const isAddingQuickAddItemToList = tree.instance().state
      .isAddingQuickAddItemToList;
    expect(isAddingQuickAddItemToList).to.equal(false);
  });

  it('should setState isAddingQuickAddItemToList set true componentWillReceiveProps', () => {
    const nextProps = {
      isAddToRegistryFetching: true,
      selectedFilters: {},
      registryOwnerFirstCategoryList: [
        { sku: 123, registryItemList: [{ sku: 123 }] },
        { sku: 124 },
        { sku: 125 },
      ],
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const isAddingQuickAddItemToList = tree.instance().state
      .isAddingQuickAddItemToList;
    expect(isAddingQuickAddItemToList).to.equal(true);
  });

  it.skip('should setState isAddingQuickAddItemToList set true with quickItemAdded componentWillReceiveProps', () => {
    const nextProps = {
      quickItemAdded: 34567,
      selectedFilters: {},
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const isAddingQuickAddItemToList = tree.instance().state
      .isAddingQuickAddItemToList;
    expect(isAddingQuickAddItemToList).to.equal(false);
  });

  it('check the value of isRegistryQuickAddEnabled as true', () => {
    const isRegistryQuickAddEnabled = true;
    expect(isRegistryQuickAddEnabled).to.equal(true);
  });

  it('mapDispatchToProps should return a prop removeRegistryItem which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const productInfo = {};
    const productData = [];
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.removeRegistryItem(productInfo, productData);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop undoRemoveRegistryItem which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const productInfo = {};
    const productData = [];
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.undoRemoveRegistryItem(productInfo, productData);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchRegistryOwnerItemsFirstCategory which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.getRegistryOwnerFirstCategory('12345', 'BIR', '11/11/11');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchTymData which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.getThankYouList('520647703', ['1234', '1256'], '1', '1');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop resetCoRegistrantProfileStatus which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.resetCoRegistrantProfileStatus();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop getProfileData which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.getProfileData('12345');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop onResetFiltersAndSort which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.onResetFiltersAndSort();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchCoRegistrantProfileStatus which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.fetchCoRegistrantProfileStatus('test@test.com', false);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop markFavRegistryItem which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.markFavRegistryItem({}, {});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath updateGiftData', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.updateGiftData({}, {});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath updateFilterCount', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.updateFilterCount(1);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath updatePickupinStoreModal', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.updatePickupinStoreModal({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath fireTealiumAction', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.fireTealiumAction('', {}, '');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath updateInteractiveCheckList', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.updateInteractiveCheckList({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath closeOtherOpenModaOnInactiveModal', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.closeOtherOpenModaOnInactiveModal(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath initiateInactivityModal', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.initiateInactivityModal({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath makeActiveRegistryCall', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.makeActiveRegistryCall();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath onProductTileClick', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.onProductTileClick();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath getUpdatedCategoryData', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.getUpdatedCategoryData();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath addToCartEmptyStoreData', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.emptyStoreData();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath setTrackFlag', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.setTrackFlag();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath setFacetData', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.setFacetData({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath updateBopisCheckBoxState', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.updateBopisCheckBoxState({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath onPickupInStoreButtonClick', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.onPickupInStoreButtonClick({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath saveLandingZip', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.saveLandingZip({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath replaceProductFromRegistry', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.replaceProductFromRegistry({});
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should dispath updateSelectedFilters', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.updateSelectedFilters({});
    expect(dispatch.called).to.equal(true);
  });

  const commonProps = {
    labels: {
      referredContent: [
        {
          id: '9942',
          key: 'tymSurpriseContentHeading',
        },
        {
          id: '9943',
          key: 'tymSurpriseContentSubHeading',
        },
        {
          id: '9944',
          key: 'sendThankYouHeading',
        },
        {
          id: '9945',
          key: 'sendThankYouDescription',
        },
      ],
      QuickPicksCollection: {
        BRD: '',
        BA1: '',
      },
    },
    filter: '',
    filteredItemsCount: 0,
    isFiltered: false,
    selectedFilterOption: 'View All',
    selectedFilters: {},
    registrylist: [
      { registryId: '12345' },
      { registryId: '22222' },
      { registryId: '33333' },
    ],
    resetGlobalNotification,
    switchConfig,
    isMPulseEnabled: true,
    mPulseSiteConfig,
    resetIsItemsFetchingStatus,
    fetchSiteSpectDateSort,
    getHeaderLayout: false,
    isFetching: true,
    deviceConfig: {
      DESKTOP: 1024,
    },
    quickItemAddedTS: 'InitialValue',
    variation: 'Date',
    isAddToRegistryFetching: false,
    isAddingQuickAddItemToList: true,
    registryOwnerFirstCategoryList: [{ sku: 123 }],
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 0,
          registryType: {
            registryTypeName: 'BRD',
          },
          eventType: 'a',
        },
      },
    },
    saveStoreInfo: sinon.stub(),
    maxItemInRegToShowQuickAdd: 10,
  };
  const wrapper = shallow(
    <RegistryOwner
      matchParamId={matchParamId}
      getEditRegistryData={getEditRegistryData}
      getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
      updateFilterItemCount={updateFilterItemCount}
      emptyStoreData={emptyStoreData}
      onComponentMount={onComponentMount}
      getThankYouList={getThankYouList}
      resetFirstCategoryCallFired={resetFirstCategoryCallFired}
      registryId={1}
      {...commonProps}
    />
  );
  wrapper.setState({ repositoryId: '123', registryId: '213' });
  const commonNextProps = {
    quickItemAddedTS: 'ChangedValue',
    registryOwnerFirstCategoryList: [{ sku: 123 }, { sku: 124 }, { sku: 125 }],
    selectedFilters: {},
  };

  it('componentWillReceiveProps should set registryId if quickItemAddedTS is changed', () => {
    const nextProps = {
      matchParamId: '234',
      selectedFilters: {},
    };
    wrapper.instance().eventObject = [{ registryCode: 1 }];
    wrapper.instance().componentWillReceiveProps(nextProps);
    const registryId = wrapper.instance().state.registryId;
    expect(registryId).to.equal('234');
  });

  it('componentWillReceiveProps should call sortDataByDate if quickItemAddedTS is changed and variation is date', () => {
    wrapper.instance().eventObject = [{ registryCode: 1 }];
    const sortDataByDate = sinon.spy(wrapper.instance(), 'sortDataByDate');
    wrapper.instance().componentWillReceiveProps(commonNextProps);
    const isAddingQuickAddItemToList = wrapper.instance().state
      .isAddingQuickAddItemToList;
    expect(isAddingQuickAddItemToList).to.equal(true);
    expect(sortDataByDate.called).to.equal(true);
  });

  it('componentWillReceiveProps should call updateFilterItemCount if isAddingQuickAddItemToList is false', () => {
    const nextProps = {
      quickItemAddedTS: 'ChangedValue',
      registryOwnerFirstCategoryList: [
        { sku: 123, registryItemList: [{ sku: 125 }] },
        { sku: 124 },
        { sku: 125 },
      ],
      selectedFilters: {},
      isSlideoutOverlayOpen: true,
    };
    wrapper.setProps({
      variation: 'Category',
      newReg: true,
    });
    wrapper.instance().eventObject = [{ registryCode: 1 }];
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(updateFilterItemCount.called).to.equal(true);
  });

  it('componentWillMount should call setPageMarks', () => {
    wrapper.instance().componentWillMount();
    expect(setPageMarks.called).to.equal(true);
  });

  it('componentWillMount should call removeConditionalMarksFlag', () => {
    wrapper.instance().componentWillMount();
    expect(removeConditionalMarksFlag.called).to.equal(true);
  });

  it('componentWillUnmount should call emptyStoreData', () => {
    wrapper.instance().componentWillUnmount();
    expect(emptyStoreData.called).to.equal(true);
  });

  it('componentWillUnmount should call updateParam', () => {
    wrapper.setProps({ updateParam: sinon.stub() });
    wrapper.instance().componentWillUnmount();
  });

  it('setClassVariables should set eventObject', () => {
    const propObj = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            giftRegistered: 0,
            registryType: {
              registryTypeName: 'BRD',
            },
            eventType: 'wedding registry',
          },
        },
      },
    };
    wrapper.instance().setClassVariables(propObj);
  });

  it('isDataChanged should return false by default', () => {
    const defaultValue = wrapper.instance().isDataChanged({}, {}, '');
    expect(defaultValue).to.equal(false);
  });

  it('preparePageSpecificMPulseMarks should set mPulseMarksPopulated to true', () => {
    const nextProps = {
      isFetching: false,
      selectedFilters: {},
      registryOwnerFirstCategoryList: [
        {
          registryItemList: ['Item1', 'Item2', 'Item3'],
        },
        {
          registryItemList: ['ItemP', 'ItemQ', 'ItemR'],
        },
      ],
    };
    wrapper.instance().preparePageSpecificMPulseMarks(nextProps);
    const mPulseMarksPopulated = wrapper.instance().mPulseMarksPopulated;
    expect(setPageMarks.called).to.equal(true);
    expect(mPulseMarksPopulated).to.equal(true);
  });

  it('should updateSkuIdForAnchoring function correctly', () => {
    const key1 = 'anchoredSkuId';
    const key2 = 'anchoredSkuCategoryId';
    const value1 = '12345';
    const value2 = '76435';
    wrapper.instance().updateSkuIdForAnchoring(value1, value2);
    const afterValue1 = window.sessionStorage.getItem(key1);
    const afterValue2 = window.sessionStorage.getItem(key2);
    expect(afterValue1).to.equal(value1);
    expect(afterValue2).to.equal(value2);
  });

  it('renderRegistryQuickAdd should return null if quickAddId exists', () => {
    wrapper.setProps({
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            giftRegistered: 10,
            registryType: {
              registryTypeName: 'BRD',
            },
            eventType: 'a',
          },
        },
      },
    });
    const result = wrapper.instance().renderRegistryQuickAdd();
    expect(result).to.equal(null);
  });

  it('injectInstrumentationScript should call setPageMarks', () => {
    wrapper.instance().injectInstrumentationScript();
    expect(setPageMarks.called).to.equal(true);
  });
});

describe(__filename, () => {
  const matchParamId = 1;
  const onComponentMount = sinon.spy();
  const getThankYouList = sinon.spy();
  const resetFirstCategoryCallFired = sinon.spy();
  const resetIsItemsFetchingStatus = sinon.spy();
  const getEditRegistryData = sinon.spy();
  const updateBopisCheckBoxState = sinon.spy();
  const getRegistryOwnerFirstCategory = sinon.spy();
  const updateFilterItemCount = sinon.spy();
  const emptyStoreData = sinon.spy();
  const fetchSiteSpectDateSort = sinon.stub();
  const switchConfig = {
    enableQuickAdd: true,
  };
  const mPulseSiteConfig = {
    PageSpecificMarks: {
      'ux-destination-verified': [
        'ux-text-registrant-name',
        'ux-text-event-date',
      ],
      'ux-primary-content-displayed': [],
      'ux-primary-action-available': [],
      'ux-secondary-content-displayed': [
        'ux-text-item-requested',
        'ux-text-item-purchased',
      ],
    },
  };
  const commonProps = {
    isBopisFeatureEnable: true,
    selectedCheckboxFilter: 'store-pickup',
    isAddToRegistryFetching: true,
    labels: {
      referredContent: [
        {
          id: '9942',
          key: 'tymSurpriseContentHeading',
        },
        {
          id: '9943',
          key: 'tymSurpriseContentSubHeading',
        },
        {
          id: '9944',
          key: 'sendThankYouHeading',
        },
        {
          id: '9945',
          key: 'sendThankYouDescription',
        },
      ],
      QuickPicksCollection: {
        BRD: '12',
        BA1: '32',
      },
    },
    filter: '',
    filteredItemsCount: 0,
    isFiltered: false,
    selectedFilterOption: 'View All',
    selectedFilters: {},
    registrylist: [
      { registryId: '12345' },
      { registryId: '22222' },
      { registryId: '33333' },
    ],
    resetGlobalNotification,
    switchConfig,
    isMPulseEnabled: true,
    mPulseSiteConfig,
    resetIsItemsFetchingStatus,
    fetchSiteSpectDateSort,
    getHeaderLayout: false,
    isFetching: true,
    deviceConfig: {
      DESKTOP: 1024,
    },
    quickAddConfig: {
      BRD: '',
    },
    quickItemAddedTS: 'InitialValue',
    variation: 'Date',
    isAddingQuickAddItemToList: true,
    registryOwnerFirstCategoryList: [{ sku: 123 }],
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 0,
          registryType: {
            registryTypeName: 'BRD',
          },
          eventType: 'a',
          registryId: 1122,
        },
      },
    },
    saveStoreInfo: sinon.stub(),
  };
  const wrapper = extraProps =>
    shallow(
      <RegistryOwner
        matchParamId={matchParamId}
        getEditRegistryData={getEditRegistryData}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterItemCount={updateFilterItemCount}
        emptyStoreData={emptyStoreData}
        onComponentMount={onComponentMount}
        getThankYouList={getThankYouList}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        updateBopisCheckBoxState={updateBopisCheckBoxState}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        registryId={1}
        {...commonProps}
        {...extraProps}
      />
    );
  window.instrumentation = null;
  const tree = wrapper();

  it('should setState registryId componentWillReceiveProps with bopis store', () => {
    const nextProps = {
      matchParamId: '1234',
      quickItemAddedTS: 'InitialValue',
      selectedFilters: {},
      storeDetails: {
        storeId: '89081',
        siteBopus: [
          {
            siteId: undefined,
            bopusFlag: '1',
          },
        ],
      },
      registryId: '1231',
      registryCode: 1,
      isStoreAvailable: true,
      isSlideoutOverlayOpen: true,
      newReg: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            giftRegistered: 0,
            registryType: {
              registryTypeName: 'BRD',
            },
            eventType: 'Wedding',
          },
        },
      },
    };
    tree.instance().storeId = '1';
    tree.instance().lastStoreId = '2';
    tree.instance().eventObject = [
      {
        registryCode: '12',
      },
    ];
    tree.instance().componentWillReceiveProps(nextProps);
    const registryId = tree.instance().state.registryId;
    expect(registryId).to.equal('1234');
  });

  it('should setState registryId componentWillReceiveProps without bopis store', () => {
    const nextProps = {
      matchParamId: '1234',
      quickItemAddedTS: 'InitialValue',
      selectedFilters: {},
      storeDetails: {
        storeId: '89081',
        siteBopus: [
          {
            siteId: undefined,
            bopusFlag: '0',
          },
        ],
      },
      registryId: '1231',
      registryCode: 1,
    };
    tree.instance().storeId = '1';
    tree.instance().lastStoreId = '2';
    tree.setState({ nearestStoreApiResolved: true });
    tree.instance().registrySummary = {
      registryId: '1231',
    };
    tree.instance().eventObject = [
      {
        registryCode: '12',
      },
    ];
    tree.setState({ registryId: '1231' });
    tree.instance().componentWillReceiveProps(nextProps);
    const registryId = tree.instance().state.registryId;
    expect(registryId).to.equal('1234');
  });

  it('componentWillMount should not call setPageMarks', () => {
    const setPageMarks = sinon.spy();
    tree.instance().componentWillMount();
    expect(setPageMarks.called).to.equal(false);
  });

  it('componentWillMount should not call removeConditionalMarksFlag', () => {
    const removeConditionalMarksFlag = sinon.spy();
    tree.instance().componentWillMount();
    expect(removeConditionalMarksFlag.called).to.equal(false);
  });

  it('fetch store from Cookies', () => {
    const storeCookieMock = sinon
      .stub(getStoreFromCookies, 'default')
      .returns({ storeId: 1221 });
    tree.instance().componentDidMount();
    expect(tree.instance().storeId).to.equal(1221);
    storeCookieMock.restore();
  });

  it('fetch store from nearest api', () => {
    tree.instance().storeId = undefined;
    const storeCookieMock = sinon
      .stub(getStoreFromCookies, 'default')
      .returns(false);
    setNearestStoreFromApi({ storeId: 22 });
    tree.instance().componentDidMount();
    expect(tree.instance().storeId).to.equal(22);
    storeCookieMock.restore();
  });

  it('componentWillReceiveProps ifBopisFeatureOn', () => {
    const nextProps = {
      isAddToRegistryFetching: 'true',
      selectedFilters: {
        price: '12',
        sort: ['lowtohigh'],
      },
    };
    tree.instance().registrySummary = {
      registryId: '1231',
    };
    tree.instance().storeId = 12;
    tree.instance().lastStoreId = 122;
    tree.instance().componentWillReceiveProps(nextProps);
    expect(getRegistryOwnerFirstCategory).to.be.called; // eslint-disable-line
  });

  it('componentWillReceiveProps bopisStoreChange for very first time', () => {
    const nextProps = {
      isAddToRegistryFetching: 'true',
      selectedFilters: {
        price: '12',
        sort: ['lowtohigh'],
      },
    };
    const newTree = wrapper({
      storeDetails: {
        storeId: '89081',
        siteBopus: [
          {
            siteId: undefined,
            bopusFlag: '1',
          },
        ],
      },
    });
    newTree.instance().eventObject = [
      {
        registryCode: '12',
      },
    ];
    newTree.instance().storeId = 12;
    newTree.instance().lastStoreId = 122;
    newTree.instance().componentWillReceiveProps(nextProps);
    expect(updateBopisCheckBoxState).to.be.called; // eslint-disable-line
  });

  it('preparePageSpecificMPulseMarks', () => {
    const nextProps = {
      registryOwnerFirstCategoryList: [{ registryItemList: [{}] }],
    };

    const newTree = wrapper({
      isMPulseEnabled: true,
      getHeaderLayout: undefined,
      mPulseMarksPopulated: undefined,
      isFetching: true,
    });
    newTree.instance().preparePageSpecificMPulseMarks(nextProps);
    expect(newTree.instance().mPulseMarksPopulated).to.equal(true);
  });

  it('preparePageSpecificMPulseMarks', () => {
    const nextProps = {
      registryOwnerFirstCategoryList: [{ registryItemList: [{}] }],
    };

    const newTree = wrapper({
      isMPulseEnabled: true,
      getHeaderLayout: undefined,
      mPulseMarksPopulated: undefined,
      isFetching: true,
    });
    window.instrumentation = {
      setPageMarks: () => {},
    };
    newTree.instance().preparePageSpecificMPulseMarks(nextProps);
    expect(newTree.instance().mPulseMarksPopulated).to.equal(true);
  });

  it('bopisStoreChange for very first time', () => {
    tree.instance().bopisStoreChange('1', { storeId: '1' }, '1');
    expect(updateBopisCheckBoxState).to.be.called; //eslint-disable-line
  });

  it('updateFilterItems newdata array branch', () => {
    tree.instance().setState({ filteredFirstCategoryItems: undefined });
    tree
      .instance()
      .updateFilterItems(
        { item: 12 },
        { selectedCheckboxFilter: 'store-pickup', selectedFilters: {} },
        { item: 12 }
      );
    expect(updateBopisCheckBoxState).to.be.called; //eslint-disable-line
  });

  it('handleBopisCheckboxChange with other checkbox', () => {
    tree.instance().handleBopisCheckboxChange('bopis');
    expect(updateBopisCheckBoxState).to.be.called; //eslint-disable-line
  });

  it('handleChangePickupInStore with other checkbox', () => {
    const saveLandingZip = sinon.spy();
    const onPickupInStoreButtonClick = sinon.spy();
    wrapper({
      saveLandingZip,
      onPickupInStoreButtonClick,
      storeDetails: {
        postalCode: '110032',
        landingZip: undefined,
      },
    })
      .instance()
      .handleChangePickupInStore({ preventDefault: () => {} });
    expect(saveLandingZip).to.be.called; //eslint-disable-line
  });

  it('renderRegistryQuickAdd', () => {
    const onPickupInStoreButtonClick = sinon.spy();
    const result = wrapper({
      maxItemInRegToShowQuickAdd: 50,
      onPickupInStoreButtonClick,
      storeDetails: {
        postalCode: '110032',
        landingZip: undefined,
      },
    })
      .instance()
      .renderRegistryQuickAdd();
    expect(result).to.not.equal(null);
  });
});
