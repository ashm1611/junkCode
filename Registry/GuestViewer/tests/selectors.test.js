import { fromJS } from 'immutable';

import {
  getSelectedCheckBoxFilter,
  makeSelectBarcode,
  makeSelectSitespectCampaigns,
  getBuyOffContextData,
  makeAkamaiInfo,
  getCopyRegistryStatus,
  makeSelectOosCategoryList,
  makeSelectOtherCategoryList,
  makeSelectFirstCategoryList,
  getSortedItemsFetchingStatus,
  getCategoryErrorStatus,
  getOosErrorStatus,
  getOosItemsFetchingStatus,
  isSocialAnnexReady,
  getRemainingItemsFetchingStatus,
  isFilterItemReady,
  getItemsFetchingStatus,
  getCopyProductCount,
  getFacetsData,
  makeSelectFromFirstCategory,
  getMiniCart,
} from '../selectors';

describe(__filename, () => {
  it('should select makeSelectBarcode', () => {
    const selector = makeSelectBarcode();
    const showBarcode = false;
    const mocked = fromJS({
      viewportConfig: {
        siteConfig: {
          registry: {
            registryGuestLayout: {
              showBarcode,
            },
          },
        },
      },
    });

    expect(selector(mocked)).to.deep.equal(showBarcode);
  });

  it('should select makeSelectBarcode and return true if undefined', () => {
    const selector = makeSelectBarcode();
    const mocked = fromJS({ viewportConfig: { siteConfig: { registry: {} } } });

    expect(selector(mocked)).to.deep.equal(true);
  });

  it('getSelectedCheckBoxFilter should return checkBoxState', () => {
    const selector = getSelectedCheckBoxFilter();

    const mockedstate = fromJS({ giftGiver: { checkBoxState: true } });

    expect(selector(mockedstate)).to.deep.equal(true);
  });
  it('getFacetsData should return value', () => {
    const selector = getFacetsData();
    const data = {
      test: 'test',
    };
    const mockedstate = fromJS({
      giftGiver: {
        facetsData: {
          test: 'test',
        },
      },
    });
    expect(selector(mockedstate).toJS()).to.deep.equal(data);
  });

  it('should fetch selectSitespect from state', () => {
    const selector = makeSelectSitespectCampaigns();
    const assignedCampaigns = [{ id: 'FulfillSort-A', campaignId: '12345' }];
    const mockedstate = fromJS({ sitespect: { assignedCampaigns } });

    expect(selector(mockedstate).toJS()).to.deep.equal(assignedCampaigns);
  });
  it('should fetch selectSitespect from state', () => {
    const selector = makeSelectSitespectCampaigns(true);
    const assignedClientCampaigns = [
      { id: 'FulfillSort-A', campaignId: '12345' },
    ];
    const mockedstate = fromJS({ sitespect: { assignedClientCampaigns } });

    expect(selector(mockedstate).toJS()).to.deep.equal(assignedClientCampaigns);
  });

  it('should fetch getBuyOffContextData from state', () => {
    const selector = getBuyOffContextData();
    const mockedstate = fromJS({
      buyoffcontext: { buyOffContext: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });

  it('should fetch makeAkamaiInfo  from state', () => {
    const selector = makeAkamaiInfo();
    const mockedstate = fromJS({
      akamaiHeader: { data: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });

  it('should fetch getCopyRegistryStatus  from state', () => {
    const selector = getCopyRegistryStatus();
    const mockedstate = fromJS({
      registryIsCopied: { serviceStatus: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });

  it('should fetch getCopyProductCount  from state', () => {
    const selector = getCopyProductCount();
    const mockedstate = fromJS({
      registryIsCopied: { data: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });

  it('should fetch getItemsFetchingStatus  from state', () => {
    const selector = getItemsFetchingStatus();
    const mockedstate = fromJS({
      giftGiver: { isFetchingFirst: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch isFilterItemReady  from state', () => {
    const selector = isFilterItemReady();
    const mockedstate = fromJS({
      giftGiver: { isFilterItemReady: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch getRemainingItemsFetchingStatus  from state', () => {
    const selector = getRemainingItemsFetchingStatus();
    const mockedstate = fromJS({
      giftGiver: { isFetchingRemaining: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });
  it('should fetch makeSelectFromFirstCategory from state', () => {
    const selector = makeSelectFromFirstCategory();
    const mockedstate = fromJS({
      giftGiver: { defaultVal: '0' },
    });

    expect(selector(mockedstate)).to.deep.equal('0');
  });
});
describe('#isSocialAnnexReady ', () => {
  it('should fetch isSocialAnnexReady  from state', () => {
    const selector = isSocialAnnexReady();
    const mockedstate = fromJS({
      giftGiver: { isSocialAnnexReady: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch getOosItemsFetchingStatus  from state', () => {
    const selector = getOosItemsFetchingStatus();
    const mockedstate = fromJS({
      giftGiver: { isFetchingOos: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch getOosErrorStatus  from state', () => {
    const selector = getOosErrorStatus();
    const mockedstate = fromJS({
      giftGiver: { errorOos: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch getCategoryErrorStatus  from state', () => {
    const selector = getCategoryErrorStatus();
    const mockedstate = fromJS({
      giftGiver: { error: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch getSortedItemsFetchingStatus  from state', () => {
    const selector = getSortedItemsFetchingStatus();
    const mockedstate = fromJS({
      giftGiver: { isFetching: false },
    });

    expect(selector(mockedstate)).to.deep.equal(false);
  });

  it('should fetch makeSelectFirstCategoryList  from state', () => {
    const selector = makeSelectFirstCategoryList();
    const mockedstate = fromJS({
      giftGiver: { firstCategorydata: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });

  it('should fetch makeSelectOtherCategoryList  from state', () => {
    const selector = makeSelectOtherCategoryList();
    const mockedstate = fromJS({
      giftGiver: { otherCategoriesData: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });

  it('should fetch makeSelectOosCategoryList  from state', () => {
    const selector = makeSelectOosCategoryList();
    const mockedstate = fromJS({
      giftGiver: { oosCategoryData: {} },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal({});
  });
});
describe('#enableMPulse', () => {
  const enableMPulseFlag = fromJS({
    enableMPulse: true,
  });
  const mockedState = fromJS({
    viewportConfig: {
      switchConfig: {
        GuestViewer: enableMPulseFlag,
        RegistryOwner: {
          displayDiscountedPrice: '12',
        },
      },
    },
    pickupInStore: { isPickupInStoreModalOpen: true },
    miniCartData: { data: {} },
  });

  describe('#miniCartState ', () => {
    it('should fetch getMiniCart from state', () => {
      const selector = getMiniCart();
      const mockedstateData = fromJS({
        miniCartData: {
          data: '1234',
        },
      });
      expect(selector(mockedstateData)).to.deep.equal('1234');
    });

    it('should select miniCartData', () => {
      const selector = getMiniCart();
      expect(selector(mockedState)).to.deep.equal(fromJS({}));
    });
  });
});
