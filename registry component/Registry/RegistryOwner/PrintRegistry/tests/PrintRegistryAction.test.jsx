import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as commonUtil from '@bbb-app/utils/common';
import * as isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import * as utils from '@bbb-app/utils/isTbs';

import PrintRegistryAction from '../PrintRegistryAction';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const onComponentMount = sinon.spy();
  const getRegistryOwnerFirstCategory = sinon.spy();
  const fetchPickUpStore = sinon.spy();
  const labels = {
    registryDetails: {
      mustSubmitLabel: 'mustSubmitLabel',
      and: '&',
      groupGift: 'GROUP GIFTING',
    },
    giftGiver: {
      includingDeliveryLabel: '(Inc. delivery)',
    },
    createRegistry: {
      babyGenderSurprise: "It's a Surprise",
      Boy1Girl1: '1 Boy & 1 Girl',
      babyGenderBoy: 'Boy',
      babyGenderGirl: 'Girl',
    },
  };

  const registryOwnerFirstCategoryList = [
    {
      registryItemList: [
        {
          markedAsFav: false,
          displayNotifyRegistrantMsg: false,
          personalizationOptionsDisplay: true,
          ltlShipMethodDesc: true,
          formattedTotalDeliveryCharges: '$50',
          isBelowLineItem: 'false',
          sKUDetailVO: {
            skuInStoreInventory: true,
            displayName: 'Product 1',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
          itemType: 'CSH',
        },

        {
          markedAsFav: false,
          displayNotifyRegistrantMsg: true,
          isBelowLineItem: 'false',
          sKUDetailVO: {
            skuInStoreInventory: true,
            displayName: 'Product 1',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
          itemType: 'CSH',
        },
        {
          markedAsFav: true,
          sKUDetailVO: {
            skuInStoreInventory: true,
            displayName: 'Product 1',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
          itemType: 'CSH',
        },
        {
          markedAsFav: true,
          sKUDetailVO: {
            skuInStoreInventory: false,
            displayName: 'Product 2',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
          itemType: 'CSH',
        },
        {
          markedAsFav: true,
          sKUDetailVO: {
            skuInStoreInventory: false,
            displayName: 'Product 2',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
        },
        {
          markedAsFav: false,
          displayNotifyRegistrantMsg: true,
          isBelowLineItem: 'true',
          sKUDetailVO: {
            skuInStoreInventory: false,
            displayName: 'Product 2',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
          itemType: 'CSH',
        },
        {
          markedAsFav: false,
          displayNotifyRegistrantMsg: true,
          isBelowLineItem: 'true',
          sKUDetailVO: {
            skuInStoreInventory: false,
            displayName: 'Product 2',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
        },
        {
          markedAsFav: false,
          displayNotifyRegistrantMsg: false,
          personalizationOptionsDisplay: true,
          isBelowLineItem: 'true',
          ltlShipMethodDesc: true,
          formattedTotalDeliveryCharges: '$50',
          sKUDetailVO: {
            skuInStoreInventory: false,
            displayName: 'Product 2',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
          itemType: 'CSH',
        },
        {
          markedAsFav: false,
          displayNotifyRegistrantMsg: false,
          personalizationOptionsDisplay: true,
          isBelowLineItem: 'true',
          ltlShipMethodDesc: true,
          formattedTotalDeliveryCharges: '$50',
          sKUDetailVO: {
            skuInStoreInventory: false,
            displayName: 'Product 2',
            skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
          },
        },
      ],
    },
  ];
  let props = {
    location: {
      search: '?eventType=PNH&coRegistrantFirstName=null',
    },
    labels,
    isFrozen: false,
    onComponentMount,
    getRegistryOwnerFirstCategory,
    registryOwnerFirstCategoryList,
    isRemainingItemFetching: true,
    fetchPickUpStore,
    pickUpStore: {
      storeId: '120',
    },
    'header.navigation.content.logo': [
      {
        className: 'bbbca-logo',
        alt: 'brand-logo',
      },
    ],
  };
  it('should render component correctly', () => {
    const tree = shallow(<PrintRegistryAction {...props} />);
    tree.setProps({ pickUpStoreId: '160' });
    tree.setState({ date: '05/05/2030', time: '12:00' });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should not call Icons function if header.navigation.content.logo is empty array ', () => {
    props = {
      ...props,
      registryData: {
        registryResVO: {
          registrySummaryVO: { itemsTotalPrice: '$555', pickUpStoreId: '160' },
        },
      },
      'header.navigation.content.logo': [],
    };
    const tree = shallow(<PrintRegistryAction {...props} />);
    tree.setProps({ pickUpStore: {}, isRemainingItemFetching: false });
    const spy = sinon.spy(tree.instance(), 'Icons');
    expect(spy.called).to.equal(false);
  });
  it('should call returnMultiplesGender function correctly', () => {
    props = {
      ...props,
      location: {
        search: '?eventType=BA1&babyGender=S',
      },
      isFrozen: true,
    };
    const gender = 'B~||G~||S';
    const tree = shallow(<PrintRegistryAction {...props} />);
    tree.setProps({ pickUpStoreId: '160' });
    const spy = sinon.spy(tree.instance(), 'returnMultiplesGender');
    const result = tree.instance().returnMultiplesGender(gender, labels);
    expect(result).to.equal(labels.createRegistry.Boy1Girl1);
    expect(spy.called).to.equal(true);
  });
  it('should call returnGender function correctly', () => {
    props = {
      ...props,
      location: {
        search: '?eventType=BA1&babyGender=S',
      },
      isFrozen: true,
    };
    const tree = shallow(<PrintRegistryAction {...props} />);
    tree.setProps({ pickUpStoreId: '160' });
    let result = tree.instance().returnGender('B', labels);
    expect(result).to.equal(labels.createRegistry.babyGenderBoy);
    result = tree.instance().returnGender('G', labels);
    expect(result).to.equal(labels.createRegistry.babyGenderGirl);
    result = tree.instance().returnGender('S', labels);
    expect(result).to.equal(labels.createRegistry.babyGenderSurprise);
  });
  it('should call checkTitleString function correctly for college list', () => {
    props = {
      ...props,
      location: {
        search: '?eventDate=null',
      },
      isFrozen: true,
      registryOwnerFirstCategoryList: [],
    };
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'checkTitleString');
    tree.setProps({
      registryData: {
        registryResVO: { registrySummaryVO: { pickUpStoreId: '160' } },
      },
    });
    const result = tree.instance().checkTitleString();
    expect(result).to.equal('List');
    expect(spy.called).to.equal(true);
  });
  it('should call checkTitleString function correctly for Registry', () => {
    props = {
      ...props,
      location: {
        search: '?eventDate=23/2/2030',
      },
      isFrozen: true,
    };
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'checkTitleString');
    tree.setProps({ pickUpStoreId: '160' });
    const result = tree.instance().checkTitleString();
    expect(result).to.equal('Registry');
    expect(spy.called).to.equal(true);
  });
  it('should render Logo Icons  correctly for TBS', () => {
    const siteId = 'BedBathUS';
    sinon.stub(utils, 'isTbs').returns(true);
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'Icons');
    tree.instance().Icons({}, siteId);
    expect(spy.called).to.equal(true);
    utils.isTbs.restore();
  });
  it('should render Icons  correctly for BedbathUS', () => {
    const siteId = 'BedBathUS';
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'Icons');
    tree.instance().Icons({}, siteId);
    expect(spy.called).to.equal(true);
  });
  it('should render Icons  correctly for BedbathUS', () => {
    const siteId = 'BuyBuyBaby';
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'Icons');
    tree.instance().Icons({}, siteId);
    expect(spy.called).to.equal(true);
  });
  it('should render Icons  correctly for CA', () => {
    const logo = {
      className: 'bbbca-logo',
      alt: 'brand-logo',
    };
    const siteId = '';
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'Icons');
    tree.instance().Icons(logo, siteId);
    expect(spy.called).to.equal(true);
    commonUtil.isBedBathCanada.restore();
  });
  it('should render Icons  correctly for CA if class is not there', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'Icons');
    tree.instance().Icons({}, '');
    expect(spy.called).to.equal(true);
    commonUtil.isBedBathCanada.restore();
  });
  it('should render Icons  correctly for buybuybaby', () => {
    const siteId = 'BuyBuyBaby';
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'Icons');
    tree.instance().Icons({}, siteId);
    expect(spy.called).to.equal(true);
  });
  it('should call priceProduct correctly for logged in user', () => {
    const itemList = {
      refNum: '',
      ltlDeliveryServices: true,
      formattedTotalPrice: '$50',
      sKUDetailVO: {
        inCartFlag: true,
        personalizationType: 'PB',
      },
    };
    const isUserLoggedInStub = sinon
      .stub(isUserLoggedIn, 'default')
      .returns(true);
    const tree = shallow(<PrintRegistryAction {...props} />);
    const spy = sinon.spy(tree.instance(), 'priceProduct');
    const result = tree.instance().priceProduct(itemList, labels);
    expect(spy.called).to.equal(true);
    expect(result).to.equal('$50 (Inc. delivery)');
    isUserLoggedInStub.restore();
  });
  it('should call groupGiftLabel correctly', () => {
    const itemList = {
      displayNotifyRegistrantMsg: false,
      personalizationOptionsDisplay: false,
      ggEligibleItem: true,
    };
    const label = {
      and: '&',
      groupGift: 'GROUP GIFTING',
    };
    const tree = shallow(<PrintRegistryAction {...props} />);
    let result = tree.instance().groupGiftLabel(itemList, label);
    expect(result).to.equal('GROUP GIFTING');
    result = tree
      .instance()
      .groupGiftLabel({ ...itemList, markedAsFav: true }, label);
    expect(result).to.equal('& GROUP GIFTING');
    result = tree
      .instance()
      .groupGiftLabel({ ...itemList, isBelowLineItem: 'true' }, label);
    expect(result).to.equal('GROUP GIFTING');
  });
  it('should call printProductMessageName correctly', () => {
    const itemList = {
      sKUDetailVO: {
        displayName:
          'Miracle Bamboo Deluxe Shredded Memory Foam Pillow with Viscose from Bamboo Cover',
      },
      itemType: 'CSH',
    };
    const tree = shallow(<PrintRegistryAction {...props} />);
    const result = tree.instance().printProductMessageName(itemList);
    expect(result).to.equal('Miracle Bamboo Deluxe Shredded Memory Fo...');
  });
  it('should call getRegistryId correctly', () => {
    const tree = shallow(<PrintRegistryAction {...props} />);
    tree.setState({ registryID: '6575564656' });
    const result = tree.instance().getRegistryId();
    expect(result).to.equal('6575564656');
  });
  it('should call onLoadHandlerForImg correctly', () => {
    const tree = shallow(<PrintRegistryAction {...props} />);
    const result = tree.instance().onLoadHandlerForImg();
    expect(result).to.equal(undefined);
  });
  it('should call triggerWindowPrint correctly', () => {
    const tree = shallow(<PrintRegistryAction {...props} />);
    const result = tree.instance().triggerWindowPrint();
    expect(result).to.equal(undefined);
  });
  it('should call triggerWindowPrint correctly when isDataLoaded and imgLoadCount are passed  ', () => {
    const registryOwnerFirstCategoryListNew = [
      {
        registryItemList: [
          {
            markedAsFav: false,
            displayNotifyRegistrantMsg: false,
            personalizationOptionsDisplay: true,
            ltlShipMethodDesc: true,
            formattedTotalDeliveryCharges: '$50',
            isBelowLineItem: 'false',
            sKUDetailVO: {
              skuInStoreInventory: true,
              displayName: 'Product 1',
              skuImages: { thumbnailImage: 'abc.com/first-image.jpg' },
            },
          },
        ],
      },
    ];
    const tree = shallow(
      <PrintRegistryAction
        {...props}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryListNew}
      />
    );
    const isDataLoadedStub = sinon
      .stub(tree.instance(), 'isDataLoaded')
      .returns(true);
    tree.instance().componentWillReceiveProps({ pickUpStore: '' });
    tree.instance().imgLoadCount = 0;
    tree.instance().onLoadHandlerForImg();
    const result = tree.instance().triggerWindowPrint();
    expect(result).to.equal(undefined);
    isDataLoadedStub.restore();
  });
  it('should call triggerWindowPrint correctly when timer and prtWinOpen are set ', () => {
    const tree = shallow(<PrintRegistryAction {...props} />);

    tree.instance().isDataLoaded(props);

    tree.instance().timer = 1;
    tree.setState({ prtWinOpen: 'true' });
    const result = tree.instance().triggerWindowPrint();
    expect(result).to.equal(undefined);
  });

  it('should not call clearTimeout function', () => {
    const clearTimeoutSpy = sinon.spy(window, 'clearTimeout');
    const tree = shallow(<PrintRegistryAction {...props} />);
    tree.instance().timer = 1;
    tree.instance().isDataLoaded(props);

    expect(clearTimeoutSpy.calledOnce).to.equal(false);
    clearTimeoutSpy.restore();
  });

  it('should call triggerWindowPrint correctly whenimgLoadCount and registryOwnerFirstCategoryList are unequal  ', () => {
    const tree = shallow(<PrintRegistryAction {...props} />);

    tree.instance().isDataLoaded('test');
    tree.instance().imgLoadCount = 1;
    tree.instance().registryOwnerFirstCategoryList = registryOwnerFirstCategoryList;

    tree.instance().timer = 1;
    tree.setState({ prtWinOpen: 'true' });
    const result = tree.instance().triggerWindowPrint();
    expect(result).to.equal(undefined);
  });
});
