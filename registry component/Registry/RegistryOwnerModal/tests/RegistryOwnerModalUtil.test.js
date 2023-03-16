import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as windowWidth from '@bbb-app/utils/viewPortUtils';
import * as commonUtil from '@bbb-app/utils/common';

import {
  ProductSkuAttributesRLP,
  renderReview,
  renderColorSizeUpc,
  renderButton,
  renderPDPLinkText,
  getStoreAvailabilityMessage,
  renderFavoriteBadge,
  renderFavouriteBtn,
  renderItemStatusBadge,
  renderRemoveRegistryLink,
  renderWantPurchased,
  renderAddToCartBtn,
  renderPurchasedBadge,
  renderProductImage,
  getCharLength,
  getDFShopMoreUrl,
  getToolTipText,
  renderMarkAsPurchased,
  renderOOSMsg,
} from '../RegistryOwnerModalUtil';
import {
  DF_SHOP_MORE_CANADA_URL,
  DF_SHOP_MORE_URL,
  DF_SHOP_MORE_BABY_URL,
  LTL_INSIDE_ENTRYWAY,
  LTL_ROOM_OF_CHOICE,
  LTL_WHITE_GLOVE_DELIVERY,
  LTL_WHITE_GLOVE_ASSEMBLY,
} from '../constants';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call ProductSkuAttributesRLP with LTL item', () => {
    let param = {
      sKUDetailVO: {
        ltlItem: true,
        skuAttributes: { RLP: [] },
        displayShipMsg: 'free shipping',
      },
      shipMethodUnsupported: true,
      dslUpdateableMessage: () => {},
      hideParent: () => {},
    };
    let wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);

    param = {
      sKUDetailVO: { ltlItem: true, skuAttributes: { RLP: [{}, {}] } },
      shipMethodUnsupported: true,
      dslUpdateableMessage: () => {},
      hideParent: () => {},
    };
    wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);

    param = {
      sKUDetailVO: { ltlItem: true, skuAttributes: { RLP: [{}, {}] } },
      hideParent: () => {},
      ltlDeliveryServices: 'test',
      totalDeliveryCharges: 0,
      labels: {},
    };
    wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);
  });

  it('should call ProductSkuAttributesRLP with LTL item and delivery charges', () => {
    let param = {
      sKUDetailVO: {
        ltlItem: true,
        skuAttributes: { RLP: [] },
        displayShipMsg: 'free shipping',
        personalizationType: 'CR',
      },
      totalDeliveryCharges: 23,
      labels: {},
      ltlDeliveryServices: 'white glove',
      shipMethodUnsupported: false,
      refNum: 12,
    };
    let wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);

    param = {
      sKUDetailVO: { ltlItem: true, skuAttributes: { RLP: [{}] } },
      totalDeliveryCharges: 23,
      labels: {},
      ltlDeliveryServices: 'white glove',
      shipMethodUnsupported: false,
    };
    wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);
  });

  it('should call ProductSkuAttributesRLP without LTL item', () => {
    let param = {
      sKUDetailVO: {
        skuAttributes: { RLP: [] },
        displayShipMsg: 'free shipping',
      },
      labels: {},
    };
    let wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);

    param = {
      sKUDetailVO: { skuAttributes: { RLP: [{}, {}, {}] } },
      labels: {},
    };
    wrapper = ProductSkuAttributesRLP(param);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderReview ', () => {
    const props = {
      sKUDetailVO: { displayName: 'test' },
      config: { writeReview: true },
      labels: {},
      contextPath: '',
      handleTealiumEvent: () => {},
      tealiumObject: {},
    };

    const wrapper = renderReview(
      props,
      () => {},
      () => {}
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderColorSizeUpc', () => {
    const param = {
      labels: { NO_UPC_TEXT_LBL: 'No UPC' },
      color: 'red',
      size: 'XS',
      upc: '',
    };
    const wrapper = renderColorSizeUpc(param);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderButton', () => {
    const props = {
      registryModalData: {
        skuInStore: '',
        selectedCheckboxFilter: 'in-stock-online',
        isBelowLineItem: 'false',
        isBopisFeatureEnable: true,
        sKUDetailVO: { skuId: '1234' },
        tealiumData: {},
        labels: {},
      },
    };
    const wrapper = renderButton(props);
    expect(wrapper).to.not.equal(null);

    let otherProps = {
      registryModalData: {
        selectedCheckboxFilter: 'test',
        sKUDetailVO: {},
        tealiumData: {},
        labels: {},
      },
    };
    let tree = renderButton(otherProps);
    expect(tree).to.not.equal(null);

    otherProps = {
      registryModalData: {
        sKUDetailVO: {},
        tealiumData: {},
        labels: {},
        isBopisFeatureEnable: true,
        isBelowLineItem: 'false',
      },
    };

    tree = renderButton(otherProps);
    expect(tree).to.not.equal(null);

    otherProps = {
      registryModalData: {
        sKUDetailVO: {},
        tealiumData: {},
        labels: {},
        isBopisFeatureEnable: true,
        isBelowLineItem: 'false',
        skuInStore: '1',
      },
    };

    tree = renderButton(otherProps);
    expect(tree).to.not.equal(null);

    otherProps = {
      registryModalData: {
        sKUDetailVO: {},
        tealiumData: {},
        labels: {},
        isBopisFeatureEnable: true,
        ggEligibleItem: true,
      },
    };

    tree = renderButton(otherProps);
    expect(tree).to.not.equal(null);
  });

  it('should call renderPDPLinkText', () => {
    const props = { itemType: 'DPF', labels: {} };
    const wrapper = renderPDPLinkText(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderMarkAsPurchased with itemType as DPF', () => {
    const props = { itemType: 'DPF', labels: {} };
    const wrapper = renderMarkAsPurchased(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderMarkAsPurchased with itemType as DPF', () => {
    const changeQuantity = sinon.spy();
    const wrapper = renderMarkAsPurchased(0, changeQuantity, true, true);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderOOSMsg if', () => {
    const props = {
      isBelowLineItem: 'true',
      ggRegItemStatus: '',
      purchased: false,
      displayNotifyRegistrantMsg: false,
    };
    const wrapper = renderOOSMsg({ props });
    expect(wrapper).to.not.equal(null);
  });
  it('should call renderOOSMsg else', () => {
    const props = {};
    const wrapper = renderOOSMsg({ props });
    expect(wrapper).to.not.equal(null);
  });

  it('should call getStoreAvailabilityMessage', () => {
    const props = { labels: {} };
    const wrapper = getStoreAvailabilityMessage(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderFavoriteBadge', () => {
    let wrapper = renderFavoriteBadge(true, () => {}, true);
    expect(wrapper).to.not.equal(null);

    wrapper = renderFavoriteBadge(true, () => {}, false);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderFavouriteBtn if', () => {
    let wrapper = renderFavouriteBtn(true, () => {}, true, true);
    expect(wrapper).to.not.equal(null);

    wrapper = renderFavouriteBtn(true, () => {}, false, false);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderFavouriteBtn else', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    let wrapper = renderFavouriteBtn({}, true, () => {}, true);
    expect(wrapper).to.not.equal(null);

    wrapper = renderFavouriteBtn({}, true, () => {}, false);
    expect(wrapper).to.not.equal(null);
    commonUtil.isBedBathCanada.restore();
  });
  it('should call renderItemStatusBadge when enableNewRegDashboard is true', () => {
    const props = {
      labels: {},
      isBelowLineItem: 'true',
      enableNewRegDashboard: true,
    };
    const otherProps = { props, babysiteId: true };
    const wrapper = renderItemStatusBadge(otherProps);
    expect(wrapper).to.not.equal(null);
  });
  it('should call renderItemStatusBadge', () => {
    const props = { labels: {}, isBelowLineItem: 'true' };
    const otherProps = { props, babysiteId: true };
    const wrapper = renderItemStatusBadge(otherProps);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderItemStatusBadge for N&D item', () => {
    let props = { labels: {}, displayNotifyRegistrantMsg: 'N' };
    const otherProps = { props };
    let wrapper = renderItemStatusBadge(otherProps);
    expect(wrapper).to.not.equal(null);

    props = {
      labels: {},
      displayNotifyRegistrantMsg: 'D',
      sKUDetailVO: { skuInStock: true },
      enableNewRegDashboard: true,
    };
    wrapper = renderItemStatusBadge({ props });
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderRemoveRegistryLink', () => {
    const wrapper = renderRemoveRegistryLink({}, () => {}, true);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderWantPurchased', () => {
    const props = { labels: {}, qtyRequested: 0 };
    const wrapper = renderWantPurchased(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderWantPurchased when enableNewRegDashboard is true', () => {
    const props = { labels: {}, qtyRequested: 0, enableNewRegDashboard: true };
    const wrapper = renderWantPurchased(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderAddToCartBtn', () => {
    const data = {
      props: {
        displayNotifyRegistrantMsg: 'N',
        sKUDetailVO: { personalizationType: 'PB' },
        tealiumData: {},
        refNum: '12',
      },
    };
    const wrapper = renderAddToCartBtn(data);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderPurchasedBadge for cashfund items', () => {
    const props = { labels: {}, babysiteId: true, itemType: 'CSH' };
    const wrapper = renderPurchasedBadge(props);
    expect(wrapper).to.not.equal(null);
  });
  it('should call renderPurchasedBadge', () => {
    const props = { labels: {}, babysiteId: true };
    const wrapper = renderPurchasedBadge(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderProductImage', () => {
    const wrapper = renderProductImage({});
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderProductImage when enableNewRegDashboard is true', () => {
    const props = { enableNewRegDashboard: true };
    const wrapper = renderProductImage(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getCharLength', () => {
    let windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(1025);
    let wrapper = getCharLength();
    windowObj.restore();
    expect(wrapper).to.not.equal(null);

    windowObj = sinon.stub(windowWidth, 'getWindowInnerWidth').returns(1200);
    wrapper = getCharLength();
    expect(wrapper).to.not.equal(null);
    windowObj.restore();
  });
  it('should call getDFShopMoreUrl when siteId is BedBathCanada', () => {
    const wrapper = getDFShopMoreUrl('BedBathCanada');
    expect(wrapper).to.be.equal(DF_SHOP_MORE_CANADA_URL);
  });
  it('should call getDFShopMoreUrl when siteId is BedBathUS', () => {
    const wrapper = getDFShopMoreUrl('BedBathUS');
    expect(wrapper).to.be.equal(DF_SHOP_MORE_URL);
  });
  it('should call getDFShopMoreUrl when siteId is BuyBuyBaby', () => {
    const wrapper = getDFShopMoreUrl('BuyBuyBaby');
    expect(wrapper).to.be.equal(DF_SHOP_MORE_BABY_URL);
  });

  it('should return LTL shipping method as INSIDE ENTRYWAY', () => {
    const ltlShipMethodDesc = 'Inside Entryway';
    const expResult = getToolTipText(ltlShipMethodDesc);
    expect(expResult).to.deep.equal(LTL_INSIDE_ENTRYWAY);
  });
  it('should return LTL shipping method as ROOM OF CHOICE', () => {
    const ltlShipMethodDesc = 'Room of Choice';
    const expResult = getToolTipText(ltlShipMethodDesc);
    expect(expResult).to.deep.equal(LTL_ROOM_OF_CHOICE);
  });
  it('should return LTL shipping method as WHITE GLOVE DELIVERY', () => {
    const ltlShipMethodDesc = 'White Glove Delivery';
    const expResult = getToolTipText(ltlShipMethodDesc);
    expect(expResult).to.deep.equal(LTL_WHITE_GLOVE_DELIVERY);
  });
  it('should return LTL shipping method as WHITE GLOVE ASSEMBLY', () => {
    const ltlShipMethodDesc = 'White Glove with Assembly';
    const expResult = getToolTipText(ltlShipMethodDesc);
    expect(expResult).to.deep.equal(LTL_WHITE_GLOVE_ASSEMBLY);
  });
});
