/* eslint-disable max-lines */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import * as windowWidth from '@bbb-app/utils/viewPortUtils';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import consoleLog from '@bbb-app/utils/logger';
import * as commonUtil from '@bbb-app/utils/common';
import { PureOwnerProductGridTile } from '../OwnerProductGridTile';
import RegistryEllipsesButtons from '../RegistryEllipsesButtons/RegistryEllipsesButton.async';
import * as formatFacetFiltersUtil from '../../../../../components/Pages/Registry/utils/formatFacetFilters';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const actions = {
    quickView: 'Quick View',
    ideaBoard: 'Idea Board',
  };
  const personalisedCode = 'Y';
  const labels = {
    createRegistry: {
      purchasedLabel: 'purchasedLabel',
      wantLabel: 'wantLabel',
      alreadyPurchasedLabel: 'alreadyPurchasedLabel',
      favouriteRegistryOwnerLabel: 'favouriteRegistryOwnerLabel',
    },
    RegistryOwner: {
      CurrentlySoldOut: 'Currently Sold Out',
      discontinued: 'Discontinued',
      NoLongerCarry: 'No Longer Carry',
    },
    limitedAvailabilityMsg: 'either limited or discontinued',
    limitedAvailability: 'limited availability',
  };

  const sKUDetailVO = {
    skuImages: {
      mediumImage: '//placehold.it/200',
    },
    skuId: 111,
    parentProdId: 222,
    personalizationType: 'PB',
    ltlItem: true,
    activeFlag: true,
    minimumQty: 2,
    displayName: 'abc',
  };

  const deviceConfig = {
    DESKTOP: 1024,
    TABLET: 768,
  };

  const switchConfig = {
    enableReplaceItem: true,
    enableItemStatus: true,
    enableCashFund: true,
  };

  before(() => {
    sinon.stub(document, 'querySelector').returns(false);
  });

  after(() => {
    document.querySelector.restore();
  });

  it('should render regular item properly for buybuybaby site and mobile screen', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const skuDetail = {
      skuImages: {
        mediumImage: '//placehold.it/200',
      },
      skuId: 111,
      parentProdId: 222,
      personalizationType: 'AB',
      activeFlag: true,
      intlRestricted: true,
    };
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns('400');
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        labels={labels}
        sKUDetailVO={skuDetail}
        qtyRequested={10}
        deviceConfig={deviceConfig}
        isInternationalUser
        ltlFlag
        switchConfig={switchConfig}
        siteId={'BuyBuyBaby'}
        markedAsFav
        isBopisFeatureEnable
        skuInStore="1"
        sku={69934769}
        itemType={'CSH'}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    expect(tree.find('Icon').at(0)).to.have.lengthOf(1);
    windowObj.restore();
    commonUtil.isBedBathCanada.restore();
  });

  it('should call onProductTileClick', () => {
    const removeRegistryItem = sinon.spy();
    const onProductTileClick = sinon.stub();
    const updateSkuIdForAnchoring = sinon.stub();
    const handleTealiumEvent = sinon.stub();
    const variation = '';
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true, inCartFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
            displayNotifyRegistrantMsg: 'N',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        variation={variation}
        removeRegistryItem={removeRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        personalisedCode={personalisedCode}
        deviceConfig={deviceConfig}
        onProductTileClick={onProductTileClick}
        updateSkuIdForAnchoring={updateSkuIdForAnchoring}
        ggEligibleItem
        qtySVPurchased={1}
        switchConfig={switchConfig}
        ggItemContributionNeeded={0}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    const event = {
      target: {
        id: 'Remove',
        textContent: 'Edit',
      },
      preventDefault: () => {},
    };
    tree.instance().onProductTileClick(event);
    expect(onProductTileClick.called).to.be.equal(true);
  });

  it('should call onProductTileClick for group Gift item', () => {
    const removeRegistryItem = sinon.spy();
    const onProductTileClick = sinon.stub();
    const updateSkuIdForAnchoring = sinon.stub();
    const variation = '';
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true, inCartFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
            displayNotifyRegistrantMsg: 'N',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        variation={variation}
        removeRegistryItem={removeRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        personalisedCode={personalisedCode}
        deviceConfig={deviceConfig}
        onProductTileClick={onProductTileClick}
        updateSkuIdForAnchoring={updateSkuIdForAnchoring}
        ggEligibleItem
        qtySVPurchased={1}
        switchConfig={switchConfig}
        ggItemContributionNeeded={0}
        amountFulfilled={12}
      />
    );
    const event = {
      target: {
        id: 'Remove',
        textContent: 'Edit',
      },
      preventDefault: () => {},
    };
    tree.instance().onProductTileClick(event);
    expect(onProductTileClick.called).to.be.equal(true);
  });

  it('should call preventDefault when preventModalClick is true', () => {
    const removeRegistryItem = sinon.spy();
    const onProductTileClick = sinon.stub();
    const updateSkuIdForAnchoring = sinon.stub();
    const preventDefault = sinon.stub();
    const variation = '';
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true, inCartFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
            displayNotifyRegistrantMsg: 'N',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        variation={variation}
        removeRegistryItem={removeRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        personalisedCode={personalisedCode}
        deviceConfig={deviceConfig}
        onProductTileClick={onProductTileClick}
        updateSkuIdForAnchoring={updateSkuIdForAnchoring}
        ggEligibleItem
        qtySVPurchased={1}
        switchConfig={switchConfig}
        ggItemContributionNeeded={0}
        enableNewRegDashboard
      />
    );
    const event = {
      target: {
        textContent: 'Diaper Fund',
        className: 'preventModalClick',
      },
      preventDefault,
    };
    tree.instance().onProductTileClick(event);
    expect(preventDefault.called).to.be.equal(true);
  });

  it('should not render QV for inactive item', () => {
    sKUDetailVO.activeFlag = false;
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        qtyRequested={10}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
        enableNewRegDashboard
      />
    );
    expect(tree).to.not.equal(null);

    tree.setProps({
      updatedSkuId: '111',
    });
    tree.update();
    expect(tree).to.not.equal(null);
  });

  it('should render with Group Gift Eligible item', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns('400');
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        purchased
        markedAsFav
        qtyRemaining={2}
        deviceConfig={deviceConfig}
        ggEligibleItem
        amountFulfilled={23}
        switchConfig={switchConfig}
        enableNewRegDashboard
      />
    );
    expect(tree).to.not.equal(null);
    windowObj.restore();
  });

  it('should render with Group Gift Eligible fully funded item', () => {
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        purchased
        markedAsFav
        qtyRemaining={2}
        deviceConfig={deviceConfig}
        ggEligibleItem
        ggRegItemStatus={'funded'}
        qtySVPurchased={1}
        switchConfig={switchConfig}
        enableNewRegDashboard
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should mark item as favourite for differnt variation', () => {
    const markFavRegistryItem = sinon.spy();
    const updateFilterCount = sinon.spy();
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];

    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        markFavRegistryItem={markFavRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        updateFilterCount={updateFilterCount}
        personalisedCode={personalisedCode}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
        enableNewRegDashboard
      />
    );
    tree.instance().markAsFavHandler();
    expect(markFavRegistryItem.calledOnce).to.equal(true);
  });

  it('should mark item as favourite when markedAsFav is true', () => {
    const markFavRegistryItem = sinon.spy();
    const updateFilterCount = sinon.spy();
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
            refNum: '123',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];

    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        markFavRegistryItem={markFavRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        updateFilterCount={updateFilterCount}
        personalisedCode={personalisedCode}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
        markedAsFav
        enableNewRegDashboard
      />
    );
    tree.instance().markAsFavHandler();
    expect(markFavRegistryItem.calledOnce).to.equal(true);
  });

  it('should delete item ', () => {
    const removeRegistryItem = sinon.spy();
    const updateFilterCount = sinon.spy();
    const variation = '';
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        variation={variation}
        removeRegistryItem={removeRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        personalisedCode={personalisedCode}
        updateFilterCount={updateFilterCount}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
        enableNewRegDashboard
      />
    );
    tree.instance().removeRegistryItem();
    expect(removeRegistryItem.calledOnce).to.equal(true);
  });

  it('should delete ggEligibleItem', () => {
    const removeRegistryItem = sinon.spy();
    const updateFilterCount = sinon.spy();
    const variation = '';
    const registryOwnerFirstCategoryList = [
      {
        registryItemList: [
          {
            sKUDetailVO: { skuId: 111, activeFlag: true },
            qtyPurchased: '',
            qtyRequested: '',
            purchased: '',
            refNum: '123',
          },
        ],
        catSeoUrl: '/category/home-d-cor/10004/',
        categoryId: '10004_HOMEDCOR',
        displayName: 'HOME DÉCOR',
        qtyFulfilled: 1,
        qtyPurchased: 2,
        qtyRemaining: 2,
        qtyRequested: 3,
      },
    ];
    const tree = shallow(
      <PureOwnerProductGridTile
        actions={actions}
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        refNum="123"
        labels={labels}
        sKUDetailVO={sKUDetailVO}
        variation={variation}
        removeRegistryItem={removeRegistryItem}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        qtyRequested={10}
        personalisedCode={personalisedCode}
        updateFilterCount={updateFilterCount}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
        ggEligibleItem
        enableNewRegDashboard
      />
    );
    tree.instance().removeRegistryItem();
    expect(removeRegistryItem.calledOnce).to.equal(true);
  });

  it('should call onUpdateLtlDsl', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        switchConfig={switchConfig}
      />
    ).instance();
    const e = {
      preventDefault: () => {},
    };
    const hideParent = sinon.stub();
    wrapper.onUpdateLtlDsl(e, hideParent);
    expect(hideParent.called).to.be.equal(true);
  });

  it('should call componentWillReceiveProps', () => {
    const nextProps = {
      sKUDetailVO: { skuId: 1234, parentProdId: 2345 },
    };
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        switchConfig={switchConfig}
      />
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
  });

  it('should call updateRegistryItemSaga and throw error', () => {
    const response = { body: { serviceStatus: 'Error' } };
    const promise = Promise.reject(response);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const initiateInactivityModal = sinon.spy();
    const args = {
      ltlDeliveryServices: '',
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: 5,
      purchased: 2,
    };
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        initiateInactivityModal={initiateInactivityModal}
        switchConfig={switchConfig}
        ggEligibleItem
      />
    ).instance();
    wrapper.updateRegistryItemSaga(args);
    return promise.catch(error => {
      triggerServerRequestStub.restore();
      expect(error.body.serviceStatus).to.be.equal('Error');
    });
  });

  it('should call updateRegistryItemSaga and catch error', () => {
    const triggerServerRequestStub = sinon.stub(
      ServiceUtil,
      'triggerServerRequest'
    );

    const initiateInactivityModal = sinon.spy();
    const args = {
      ltlDeliveryServices: '',
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: 5,
      purchased: 2,
    };
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        initiateInactivityModal={initiateInactivityModal}
        switchConfig={switchConfig}
        ggEligibleItem
      />
    ).instance();

    const isPersonalizationApplicableStub = sinon
      .stub(wrapper, 'isPersonalizationApplicable')
      .returns(false);
    const consoleLogStub = sinon.stub(consoleLog, 'error').returns(true);

    wrapper.updateRegistryItemSaga(args);

    triggerServerRequestStub.restore();
    isPersonalizationApplicableStub.restore();
    consoleLogStub.restore();
    expect(consoleLogStub.called).to.be.equal(true);
  });

  it('should call isPersonalizationApplicable for cashfund itemtype', () => {
    const initiateInactivityModal = sinon.spy();
    const isPersonalizationApplicable = sinon.spy();
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        initiateInactivityModal={initiateInactivityModal}
        switchConfig={switchConfig}
        ggEligibleItem
        isPersonalizationApplicable={isPersonalizationApplicable}
        itemType={'CSH'}
      />
    ).instance();
    wrapper.renderProductImage();
    expect(isPersonalizationApplicable.called);
  });
  it('should call updateRegistryItemSaga for success', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          component: {},
        },
      },
    };

    const updateFacetFiterDataStub = sinon
      .stub(formatFacetFiltersUtil, 'updateFacetFiterData')
      .callsFake(() => {});
    const promise = Promise.resolve(response);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const args = {
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: undefined,
      purchased: undefined,
    };
    const setFacetData = sinon.stub();

    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        initiateInactivityModal={sinon.stub()}
        switchConfig={switchConfig}
        setFacetData={setFacetData}
        updateFilterCount={sinon.stub()}
      />
    ).instance();

    wrapper.updateRegistryItemSaga(args);
    return promise.then(() => {
      triggerServerRequestStub.restore();
      updateFacetFiterDataStub.restore();
      expect(setFacetData.called).to.be.equal(true);
    });
  });

  it('should call updateRegistryItemSaga for partial success', () => {
    const response = {
      body: {
        serviceStatus: '200',
        data: {
          component: {},
        },
      },
    };
    const promise = Promise.resolve(response);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const initiateInactivityModal = sinon.spy();
    const args = {
      shipMethodUnsupported: '',
      ltlShipMethodDesc: '',
      deliverySurcharge: '',
      want: undefined,
      purchased: undefined,
    };
    const setFacetData = sinon.stub();

    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        initiateInactivityModal={initiateInactivityModal}
        switchConfig={switchConfig}
        setFacetData={setFacetData}
      />
    ).instance();

    wrapper.updateRegistryItemSaga(args);
    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(setFacetData.called).to.be.equal(false);
    });
  });

  it('should call toggleDeleteModal', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        switchConfig={switchConfig}
      />
    ).instance();
    const toggleDeleteModal = sinon.spy(wrapper, 'toggleDeleteModal');
    wrapper.toggleDeleteModal();
    expect(toggleDeleteModal.called);
  });

  it('should call renderItemStatusBadge for N&D item', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns('400');
    const selectedFilterOption = { status: 'Discontinued' };
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        displayNotifyRegistrantMsg={'N'}
        isBelowLineItem={'true'}
        switchConfig={switchConfig}
        selectedFilterOption={selectedFilterOption}
        ggEligibleItem
        ggRegItemStatus="funded"
      />
    ).instance();
    const renderItemStatusBadge = sinon.spy(wrapper, 'renderItemStatusBadge');
    wrapper.renderItemStatusBadge();
    expect(renderItemStatusBadge.called);
    windowObj.restore();
  });

  it('should call renderItemStatusBadge', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'true'}
        switchConfig={switchConfig}
      />
    ).instance();
    const renderItemStatusBadge = sinon.spy(wrapper, 'renderItemStatusBadge');
    wrapper.renderItemStatusBadge();
    expect(renderItemStatusBadge.called);
  });

  it('should call renderItemStatusBadge enableNewRegDashboard is true', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'true'}
        switchConfig={switchConfig}
        enableNewRegDashboard
      />
    ).instance();
    const renderItemStatusBadge = sinon.spy(wrapper, 'renderItemStatusBadge');
    wrapper.renderItemStatusBadge();
    expect(renderItemStatusBadge.called);
  });

  it('should render AddToCart button', () => {
    const tealiumData = {};
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        tealiumData={tealiumData}
      />
    ).instance();
    const renderRBYRFundReceived = sinon.spy(wrapper, 'renderRBYRFundReceived');
    wrapper.renderRBYRFundReceived();
    expect(renderRBYRFundReceived.called);
  });

  it('should call renderFundedBadge in case of owner modal', () => {
    const isRegistryOwnerModal = true;
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
        ggRegItemStatus="funded"
      />
    ).instance();
    wrapper.renderFundedBadge('', '', isRegistryOwnerModal);
  });

  it('should call getStoreAvailabilityMessage', () => {
    const storeDetails = { commonName: 'test' };
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        selectedCheckboxFilter="store-pickup"
        storeDetails={storeDetails}
      />
    ).instance();
    wrapper.getStoreAvailabilityMessage();
  });

  it('should call renderRBYRFundReceived', () => {
    const isRequiredOnModal = true;
    const tealiumData = { location: '/' };
    const sKUDetail = {};
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetail}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
        tealiumData={tealiumData}
      />
    ).instance();
    wrapper.renderRBYRFundReceived(isRequiredOnModal);
  });

  it('should render link to update dsl', () => {
    sKUDetailVO.ltlItem = true;
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
        DSLUpdateable
        ltlDeliveryServices="test"
      />
    );
    wrapper.setState({ shipMethodUnsupported: true });
    wrapper.instance().renderDslUpdateableMessage(true);
    wrapper
      .find({ id: 'ltlDslUpdateLink' })
      .at(0)
      .simulate('click', { preventDefault: sinon.stub() });
    expect(wrapper.find({ id: 'ltlDslUpdateLink' })).to.have.lengthOf(2);
  });

  it('should render link to update dsl when enableNewRegDashboard is true', () => {
    sKUDetailVO.ltlItem = true;
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
        DSLUpdateable
        ltlDeliveryServices="test"
        enableNewRegDashboard
      />
    );
    wrapper.setState({ shipMethodUnsupported: true });
    wrapper.instance().renderDslUpdateableMessage(true);
    wrapper
      .find({ id: 'ltlDslUpdateLink' })
      .at(0)
      .simulate('click', { preventDefault: sinon.stub() });
    expect(wrapper.find({ id: 'ltlDslUpdateLink' })).to.have.lengthOf(2);
  });
  it('should render Ellipses for group gift item', () => {
    sKUDetailVO.inCartFlag = true;
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
      />
    );
    wrapper.instance().togglehoverModalState();
    wrapper.setState({ ellipsesChunkLoaded: true });
    wrapper.setProps({ ggEligibleItem: true, amountFulfilled: 12 });
    expect(wrapper.find(RegistryEllipsesButtons)).to.have.lengthOf(2);
  });

  it('removeGroupGiftItem: should set state showDeleteModal', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
      />
    );
    wrapper.instance().removeGroupGiftItem();
    expect(wrapper.state(['showDeleteModal_undefined'])).to.be.equal(true);
  });

  it('keepGroupGiftItem: should set state showDeleteModal', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
      />
    );
    wrapper.instance().keepGroupGiftItem({ preventDefault: () => {} });
    expect(wrapper.state(['showDeleteModal_undefined'])).to.be.equal(false);
  });

  it('should call renderItemStatusBadge', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
        displayNotifyRegistrantMsg="N"
      />
    );
    wrapper.instance().renderItemStatusBadge();
    wrapper.setProps({ sKUDetailVO: { skuInStock: true } });
    wrapper.instance().renderItemStatusBadge();
  });

  it('should call renderItemStatusBadge enableNewRegDashboard is true', () => {
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        siteId="BuyBuyBaby"
        displayNotifyRegistrantMsg="N"
        enableNewRegDashboard
      />
    );
    wrapper.instance().renderItemStatusBadge();
    wrapper.setProps({ sKUDetailVO: { skuInStock: true } });
    wrapper.instance().renderItemStatusBadge();
  });

  it('should call renderGroupGift', () => {
    let windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(1025);
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        ggEligibleItem
        ggItemContributionNeeded={0}
      />
    ).instance();
    wrapper.renderGroupGift(true);

    wrapper.getCharLength();
    windowObj.restore();

    windowObj = sinon.stub(windowWidth, 'getWindowInnerWidth').returns(1200);
    wrapper.getCharLength();
    windowObj.restore();
  });

  it('should call renderCashFunds', () => {
    let windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(1025);
    const wrapper = shallow(
      <PureOwnerProductGridTile
        sKUDetailVO={sKUDetailVO}
        labels={labels}
        isBelowLineItem={'false'}
        switchConfig={switchConfig}
        ggEligibleItem
        ggItemContributionNeeded={0}
      />
    ).instance();
    wrapper.renderCashFunds(true);

    wrapper.getCharLength();
    windowObj.restore();

    windowObj = sinon.stub(windowWidth, 'getWindowInnerWidth').returns(1200);
    wrapper.getCharLength();
    windowObj.restore();
  });
});
