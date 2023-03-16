/* eslint-disable max-lines */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import * as commonUtil from '@bbb-app/utils/common';
import * as windowWidth from '@bbb-app/utils/viewPortUtils';
import * as multiAppUtil from '@bbb-app/utils/multiAppUtil';
import * as redirectToUtil from '@bbb-app/utils/redirectTo';
import * as RegistryUtils from '@bbb-app/utils/RegistryUtils';
import {
  PureProductGridTile,
  ProductGridTile,
  FavouriteButton,
} from '../ProductGridTile';
import AddToCart from '../../../../../containers/AddToCart/AddToCart.async';
import { isUsersRegOnGuest } from '../../../../../components/Pages/CollegeChecklist/ListUtils';
import * as isRBYRRegistry from '../../utils/isRBYRRegistry';
import contributeModalComponent from '../../CashFunds/ContributeModal/ContributeModalComponent.async';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const actions = {
    quickView: 'Quick View',
    ideaBoard: 'Idea Board',
  };
  const label = {
    createRegistry: {},
  };
  const sKUDetailVO = {
    skuImages: {
      mediumImage: {},
    },
    personalizationType: null,
    activeFlag: true,
    minimumQty: 2,
  };
  const deviceConfig = {
    DESKTOP: 1024,
    TABLET: 768,
  };
  const activeRegistry = {
    rehistryId: '12345678',
  };
  const registryList = [];
  // const itemType ='CSH'
  it('should render in its simplest form without throwing', () => {
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        markedAsFav
        activeRegistry={activeRegistry}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        isMinimumQtyEnabled
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render in its simplest form without throwing for buybuybaby site', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    sinon.stub(commonUtil, 'getSiteId').returns('BedBathCanada');
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        markedAsFav
        activeRegistry={activeRegistry}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        isMinimumQtyEnabled
        siteId="BuyBuyBaby"
        isCanada
      />
    );
    tree
      .find('QuantitySelector')
      .at(0)
      .props()
      .updateQuantity();
    expect(tree).to.not.equal(null);
    commonUtil.isBedBathCanada.restore();
    commonUtil.getSiteId.restore();
  });

  it('should render in its simplest form without throwing for buybuybaby tbs site', () => {
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        markedAsFav
        activeRegistry={activeRegistry}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        isMinimumQtyEnabled
        siteId="TBS_BuyBuyBaby"
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should not render QV for inactive item', () => {
    sKUDetailVO.activeFlag = false;
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        markedAsFav
        activeRegistry={activeRegistry}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render the add to cart when product is not purchased', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(400);
    const storeDetails = { storeId: '123' };
    const registryData = {
      registryResVO: { registrySummaryVO: { coRegistrantFirstName: 'test' } },
    };
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        ggEligibleItem
        storeDetails={storeDetails}
        registryData={registryData}
      />
    );
    expect(tree.find(AddToCart)).to.have.length(1);
    windowObj.restore();

    let result = tree.instance().getDataLocatorATC();
    expect(result).to.equal('registryguest-addtocartbutton');

    tree.setProps({ pickupFilterSelected: true, ggEligibleItem: false });
    result = tree.instance().getDataLocatorATC();
    expect(result).to.equal('registryguest-pickitupbutton');

    tree.setProps({ styleVariation: 'ais' });
    result = tree.instance().getDataLocatorATC();
    expect(result).to.equal('registryguest-pickitupbutton');
  });

  it('should render  for inCartFlagged item', () => {
    sKUDetailVO.inCart = true;
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        markedAsFav
        activeRegistry={activeRegistry}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render FavouriteButton for mobile', () => {
    const tree = FavouriteButton(false, true);
    expect(tree).to.not.equal(null);
  });
});

describe('isUsersRegOnGuest method', () => {
  it('should return false when user is not viewing his registry', () => {
    const curRegId = '12345';
    const activeRegId = '12345';
    const listOfReg = [curRegId, activeRegId];
    const result = isUsersRegOnGuest(listOfReg, curRegId, activeRegId);

    expect(result).to.be.true;
  });

  it('should return false when user is not viewing his registry', () => {
    const curRegId = '12345';
    const activeRegId = '67890';
    const listOfReg = [curRegId, activeRegId];
    const result = isUsersRegOnGuest(listOfReg, curRegId, activeRegId);

    expect(result).to.be.false;
  });

  it('should return false when listOfReg is empty', () => {
    const listOfReg = [];
    const result = isUsersRegOnGuest(listOfReg);

    expect(result).to.be.false;
  });
});

describe('ProductGridTile methods', () => {
  const actions = {
    quickView: 'Quick View',
    ideaBoard: 'Idea Board',
  };
  const label = {
    createRegistry: {},
  };
  const sKUDetailVO = {
    skuImages: {
      mediumImage: {},
    },
    personalizationType: 'CR',
    skuAttributes: {
      RLP: [
        {
          attributeDescrip: 'here we are',
        },
      ],
    },
    minimumQty: 2,
  };
  const deviceConfig = {
    DESKTOP: 1024,
    TABLET: 768,
  };
  const registryList = [];
  it('should call the onQuickViewButtonClick correctly', () => {
    const onQuickViewButtonClick = sinon.spy();
    const updateSkuIdForAnchoring = sinon.spy();
    const handleTealiumEvent = sinon.spy();
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={onQuickViewButtonClick}
        updateSkuIdForAnchoring={updateSkuIdForAnchoring}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    const event = {
      target: {
        id: 'qtySelect',
        dataset: { locator: 'view_cart' },
        offsetParent: {
          dataset: {
            dataset: 'locator',
          },
        },
      },
      preventDefault: () => {},
    };
    tree.instance().onQuickViewButtonClick(event);
    tree.setProps({ isMobile: false, sKUDetailVO: { activeFlag: true } });
    tree.instance().onQuickViewButtonClick(event);
    expect(onQuickViewButtonClick.called);
  });

  it('should call redirectToStub for cartAndCheckout on quickview click', () => {
    const isHrefValidForMultiAppHardSPAStub = sinon
      .stub(multiAppUtil, 'isHrefValidForMultiAppHardSPA')
      .returns(true);
    const redirectToStub = sinon
      .stub(redirectToUtil, 'redirectTo')
      .callsFake(() => {});
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={sinon.stub()}
        updateSkuIdForAnchoring={sinon.stub()}
        handleTealiumEvent={sinon.stub()}
      />
    );
    const event = {
      target: {
        tagName: 'A',
        dataset: { locator: 'atcmodal_viewcartandcheckoutctabtn' },
        offsetParent: {
          dataset: {
            locator: 'modaloverlay',
          },
        },
      },
      preventDefault: () => {},
    };
    tree.instance().onQuickViewButtonClick(event);
    isHrefValidForMultiAppHardSPAStub.restore();
    redirectToStub.restore();
    expect(redirectToStub.called).to.be.equal(true);
  });

  it('should call preventDefault for Button on quickview click', () => {
    sKUDetailVO.activeFlag = true;
    const preventDefault = sinon.stub();
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={sinon.stub()}
        updateSkuIdForAnchoring={sinon.stub()}
        handleTealiumEvent={sinon.stub()}
      />
    );
    const event = {
      target: {
        tagName: 'BUTTON',
        dataset: { locator: 'myItems' },
        textContent: 'RegistryGroupGifting.contributeCtaLabel',
        offsetParent: {
          dataset: {
            locator: 'modaloverlay',
          },
        },
      },
      preventDefault,
    };
    tree.instance().onQuickViewButtonClick(event);
    expect(preventDefault.called).to.be.equal(true);
  });

  it('should call the onFindInStoreClick correctly', () => {
    const onPickupInStoreButtonClick = sinon.spy();
    const findInStoreRegistryTealiumInfo = sinon.spy();
    const onFindInStoreClick = sinon.spy();
    const handleTealiumEvent = sinon.spy();
    const getConcatenatedScene7URLWithImageId = sinon.spy();
    const activeRegistry = {
      rehistryId: '12345678',
    };
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onPickupInStoreButtonClick={onPickupInStoreButtonClick}
        findInStoreRegistryTealiumInfo={findInStoreRegistryTealiumInfo}
        handleTealiumEvent={handleTealiumEvent}
        getConcatenatedScene7URLWithImageId={
          getConcatenatedScene7URLWithImageId
        }
        activeRegistry={activeRegistry.rehistryId}
      />
    );
    const event = {
      preventDefault: () => {},
    };
    tree.instance().onFindInStoreClick(event);
    tree.setProps({ tealiumData: true });
    tree.instance().onFindInStoreClick(event);
    expect(onFindInStoreClick.called);
  });

  it('onFindInStoreClick: should call onPickupInStoreButtonClick', () => {
    const personalizationApplicableStub = sinon
      .stub(RegistryUtils, 'personalizationApplicable')
      .returns(false);
    const onPickupInStoreButtonClick = sinon.stub();
    const activeRegistry = {
      rehistryId: '12345678',
    };
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onPickupInStoreButtonClick={onPickupInStoreButtonClick}
        findInStoreRegistryTealiumInfo={sinon.stub()}
        getConcatenatedScene7URLWithImageId={sinon.stub()}
        activeRegistry={activeRegistry.rehistryId}
        akamaiData={{ zip: '' }}
      />
    );
    const event = {
      preventDefault: () => {},
    };
    tree.instance().onFindInStoreClick(event);
    personalizationApplicableStub.restore();
    expect(onPickupInStoreButtonClick.called).to.be.equal(true);
  });

  it('should call getStoreAvailabilityMessage correctly', () => {
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        ggEligibleItem={false}
        skuInStore="0"
      />
    );
    const storeDetails = { commonName: 'East' };
    tree.instance().getStoreAvailabilityMessage();
    tree.setProps({
      skuInStore: '1',
      pickupFilterSelected: true,
      storeDetails,
    });
    tree.instance().getStoreAvailabilityMessage();
    expect(tree.find('span')).to.have.lengthOf(0);
  });

  it('should call getATCLabel correctly', () => {
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        ggEligibleItem={false}
        skuInStore="0"
      />
    );
    const storeDetails = { commonName: 'East' };
    tree.instance().getATCLabel();
    tree.setProps({
      skuInStore: '1',
      pickupFilterSelected: true,
      storeDetails,
    });
    const result = tree.instance().getATCLabel();
    expect(result).to.equal('Pick It Up');
  });

  it('should  call getPayload ', () => {
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        ggEligibleItem={false}
        skuInStore="0"
      />
    );
    const storeDetails = { commonName: 'East', storeId: 345 };
    tree.instance().getPayload();
    tree.setProps({
      skuInStore: '1',
      pickupFilterSelected: true,
      storeDetails,
    });
    const result = tree.instance().getPayload();
    expect(result.reserveNow).to.equal('true');
  });

  it('should  call isATCDisabled ', () => {
    const storeDetails = { commonName: 'East', storeId: 345 };
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        storeDetails={storeDetails}
        registryList={registryList}
        styleVariation="ais"
        purchased={false}
        ggEligibleItem={false}
        skuInStore="0"
      />
    );
    const result = tree.instance().isATCDisabled();
    expect(result).to.equal(false);
  });

  it('should  call isATCDisabled for out of stock item', () => {
    const storeDetails = { commonName: 'East', storeId: 345 };
    const tree = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg=""
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        storeDetails={storeDetails}
        registryList={registryList}
        styleVariation="oos"
        purchased={false}
        ggEligibleItem
        skuInStore="0"
      />
    );
    const result = tree.instance().isATCDisabled();
    expect(result).to.equal(true);
  });
});

describe('Registry ProductGridTile 1', () => {
  let wrapper;
  let wrapperInstance;
  const actions = {
    quickView: 'Quick View',
    ideaBoard: 'Idea Board',
  };
  const label = {
    createRegistry: {},
  };
  const sKUDetailVO = {
    skuImages: {
      mediumImage: {},
    },
    personalizationType: 'PB',
    minimumQty: 2,
  };
  const deviceConfig = {
    DESKTOP: 1024,
    TABLET: 768,
  };
  const productUrl = 'store/registry';
  const registryList = [];
  const handleTealiumEvent = sinon.stub();
  const globalSwitchConfig = { enableRBYRFeature: true };

  beforeEach(() => {
    wrapper = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        labels={label}
        productUrl={productUrl}
        displayNotifyRegistrantMsg=""
        personalisedCode="Y"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        handleTealiumEvent={handleTealiumEvent}
        registryList={registryList}
        purchased
        isMinimumQtyEnabled
        isBelowLineItem={'false'}
        ggEligibleItem
        ggItemContributionNeeded={100}
        amountFulfilled={50}
        isBopisFeatureEnable
        markedAsFav
        globalSwitchConfig={globalSwitchConfig}
        enableCashFund
      />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper = null;
    wrapperInstance = null;
  });
  it('should render contributeModalComponent', () => {
    const preventDefault = sinon.stub();
    const event = {
      target: {
        tagName: 'BUTTON',
        dataset: { locator: 'groupGiftingContribute' },
        textContent: 'RegistryGroupGifting.contributeCtaLabel',
      },
      preventDefault,
    };
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={sinon.stub()}
        updateSkuIdForAnchoring={sinon.stub()}
        handleTealiumEvent={sinon.stub()}
        itemType={'CSH'}
        isDpfItem
      />
    );

    tree.simulate('click');
    tree.instance().handleTealiumOnContributeBtn(event);
    expect(tree.find(contributeModalComponent)).to.have.lengthOf(1);
  });

  it('should render contributeModalComponent on click ProductTile', () => {
    const preventDefault = sinon.stub();
    const event = {
      target: {
        tagName: 'BUTTON',
        dataset: { locator: 'groupGiftingContribute' },
        textContent: 'RegistryGroupGifting.contributeCtaLabel',
      },
      preventDefault,
    };
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={sinon.stub()}
        updateSkuIdForAnchoring={sinon.stub()}
        handleTealiumEvent={sinon.stub()}
        isBelowLineItem
        skuInStore={'1'}
        itemType={'CSH'}
        isDpfItem
      />
    );
    const primaryLink = tree.find('PrimaryLink').at(1);
    primaryLink.simulate('click');
    tree.instance().handleTealiumOnContributeBtn(event);
    expect(tree.find(contributeModalComponent)).to.have.lengthOf(1);
  });
  it('should not call handleTealiumEvent when handleTealiumEvent prop is not available', () => {
    const preventDefault = sinon.stub();
    const event = {
      target: {
        tagName: 'BUTTON',
        dataset: { locator: 'groupGiftingContribute' },
        textContent: 'RegistryGroupGifting.contributeCtaLabel',
      },
      preventDefault,
    };
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={sinon.stub()}
        updateSkuIdForAnchoring={sinon.stub()}
        itemType={'CSH'}
      />
    );

    tree.simulate('click');
    tree.instance().handleTealiumOnContributeBtn(event);
    expect(tree.find(contributeModalComponent)).to.have.lengthOf(1);
  });
  it('should render clearContributeCashFund', () => {
    const clearContributeCashFund = sinon.spy();
    const handleFirstCategoryCall = sinon.spy();
    const cfSubmitAPIStatus = { submitSuccessFlag: true };
    const tree = shallow(
      <ProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={label}
        displayNotifyRegistrantMsg="N"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        registryList={registryList}
        purchased={false}
        onQuickViewButtonClick={sinon.stub()}
        updateSkuIdForAnchoring={sinon.stub()}
        handleTealiumEvent={sinon.stub()}
        clearContributeCashFund={clearContributeCashFund}
        handleFirstCategoryCall={handleFirstCategoryCall}
        cfSubmitAPIStatus={cfSubmitAPIStatus}
      />
    );
    tree.setState({ cashfundsModalState: true });
    tree.instance().handleCashFundsModal();
    expect(clearContributeCashFund).to.be.called;
  });
  it('should return correct value for changeQuantity data code', () => {
    const value = 4;
    wrapperInstance.changeQuantity(value);
    expect(wrapper.state('quantity')).to.equal(4);
  });

  it('should get the PDP Url', () => {
    wrapperInstance.getPDPURL();
    expect(wrapper).to.not.equal(null);
  });

  it('getPDPURL: should return the PDP Url when isRBYRRegistryEnabled is true', () => {
    const isRBYRRegistryStub = sinon
      .stub(isRBYRRegistry, 'default')
      .returns(true);
    wrapper.setProps({
      productURL: '/test/skuId=1234',
      ltlDeliveryServices: 'white glove',
    });
    const url = wrapperInstance.getPDPURL();
    isRBYRRegistryStub.restore();
    expect(url).to.be.equal(
      'undefined/test/skuId=1234&registryId=undefined&giftGiver=true&isRBYRRegistryEnabled=true&sopt=white glove'
    );
  });

  it('checkItemNeedToExcluded:should return true when itemType is Personalized', () => {
    const val = wrapperInstance.checkItemNeedToExcluded('PER');
    expect(val).to.be.equal(true);
  });

  it('isIntlDisabled: should return true for isInternationalUser ', () => {
    wrapper.setProps({
      isInternationalUser: true,
      sKUDetailVO: { intlRestricted: true },
    });
    const val = wrapperInstance.isIntlDisabled();
    expect(val).to.be.equal(true);
  });

  it('isAddToCartDisable: should return true for isInternationalUser', () => {
    const val = wrapperInstance.isAddToCartDisable(
      undefined,
      '123',
      undefined,
      true
    );
    expect(val).to.be.equal(true);
  });

  it('isAddToRegistryEnabled: should return true for PY as personalized code', () => {
    const val = wrapperInstance.isAddToRegistryEnabled('123', 'PY', undefined);
    expect(val).to.be.equal(true);
  });

  it('isGGItemEligible: should return true', () => {
    wrapper.setProps({
      ggEligibleItem: true,
      ggItemContributionNeeded: 0,
      enableCashFund: false,
    });
    const val = wrapperInstance.isGGItemEligible();
    expect(val).to.be.equal(true);
  });
  it('isGGItemEligible: should return true when itemType is CSH', () => {
    wrapper.setProps({
      ggEligibleItem: true,
      ggItemContributionNeeded: 0,
      itemType: 'CSH',
    });
    const val = wrapperInstance.isGGItemEligible();
    expect(val).to.be.equal(true);
  });

  it('renderFavoritebadge: should return mobile fav layout', () => {
    wrapper.setProps({
      isMobile: true,
    });
    const val = wrapperInstance.renderFavoritebadge(true, 'test');
    expect(val.props.className).to.be.equal('favoritedes');
  });

  it('should render renderPurchasedQuantityContainer and return needed quantity', () => {
    wrapper.setProps({ qtyRequested: 4, qtyPurchased: 2 });
    wrapperInstance.renderPurchasedQuantityContainer();
    expect(wrapper).to.not.equal(null);
  });

  it('should call getCharLength', () => {
    let windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(1025);
    wrapperInstance.getCharLength();
    windowObj.restore();

    windowObj = sinon.stub(windowWidth, 'getWindowInnerWidth').returns(1200);
    wrapperInstance.getCharLength();
    windowObj.restore();
  });

  it('should get the PDP Url', () => {
    wrapper.setProps({ tealiumData: { location: '/test' } });
    wrapperInstance.renderAddToCartBtn();
    expect(wrapper).to.not.equal(null);
  });
});
describe('Registry ProductGridTile 1 with key as false', () => {
  let wrapper;
  let wrapperInstance;
  const actions = {
    quickView: 'Quick View',
    ideaBoard: 'Idea Board',
  };
  const label = {
    createRegistry: {},
  };
  const sKUDetailVO = {
    skuImages: {
      mediumImage: {},
    },
    personalizationType: 'PB',
    minimumQty: 2,
  };
  const deviceConfig = {
    DESKTOP: 1024,
    TABLET: 768,
  };
  const productUrl = 'store/registry';
  const registryList = [];
  const handleTealiumEvent = sinon.stub();
  const globalSwitchConfig = { enableRBYRFeature: true };

  beforeEach(() => {
    wrapper = shallow(
      <PureProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        labels={label}
        productUrl={productUrl}
        displayNotifyRegistrantMsg=""
        personalisedCode="Y"
        sKUDetailVO={sKUDetailVO}
        deviceConfig={deviceConfig}
        handleTealiumEvent={handleTealiumEvent}
        registryList={registryList}
        purchased
        isMinimumQtyEnabled
        isBelowLineItem={'false'}
        ggEligibleItem
        ggItemContributionNeeded={100}
        amountFulfilled={50}
        isBopisFeatureEnable
        markedAsFav
        globalSwitchConfig={globalSwitchConfig}
        enableCashFund={false}
      />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper = null;
    wrapperInstance = null;
  });

  it('should return correct value for changeQuantity data code', () => {
    const value = 4;
    wrapperInstance.changeQuantity(value);
    expect(wrapper.state('quantity')).to.equal(4);
  });

  it('Should not call renderQtyAndCTA when itemType is CSH', () => {
    const renderQtyAndCTA = sinon.spy();
    wrapper.setProps({
      itemType: 'CSH',
    });
    wrapper.instance().renderQtyAndCTA();
    expect(renderQtyAndCTA.called).to.be.equal(false);
  });
});
