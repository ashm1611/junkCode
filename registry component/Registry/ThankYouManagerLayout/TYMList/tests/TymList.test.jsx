import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import TymList from '../TymList';
import TYMFilters from '../../TYMFilters';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [
      {
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
      },
      {},
      {},
    ];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const tree = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        isQuickViewOpen
      />
    );
    expect(tree.find('HideOnTbs').length).to.equal(1);
  });
  it('should render correctly for Mobile', () => {
    const isMobile = {
      isMobileScreen: true,
    };
    const tymListItems = [{}, {}, {}];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const props = {
      location: {
        search: '?skuAdded=67742813',
      },
    };
    const tree = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        {...props}
      />
    );
    tree.instance().handleTYMPrintClick();
    tree.instance().componentDidUpdate();
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call handleTYLDownloadClick on download link click', () => {
    const fireTealiumAction = sinon.stub();
    const initiateInactivityModal = sinon.stub();
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [{}, {}, {}];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const tree = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
        initiateInactivityModal={initiateInactivityModal}
      />
    ).instance();
    tree.handleTYLDownloadClick();

    expect(fireTealiumAction.called);
  });
  it('should render TYMFilters', () => {
    const fireTealiumAction = sinon.stub();
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [{}, {}, {}];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const wrapper = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
      />
    );

    expect(wrapper.find(TYMFilters).length).to.equal(1);
  });
  it('should render Gift Tracker Filters', () => {
    const fireTealiumAction = sinon.stub();
    const isMobile = {
      isMobileScreen: true,
    };
    const tymListItems = [{}, {}, {}];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const wrapper = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
        isNewDashboard
      />
    );
    wrapper.find('#gt_viewAll').simulate('click');
    wrapper.find('#gt_received').simulate('click');
    expect(wrapper.find(TYMFilters).length).to.equal(1);
  });
  it('should render Gift Tracker Filters 2', () => {
    const fireTealiumAction = sinon.stub();
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [{}, {}, {}];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const wrapper = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
        isNewDashboard
      />
    );
    wrapper.find('#gt_thankYou').simulate('click');
    wrapper.find('#gt_returned').simulate('click');
    expect(wrapper.find(TYMFilters).length).to.equal(1);
  });

  it('should seState tymList with handleCallback for CashFund Items when data is matched with item', () => {
    const fireTealiumAction = sinon.stub();
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [
      {
        referenceId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
        skuId: 69934769,
      },
    ];
    const data = {
      referenceId: 'ABC',
      giftReceived: true,
      thankYouSent: true,
      wasReturned: true,
    };
    const expectedData = [
      {
        referenceId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
        skuId: 69934769,
      },
    ];
    const updatedList = [
      {
        referenceId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
        skuId: 69934769,
      },
    ];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const wrapper = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
        location={{ search: '?skuAdded=67742813' }}
        isNewDashboard
      />
    );
    wrapper.setProps({ tymListItems: updatedList });
    wrapper.instance().handleCallback(data);
    expect(wrapper.state('tymList')).to.deep.equal(expectedData);
  });
  it('should seState tymList with handleCallback for CashFund Items when data does not match with item', () => {
    const fireTealiumAction = sinon.stub();
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [
      {
        referenceId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
        skuId: 69934769,
      },
    ];
    const data = {
      referenceId: 'DEF',
      giftReceived: true,
      thankYouSent: true,
      wasReturned: true,
    };
    const expectedData = [
      {
        referenceId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
        skuId: 69934769,
      },
    ];
    const updatedList = [
      {
        referenceId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
        skuId: 69934769,
      },
    ];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const wrapper = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
        location={{ search: '?skuAdded=67742813' }}
        isNewDashboard
      />
    );
    wrapper.setProps({ tymListItems: updatedList });
    wrapper.instance().handleCallback(data);
    expect(wrapper.state('tymList')).to.deep.equal(expectedData);
  });
  it('should seState tymList with handleCallback for non-Cashfund items', () => {
    const fireTealiumAction = sinon.stub();
    const isMobile = {
      isMobileScreen: false,
    };
    const tymListItems = [
      {
        rowId: 'ABC',
        giftReceived: false,
        thankYouSent: false,
        wasReturned: false,
      },
      {
        rowId: 'DEF',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: false,
      },
    ];
    const data = {
      rowID: 'ABC',
      giftReceived: true,
      thankYouSent: true,
      wasReturned: true,
    };
    const expectedData = [
      {
        rowId: 'DEF',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: false,
      },
      {
        rowId: 'ABC',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: true,
      },
    ];
    const updatedList = [
      {
        rowId: 'DEF',
        giftReceived: true,
        thankYouSent: true,
        wasReturned: false,
      },
      {
        rowId: 'ABC',
        giftReceived: false,
        thankYouSent: false,
        wasReturned: false,
      },
    ];
    const labels = {
      giftReceivedLbl: 'Gift received',
      giftReturnedLbl: 'Gift returned',
      markAsSentLbl: 'MARK AS SENT',
      printTylLbl: 'Print',
    };
    const scene7URL = {
      url: '"https://s7d2.scene7.com/is/image/BedBathandBeyond/',
    };
    const wrapper = shallow(
      <TymList
        isMobile={isMobile}
        labels={labels}
        tymListItems={tymListItems}
        scene7URL={scene7URL}
        fireTealiumAction={fireTealiumAction}
        location={{ search: '?skuAdded=67742813' }}
        isNewDashboard
      />
    );
    wrapper.setProps({ tymListItems: updatedList });
    wrapper.instance().handleCallback(data);
    expect(wrapper.state('tymList')).to.deep.equal(expectedData);
  });
});
