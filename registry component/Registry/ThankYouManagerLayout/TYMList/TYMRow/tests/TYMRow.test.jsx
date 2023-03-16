import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import { noop } from '@bbb-app/utils/common';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import Button from '@bbb-app/core-ui/button';
import TYMRow from '../TYMRow';
import {
  GIFT_RECEIVED_CA_LBL,
  GIFT_RETURNED_US_LBL,
  GIFT_RECEIVED_BABY_LBL,
  GIFT_RETURNED_TBS_LBL,
  GIFT_RECEIVED_US_LBL,
} from '../constants';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  let isMobile = false;
  const listItem = {
    address1: '1234 5th Avenue ',
    address2: 'Manhattan',
    city: 'New York',
    country: 'US',
    email: 'asdfads@fsadf.sadf',
    firstName: 'mohit',
    formattedPriceVal: 'INR 167',
    giftReceived: true,
    lastName: 'kumar',
    price: 2.99,
    purchaseDate: 'February 28, 2018',
    purchaseQty: 2,
    registryId: 520588833,
    skuId: '47046481',
    state: 'NY ',
    thankYouSent: true,
    wasReturned: true,
    zipCode: '10029',
    displayName: 'PRoduct name',
    skuDetails: {
      displayName: 'PRoduct name',
      skuImages: { smallImage: '9291514310568p?$146$' },
      skuInStock: true,
      ltlItem: true,
      skuId: '47046481',
      personalizationType: 'PB',
    },
    totalDeliveryCharges: 23,
    ltlDeliveryServices: 'white glove',
    transactionType: 'SV',
  };
  const labels = {
    giftReceivedLbl: 'Gift received',
    giftReturnedLbl: 'Gift returned',
    markAsSentLbl: 'MARK AS SENT',
    giftGiver: {
      quickViewLabel: 'quick view',
    },
    tymRBYRlabel: 'Received in My Funds',
  };
  const scene7URL = 'https://s7d2.scene7.com/is/image/BedBathandBeyond/';
  const uniqueKey = 1;
  const initiateInactivityModal = sinon.spy();
  const props = {
    isMobile,
    uniqueKey,
    labels,
    scene7URL,
    initiateInactivityModal,
    handleCallback: sinon.spy(),
  };
  it('should render tym list component correctly when ', () => {
    isMobile = true;
    tree = shallow(
      <TYMRow
        {...props}
        initiateInactivityModal={initiateInactivityModal}
        listItem={listItem}
      />
    );
    tree.setState({
      error: {
        key: 'giftSent_error',
        message: 'giftSent_error',
      },
    });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render tym list component correctly', () => {
    tree = shallow(<TYMRow {...props} listItem={listItem} />);
    tree.setProps({
      location: {
        pathname: 'https//',
      },
    });
    expect(tree.find('AddToCart')).to.have.length(0);
  });
  it('should render for cashfund items', () => {
    const listItemCf = {
      address1: null,
      address2: null,
      addressSelection: null,
      cfCode: 'abcd',
      cfDisplayName: 'TestContribute',
      cfImage:
        '//b3h2.scene7.com/is/image/BedBathandBeyond/Mask_group_082722_1?$contentFlat$',
      city: null,
      price: '$20',
      country: null,
      email: 'shaambhavi.s@gmail.com',
      firstName: 'Shaambhavi',
      formattedPriceVal: null,
      giftReceived: false,
      lastName: 'S',
      ltlDeliveryService: null,
      productURL: null,
      purchaseDate: 'September 06, 2022',
      purchaseQty: 0,
      referenceId: '52076187920220828105326247',
      registryId: 520761879,
      ropisOrder: false,
      rowId: null,
      skuDetails: null,
      skuId: 69934769,
      state: null,
      thankYouSent: false,
      transactionType: null,
      wasReturned: false,
      zipCode: null,
    };
    const wrapper = shallow(<TYMRow {...props} listItem={listItemCf} />);
    expect(toJson(wrapper)).to.not.equal(null);
  });

  it('should set state to hide', () => {
    const classToggleName = 'hide';
    const preventDefault = sinon.stub();
    const event = {
      target: {
        name: 'hideDetail',
      },
      preventDefault,
    };
    tree.instance().toggleShowHide(event);
    expect(tree.state().classToggle).to.equal(classToggleName);
  });
  it('should set state to show', () => {
    const classToggleName = 'show';
    const preventDefault = sinon.stub();
    const event = {
      target: {
        name: 'showDetail',
      },
      preventDefault,
    };
    tree.instance().toggleShowHide(event);
    expect(tree.state().classToggle).to.equal(classToggleName);
  });
  it('should set state to true for giftSent', () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .resolves(true);
    const name = 'giftSent_1';
    const checked = true;
    tree.instance().handleTymCB(checked, name);
    expect(tree.state().giftSent).to.equal(checked);
    triggerServerRequestStub.restore();
  });
  it('should set state to true for giftReceived', () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .resolves(true);
    const name = 'giftReceived_1';
    const checked = true;
    tree.instance().handleTymCB(checked, name);
    expect(tree.state().giftReceived).to.equal(checked);
    triggerServerRequestStub.restore();
  });
  it('should set state to true for giftReturned', () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .resolves(true);
    const name = 'giftReturned_1';
    const checked = true;
    tree.instance().handleTymCB(checked, name);
    expect(tree.state().giftReturned).to.equal(checked);
    triggerServerRequestStub.restore();
  });

  it('on quick view button click', () => {
    const onQuickViewButtonClick = sinon.stub();
    const listItemQV = {
      skuId: 14310568,
      referenceId: 'NY ',
      state: 'AZ',
      skuDetails: {
        displayName: 'Fashion Bed Group Cosmos Complete Full Bed in Coffee',
        skuInStock: false,
        ltlItem: false,
        skuId: '47046481',
        parentProdId: '111',
        personalizationType: 'PB',
        skuImages: { smallImage: '9291514310568p?$146$' },
      },
    };

    tree = shallow(
      <TYMRow
        {...props}
        scene7URL={scene7URL}
        onQuickViewButtonClick={onQuickViewButtonClick}
        listItem={listItem}
      />
    );
    tree.setProps({
      listItem: listItemQV,
    });
    tree.instance().renderQuickViewButton();
    tree.find(Button).simulate('click', { preventDefault: noop });
    expect(onQuickViewButtonClick.called);
  });
  it('Should call #componentWillReceiveProps on LifeCycle Method', () => {
    const changeListUpdatedStatus = sinon.stub();
    const listItem2 = {
      giftReceived: true,
      thankYouSent: false,
      wasReturned: true,
      state: 'AZ',
      skuDetails: {
        displayName: 'PRoduct name',
        skuImages: { smallImage: '9291514310568p?$146$' },
      },
    };
    const scene7URLPath = {
      url: '',
    };
    const isMobileQV = {
      isMobileScreen: true,
    };
    const labelsConfig = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      giftGiver: {
        quickViewLabel: 'quick view',
      },
    };
    tree = shallow(
      <TYMRow
        listItem={listItem2}
        isMobile={isMobileQV}
        scene7URL={scene7URLPath}
        labels={labelsConfig}
        changeListUpdatedStatus={changeListUpdatedStatus}
        listUpdated
        closeModalFlag
      />
    );
    tree.setProps({
      listItem: listItem2,
    });
    const nextprops = {
      listItem: listItem2,
      isMobile: isMobileQV,
      scene7URL: scene7URLPath,
      labels: labelsConfig,
      changeListUpdatedStatus,
      listUpdated: false,
      closeModalFlag: false,
    };
    const wrapperInstance = tree.instance();
    wrapperInstance.renderAddToCartBtn();
    wrapperInstance.renderShippingLabel();
    wrapperInstance.componentWillReceiveProps(nextprops);
    expect(changeListUpdatedStatus.called);
  });
  it('should set isModalVisible to true of modal toggleEditModalState', () => {
    const isModalVisible = true;
    tree.instance().toggleEditModalState(isModalVisible);
    expect(tree.state().isModalVisible).to.equal(isModalVisible);
  });
  it('should set isModalVisible to true of modal handleAddEditModal', () => {
    const toggleEditModalState = sinon.stub();
    tree.instance().handleAddEditModal({ preventDefault: () => {} });
    expect(toggleEditModalState.called);
  });
  it('should return value when getStateValueTym is called', () => {
    const input = 'AZ ';
    const output = input.trim();
    const modified = tree.instance().getStateValueTym(input);
    expect(modified).to.equal(output);
  });
  it('should return null when getStateValueTym is called with null', () => {
    const nullCheck = tree.instance().getStateValueTym(null);
    expect(nullCheck).to.equal(null);
  });
  it('should return value when getCheckboxLabel is called', () => {
    const output = `<span aria-hidden='true' class='markAsSent'>${labels.markAsSentLbl}</span>`;
    const returnValue = tree.instance().getCheckboxLabel();
    expect(returnValue).to.equal(output);
  });
  it('should call setUpdatedState', () => {
    const objTym = {
      thankYouSent: true,
      giftReceived: true,
      wasReturned: true,
    };
    tree.instance().setUpdatedState(objTym);
    expect(tree.state().thankYouSent).to.equal(objTym.thankYouSent);
  });

  it('should render tym list component correctly when transaction type is GG', () => {
    isMobile = true;
    const listItem1 = {
      address1: '1234 5th Avenue ',
      address2: 'Manhattan',
      city: 'New York',
      country: 'US',
      email: 'asdfads@fsadf.sadf',
      firstName: 'mohit',
      formattedPriceVal: 'INR 167',
      giftReceived: true,
      lastName: 'kumar',
      price: 2.99,
      purchaseDate: 'February 28, 2018',
      purchaseQty: 2,
      registryId: 520588833,
      skuId: 14310568,
      state: 'NY ',
      thankYouSent: false,
      wasReturned: true,
      zipCode: '10029',
      skuDetails: {
        displayName: 'PRoduct name',
        skuImages: { smallImage: '9291514310568p?$146$' },
      },
      transactionType: 'GG',
    };
    tree = shallow(
      <TYMRow
        isMobile={isMobile}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem1}
        scene7URL={scene7URL}
      />
    );
    expect(tree.find('Paragraph')).to.have.length(2);
  });
  it('should render purchase date correctly for regular puchases on TYM', () => {
    isMobile = {
      isMobileScreen: true,
    };
    tree = shallow(
      <TYMRow
        isMobile={isMobile}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    tree.setState({ classToggle: 'hide' });
    expect(tree.find('.purchaseDate')).to.have.length(0);
  });
  it('it should return Label from NandModalConfirmLabel function when siteId is BuyBuyBaby', () => {
    const wrapper = shallow(
      <TYMRow
        isMobile={false}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    const instance = wrapper.instance();
    const result = instance.renderCheckBoxLabelReceived('BuyBuyBaby');
    expect(result).to.be.equal(GIFT_RECEIVED_BABY_LBL);
  });
  it('it should return Label from NandModalConfirmLabel function when siteId is BedBathCanada', () => {
    const wrapper = shallow(
      <TYMRow
        isMobile={isMobile}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    const instance = wrapper.instance();
    const result = instance.renderCheckBoxLabelReceived('BedBathCanada');
    expect(result).to.be.equal(GIFT_RECEIVED_CA_LBL);
  });
  it('it should return Label from renderCheckBoxLabelReturn  function when siteId is BedBathCanada', () => {
    const wrapper = shallow(
      <TYMRow
        isMobile={false}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    const instance = wrapper.instance();
    const result = instance.renderCheckBoxLabelReturn('BedBathCanada');
    expect(result).to.be.equal(GIFT_RETURNED_US_LBL);
  });
  it('it should return Label from renderCheckBoxLabelReceived function when siteId is BedBathCanada', () => {
    const wrapper = shallow(
      <TYMRow
        isMobile={isMobile}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    const instance = wrapper.instance();
    const result = instance.renderCheckBoxLabelReceived('BedBathCanada');
    expect(result).to.be.equal(GIFT_RECEIVED_CA_LBL);
  });
  it('it should return Label from renderCheckBoxLabelReceived function when siteId is TBS_BedBathUS', () => {
    const wrapper = shallow(
      <TYMRow
        isMobile={isMobile}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    const instance = wrapper.instance();
    const result = instance.renderCheckBoxLabelReceived('TBS_BedBathUS');
    expect(result).to.be.equal(GIFT_RECEIVED_US_LBL);
  });
  it('it should return Label from renderCheckBoxLabelReturn  function when siteId is TBS_BedBathUS', () => {
    const wrapper = shallow(
      <TYMRow
        isMobile={false}
        uniqueKey={uniqueKey}
        labels={labels}
        listItem={listItem}
        scene7URL={scene7URL}
      />
    );
    const instance = wrapper.instance();
    const result = instance.renderCheckBoxLabelReturn('TBS_BedBathUS');
    expect(result).to.be.equal(GIFT_RETURNED_TBS_LBL);
  });
});
