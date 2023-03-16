import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import StatusBar from '../StatusBar';

it('should render StatusBar', () => {
  const tree = shallow(<StatusBar />);
  expect(toJson(tree)).to.matchSnapshot();
});

it('should render OverviewCashFund', () => {
  const registryData = {
    registryResVO: {
      registrySummaryVO: {
        giftPurchased: {},
        giftRemaining: {},
      },
      registryVO: {
        event: {},
        coRegistrant: {},
        primaryRegistrant: {
          contactAddress: {},
        },
        shipping: {
          shippingAddress: {},
          futureshippingAddress: {},
        },
      },
    },
  };
  const activeRegistry = {
    cashFundTotal: 0,
  };
  const useStateStub = sinon
    .stub(React, 'useState')
    .returns({ modalOpen: true });
  const tree = shallow(
    <StatusBar registryData={registryData} activeRegistry={activeRegistry} />
  );
  tree.find('#cash-funds').prop('onClick')();
  useStateStub.restore();
});

it('should render OverviewCashFund when guestCount is empty', () => {
  const registryData = {
    registryResVO: {
      registrySummaryVO: {
        giftPurchased: {},
        giftRemaining: {},
        eventVO: {
          guestCount: '',
        },
      },
      registryVO: {
        event: {},
        coRegistrant: {},
        primaryRegistrant: {
          contactAddress: {},
        },
        shipping: {
          shippingAddress: {},
          futureshippingAddress: {},
        },
      },
    },
  };
  const activeRegistry = {
    cashFundTotal: 0,
  };
  const useStateStub = sinon
    .stub(React, 'useState')
    .returns({ modalOpen: true });
  const tree = shallow(
    <StatusBar registryData={registryData} activeRegistry={activeRegistry} />
  );
  tree.find('#cash-funds').prop('onClick')();
  useStateStub.restore();
});
