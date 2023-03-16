import React from 'react';
import { shallow } from 'enzyme';
import {
  getProductPrice,
  getPurchase,
  getProductRating,
  renderAddToCartBtn,
  getStoreAvailabilityMessage,
  getProductAttributes as GetProductAttributes,
} from '../RegistryDetailModalUtil';

describe(__filename, () => {
  it('getProductPrice: for DiscountedPrice', () => {
    const props = {
      totalDeliveryCharges: 20,
      wasPrice: 120,
      formattedPrice: 100,
      sKUDetailVO: {},
      displayDiscountedPrice: true,
    };
    const wrapper = shallow(getProductPrice(props));
    expect(wrapper.find('div')).to.have.lengthOf(3);
  });

  it('getProductPrice: for personalized item', () => {
    const props = {
      formattedPrice: 100,
      sKUDetailVO: {},
      refNum: '12',
      personalizationType: 'CR',
    };
    const wrapper = shallow(getProductPrice(props));
    expect(wrapper.find('div')).to.have.lengthOf(2);
  });

  it('getProductPrice: for ltl item', () => {
    const props = {
      formattedPrice: 100,
      sKUDetailVO: { ltlItem: true },
      refNum: '12',
      personalizationType: 'CR',
    };
    const wrapper = shallow(getProductPrice(props));
    expect(wrapper.find('div')).to.have.lengthOf(2);
  });

  it('should call getPurchase', () => {
    const wrapper = getPurchase();
    expect(wrapper).to.not.equal(null);
  });

  it('should call getProductRating', () => {
    let props = {
      switchConfig: { enableCustomAggregateRatingPDP: true },
      REVIEWS: 2,
      RATINGS: 2,
      contextPath: '/test',
      otherRatingProps: { AverageRatingMicroData: '' },
      location: { pathName: '' },
      SEO_URL: '/test',
    };
    let wrapper = getProductRating(props);
    expect(wrapper).to.not.equal(null);

    props = {
      switchConfig: { enableCustomAggregateRatingPDP: true },
      RATINGS: 2,
      contextPath: '/test',
      otherRatingProps: { AverageRatingMicroData: '' },
      location: { pathName: '' },
      SEO_URL: '/test',
      variation: 'registryQuickView',
    };
    wrapper = getProductRating(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderAddToCartBtn', () => {
    const props = {
      tealiumData: {},
      styleVariation: 'oos',
      globalSwitchConfig: { enableRBYRFeature: {} },
      isGroupGiftEligible: true,
      sKUDetailVO: { skuId: '1234' },
      labels: { createRegistry: {} },
      isItemPurchased: true,
      itemType: 'PER',
    };
    const wrapper = renderAddToCartBtn(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderAddToCartBtn with otherProps', () => {
    let props = {
      tealiumData: { location: { pathname: '/test' } },
      styleVariation: 'ais',
      globalSwitchConfig: { enableRBYRFeature: {} },
      isGroupGiftEligible: false,
      sKUDetailVO: { skuId: '1234', personalizationType: 'CR' },
      labels: { createRegistry: {} },
      isItemPurchased: false,
      storeDetails: {},
      isInternationalUser: true,
      refNum: '12',
    };
    let wrapper = renderAddToCartBtn(props);
    expect(wrapper).to.not.equal(null);

    props = {
      tealiumData: { location: { pathname: '/test' } },
      styleVariation: 'oos',
      globalSwitchConfig: { enableRBYRFeature: {} },
      isGroupGiftEligible: false,
      sKUDetailVO: { skuId: '1234', personalizationType: 'CR' },
      labels: { createRegistry: {} },
      isItemPurchased: false,
      storeDetails: {},
    };
    wrapper = renderAddToCartBtn(props);
    expect(wrapper).to.not.equal(null);

    props = {
      tealiumData: { location: { pathname: '/test' } },
      globalSwitchConfig: { enableRBYRFeature: {} },
      isGroupGiftEligible: false,
      sKUDetailVO: { skuId: '1234', personalizationType: 'CR' },
      labels: { createRegistry: {} },
      isItemPurchased: false,
      storeDetails: {},
    };
    wrapper = renderAddToCartBtn(props);
    expect(wrapper).to.not.equal(null);

    props = {
      tealiumData: { location: { pathname: '/test' } },
      globalSwitchConfig: { enableRBYRFeature: {} },
      isGroupGiftEligible: true,
      sKUDetailVO: { skuId: '1234', personalizationType: 'CR' },
      labels: { createRegistry: {} },
      isItemPurchased: false,
      storeDetails: {},
      refNum: '12',
    };
    wrapper = renderAddToCartBtn(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getStoreAvailabilityMessage', () => {
    const props = { styleVariation: 'ais', labels: {} };
    const wrapper = getStoreAvailabilityMessage(props);
    expect(wrapper).to.not.equal(null);
  });

  it('getProductAttributes: should render renderMinimumQtyMessage', () => {
    const props = {
      displayNotifyRegistrantMsg: 'D',
      isMinimumQtyEnabled: true,
      sKUDetailVO: {},
      labels: {},
    };
    const wrapper = shallow(<GetProductAttributes {...props} />);
    expect(wrapper.find('div')).to.have.lengthOf(2);
  });

  it('getProductAttributes: should render renderMinimumQtyMessage when minimumQty provided', () => {
    const props = {
      displayNotifyRegistrantMsg: 'D',
      isMinimumQtyEnabled: true,
      sKUDetailVO: { minimumQty: 3 },
      labels: {},
    };
    const wrapper = shallow(<GetProductAttributes {...props} />);
    expect(wrapper.find({ className: 'tooltip-bottom' })).to.have.lengthOf(2);
  });

  it('getProductAttributes: for ltl item', () => {
    const props = {
      displayNotifyRegistrantMsg: 'D',
      isMinimumQtyEnabled: true,
      sKUDetailVO: { ltlItem: true },
      labels: {},
    };
    const wrapper = shallow(<GetProductAttributes {...props} />);
    expect(wrapper.find('ProductTileLTLDetail')).to.have.lengthOf(1);
  });

  it('getProductAttributes: for internation user', () => {
    const props = {
      displayNotifyRegistrantMsg: 'D',
      isMinimumQtyEnabled: true,
      sKUDetailVO: { intlRestricted: true },
      labels: {},
      isInternationalUser: true,
    };
    const wrapper = shallow(<GetProductAttributes {...props} />);
    expect(wrapper.find('div')).to.have.lengthOf(3);
  });
});
