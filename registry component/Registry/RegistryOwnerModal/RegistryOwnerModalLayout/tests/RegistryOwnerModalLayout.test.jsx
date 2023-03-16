import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import RegistryOwnerModalLayout from '../RegistryOwnerModalLayout';
import * as updateFacetFiterDataObj from '../../../utils/formatFacetFilters';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const ProductLayout = {
    registryModalData: {
      enableNewRegDashboard: true,
      isBopisFeatureEnable: true,
      itemType: 'CSH',
      switchConfig: {
        enableItemStatus: true,
        enableRegOtherRecommendation: true,
        enableCashFund: true,
      },
      activeRegistry: {
        groupGiftOptIn: true,
      },
      personalizationType: '',
      personalizationDescription: 'abc',
      personalizedMobImageUrls: [],
      refNum: '1232',
      sKUDetailVO: {
        displayName: 'Test',
        upc: 'upc',
      },
      personlisedDoublePrice: '300',
      qtyRequested: '1',
      qtyPurchased: '5',
      skuInStore: '1',
      ltlDeliveryServices: 'ltlDeliveryServices',
      shipMethodUnsupported: 'shipMethodUnsupported',
      deliverySurcharge: 'deliverySurcharge',
      ltlShipMethodDesc: 'ltlShipMethodDesc',
      purchased: 'true',
      labels: {
        createRegistry: {
          writeReviewLabel: 'writeReviewLabel',
          addToCartLabel: 'addToCartLabel',
          purchasedLabel: 'purchasedLabel',
          wantLabel: 'wantLabel',
          alreadyPurchasedLabel: 'alreadyPurchasedLabel',
          favouriteRegistryOwnerLabel: 'favouriteRegistryOwnerLabel',
        },
        RBYR: {
          buyItNow: 'buyItNow',
        },
        RegistryOwner: {
          markAsPurchased: 'markAsPurchased',
          CurrentlySoldOut: 'Currently Sold Out',
          discontinued: 'Discontinued',
          NoLongerCarry: 'No Longer Carry',
        },
      },
      tealiumData: {
        location: {
          pathname: 'viewRegistryOwner',
        },
      },
      shipSwapView: () => {},
      groupGiftView: () => {},
      initiateInactivityModal: () => {},
      ggFundedBadge: () => {},
      selectedCheckboxFilter: 'store-pickup',
      getUpdatedCategoryData: sinon.stub(),
      isBelowLineItem: 'false',
    },
    registryId: '121212',
    sKUDetailVO: {
      skuImages: {
        mediumImage: '//placehold.it/200',
      },
      skuId: '1212',
      intlRestricted: '1212',
      parentProdId: '1212',
      size: '1212',
      swatch: '1212',
      minimumQty: 1,
    },
    refNum: null,
    onModalHide: () => {},
    enableKatori: false,
    isBopisFeatureEnable: true,
    skuInStore: '1',
    storeDetails: {
      storeId: '1',
      commonName: 'store',
    },
  };
  it('should render correctly', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render purchased view', () => {
    const tree = shallow(
      <RegistryOwnerModalLayout {...ProductLayout} isMobile />
    );
    tree.setState({ want: 8, purchased: 3 });
    expect(tree.instance().purchasedValue).to.be.equal(-1);
  });
  it('call changeQuantity if want value is 10 and type is want and element is input', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const instance = tree.instance();
    const getElementByIdStub = sinon
      .stub(document, 'getElementById')
      .returns({ id: 'wantSelect_0', value: 'want', focus: () => {} });
    instance.changeQuantity('want', 10, 'select', 'wantSelect_0');
    expect(tree.state('want')).to.be.equal(10);
    getElementByIdStub.restore();
  });
  it('call changeQuantity for purchased Nan and want Nan', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const instance = tree.instance();

    instance.changeQuantity('purchased', NaN);
    expect(instance.purchasedValue).to.be.equal(-1);

    tree.instance().changeQuantity('want', NaN);
    expect(tree.instance().wantValue).to.be.equal(-1);
  });

  it('call changeQuantity for default purchasedValue and wantValue', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const instance = tree.instance();

    tree.setState({ purchased: 2 });
    const purchasedStub = sinon.stub(instance, 'purchasedValue').returns(-1);
    expect(instance.changeQuantity('purchased', 2)).to.be.equal(undefined);
    purchasedStub.restore();

    tree.setState({ want: 2 });
    const wantStub = sinon.stub(instance, 'wantValue').returns(-1);
    expect(instance.changeQuantity('want', 2)).to.be.equal(undefined);
    wantStub.restore();
  });

  it('call changeQuantity if value is 10 and type is purchased and element is input', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const instance = tree.instance();
    const getElementByIdStub = sinon.stub(document, 'getElementById').returns({
      id: 'purchasedSelect_0',
      value: 'purchased',
      focus: () => {},
    });
    instance.changeQuantity('purchased', 10, 'select', 'purchasedSelect_0');
    tree.setState({
      purchased: 10,
    });
    expect(instance.purchasedValue).to.be.equal('5');
    getElementByIdStub.restore();
  });

  it('call changeQuantity for want less than 10', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const instance = tree.instance();
    instance.wantValue = 2;
    instance.changeQuantity('want', 3);
    expect(tree.state('want')).to.be.equal(3);
  });

  it('call changeQuantity for purchased less than 10', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const instance = tree.instance();
    instance.purchasedValue = 2;
    instance.changeQuantity('purchased', 3);
    expect(tree.state('purchased')).to.be.equal(3);
  });

  it('shouldComponentUpdate with false', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    tree.setProps({ ...ProductLayout });
    expect(tree.instance().wantValue).to.be.equal(-1);
  });

  it('should call getTealiumVariable to return object', () => {
    const tree = shallow(<RegistryOwnerModalLayout {...ProductLayout} />);
    const treeInstance = tree.instance();
    const tealiumVariable = treeInstance.getTealiumVariable();
    expect(tealiumVariable).to.be.an('object');
    const isPersonalizationApplicableStub = sinon
      .stub(treeInstance, 'isPersonalizationApplicable')
      .returns(true);
    const tealiumVariable1 = treeInstance.getTealiumVariable();
    expect(tealiumVariable1).to.be.an('object');
    isPersonalizationApplicableStub.restore();
  });

  it('should call updateRegistryItemSaga with invalid data', () => {
    const args = {
      ltlDeliveryServices: '',
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: 5,
      purchased: 2,
    };
    const treeInstance = shallow(
      <RegistryOwnerModalLayout {...ProductLayout} />
    ).instance();
    const isPersonalizationApplicableStub = sinon
      .stub(treeInstance, 'isPersonalizationApplicable')
      .returns(true);
    treeInstance.updateRegistryItemSaga(args);
    expect(
      treeInstance.props.registryModalData.getUpdatedCategoryData.called
    ).to.be.equal(false);

    args.want = undefined;
    args.purchased = undefined;
    treeInstance.updateRegistryItemSaga(args);
    expect(
      treeInstance.props.registryModalData.getUpdatedCategoryData.called
    ).to.be.equal(false);
    isPersonalizationApplicableStub.restore();
  });
});

describe(`${__filename} handle updateRegistryItemSaga with valid data`, () => {
  const updatedCategoryData = sinon.spy();
  const ProductLayout = {
    registryModalData: {
      ggFundedBadge: () => {},
      registryOwnerFirstCategoryList: [
        {
          registryItemList: [
            {
              sKUDetailVO: {
                skuId: '1312',
              },
              refNum: '1232',
              ltlDeliveryServices: 'ltlDeliveryServices',
            },
          ],
        },
      ],
      personalizationType: '',
      updateGiftData: () => {},
      updateFilterCount: () => {},
      markFavRegistryItem: () => {},
      updateInteractiveCheckList: () => {},
      getUpdatedCategoryData: updatedCategoryData,
      personalizedMobImageUrls: [],
      refNum: '1232',
      sKUDetailVO: {
        displayName: 'Test',
        upc: 'upc',
        ltlItem: true,
        skuId: '1312',
        parentProdId: '1111',
      },
      rowID: '11',
      itemType: 'toy',
      eventType: 'purchased',
      activeRegistry: {
        groupGiftOptIn: true,
      },
      ggEligibleItem: true,
      qtyRequested: '1',
      qtyPurchased: '5',
      skuInStore: '1',
      ltlDeliveryServices: 'ltlDeliveryServices',
      shipMethodUnsupported: 'shipMethodUnsupported',
      deliverySurcharge: 'deliverySurcharge',
      ltlShipMethodDesc: 'ltlShipMethodDesc',
      purchased: 'true',
      labels: {
        createRegistry: {
          writeReviewLabel: 'writeReviewLabel',
          addToCartLabel: 'addToCartLabel',
          purchasedLabel: 'purchasedLabel',
          wantLabel: 'wantLabel',
          alreadyPurchasedLabel: 'alreadyPurchasedLabel',
          favouriteRegistryOwnerLabel: 'favouriteRegistryOwnerLabel',
        },
        RBYR: {
          buyItNow: 'buyItNow',
        },
        RegistryOwner: {
          markAsPurchased: 'markAsPurchased',
          CurrentlySoldOut: 'Currently Sold Out',
          discontinued: 'Discontinued',
          NoLongerCarry: 'No Longer Carry',
        },
      },
      tealiumData: {
        location: {
          pathname: 'viewRegistryOwner',
        },
      },
      dslUpdateableMessage: () => {},
      shipSwapView: () => {},
      groupGiftView: () => {},
      initiateInactivityModal: () => {},
      setFacetData: () => {},
    },
    selectedCheckboxFilter: '',
    registryId: '121212',
    onModalHide: () => {},
    enableKatori: false,
    isBopisFeatureEnable: true,
    skuInStore: '1',
    storeDetails: {
      storeId: '1',
      commonName: 'store',
    },
  };
  it('should call updateRegistryItemSaga with ltlDeliveryServices', () => {
    const handleTealiumEvent = sinon.spy();
    const tree = shallow(
      <RegistryOwnerModalLayout
        {...ProductLayout}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    const args = {
      ltlDeliveryServices: 'ltlDeliveryServices',
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: 2,
      purchased: 5,
      oldPurchased: 6,
      oldWant: 4,
    };
    tree.setState({ want: '2', purchased: '4' });
    const apiResponse = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          component: {
            itemsTotalPrice: '1',
            statusFilter: 'abc',
          },
        },
      },
    };
    const updateFacetFiterDataStub = sinon
      .stub(updateFacetFiterDataObj, 'updateFacetFiterData')
      .returns([{}]);
    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const response = tree.instance().updateRegistryItemSaga(args);
    // eslint-disable-next-line no-unused-expressions
    return promise.then(() => {
      triggerServerRequestStub.restore();
      updateFacetFiterDataStub.restore();
      expect(typeof response).to.be.equal('undefined');
    });
  });

  it('should call markAsFavHandler with markedAsFav state', () => {
    const getFilterCount = sinon.spy();
    const tree = shallow(
      <RegistryOwnerModalLayout
        {...ProductLayout}
        getFilterCount={getFilterCount}
      />
    );
    const treeInstance = tree.instance();
    tree.setState({ markedAsFav: false });
    treeInstance.markAsFavHandler();
    expect(tree.state('markedAsFav')).to.be.equal(true);

    tree.setState({ markedAsFav: true });
    treeInstance.markAsFavHandler();
    expect(tree.state('markedAsFav')).to.be.equal(false);
  });
});

describe(`${__filename} handle updateRegistryItemSaga with valid data for else condition`, () => {
  const updatedCategoryData = sinon.spy();
  const ProductLayout = {
    registryModalData: {
      ggFundedBadge: () => {},
      registryOwnerFirstCategoryList: [
        {
          registryItemList: [
            {
              sKUDetailVO: {
                skuId: '1212',
              },
              refNum: '1232',
              ltlDeliveryServices: 'ltlDeliveryServices',
            },
          ],
        },
      ],
      personalizationType: '',
      updateGiftData: () => {},
      updateFilterCount: () => {},
      markFavRegistryItem: () => {},
      updateInteractiveCheckList: () => {},
      getUpdatedCategoryData: updatedCategoryData,
      personalizedMobImageUrls: [],
      refNum: '1232',
      sKUDetailVO: {
        displayName: 'Test',
        upc: 'upc',
        ltlItem: true,
        skuId: '1312',
        parentProdId: '1111',
      },
      rowID: '11',
      itemType: 'toy',
      eventType: 'purchased',
      activeRegistry: {
        groupGiftOptIn: true,
      },
      ggEligibleItem: true,
      qtyRequested: '1',
      qtyPurchased: '5',
      skuInStore: '1',
      ltlDeliveryServices: 'ltlDeliveryServices',
      shipMethodUnsupported: 'shipMethodUnsupported',
      deliverySurcharge: 'deliverySurcharge',
      ltlShipMethodDesc: 'ltlShipMethodDesc',
      purchased: 'true',
      labels: {
        createRegistry: {
          writeReviewLabel: 'writeReviewLabel',
          addToCartLabel: 'addToCartLabel',
          purchasedLabel: 'purchasedLabel',
          wantLabel: 'wantLabel',
          alreadyPurchasedLabel: 'alreadyPurchasedLabel',
          favouriteRegistryOwnerLabel: 'favouriteRegistryOwnerLabel',
        },
        RBYR: {
          buyItNow: 'buyItNow',
        },
        RegistryOwner: {
          markAsPurchased: 'markAsPurchased',
          CurrentlySoldOut: 'Currently Sold Out',
          discontinued: 'Discontinued',
          NoLongerCarry: 'No Longer Carry',
        },
      },
      tealiumData: {
        location: {
          pathname: 'viewRegistryOwner',
        },
      },
      dslUpdateableMessage: () => {},
      shipSwapView: () => {},
      groupGiftView: () => {},
      initiateInactivityModal: () => {},
      setFacetData: () => {},
    },
    selectedCheckboxFilter: '',
    registryId: '121212',
    onModalHide: () => {},
    enableKatori: false,
    isBopisFeatureEnable: true,
    skuInStore: '1',
    storeDetails: {
      storeId: '1',
      commonName: 'store',
    },
  };
  it('should call updateRegistryItemSaga with ltlDeliveryServices for else condition', () => {
    const handleTealiumEvent = sinon.spy();
    const tree = shallow(
      <RegistryOwnerModalLayout
        {...ProductLayout}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    const args = {
      ltlDeliveryServices: 'ltlDeliveryServices',
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: 2,
      purchased: 5,
      oldPurchased: 6,
      oldWant: 4,
    };
    tree.setState({ want: '2', purchased: '4' });
    const apiResponse = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          component: {
            itemsTotalPrice: '1',
            statusFilter: 'abc',
          },
        },
      },
    };
    const updateFacetFiterDataStub = sinon
      .stub(updateFacetFiterDataObj, 'updateFacetFiterData')
      .returns([{}]);
    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const response = tree.instance().updateRegistryItemSaga(args);
    // eslint-disable-next-line no-unused-expressions
    return promise.then(() => {
      triggerServerRequestStub.restore();
      updateFacetFiterDataStub.restore();
      expect(typeof response).to.be.equal('undefined');
    });
  });
  it('should call markAsFavHandler with markedAsFav state for else condition', () => {
    const getFilterCount = sinon.spy();
    const tree = shallow(
      <RegistryOwnerModalLayout
        {...ProductLayout}
        getFilterCount={getFilterCount}
      />
    );
    const treeInstance = tree.instance();
    tree.setState({ markedAsFav: false });
    treeInstance.markAsFavHandler();
    expect(tree.state('markedAsFav')).to.be.equal(true);
  });
});
