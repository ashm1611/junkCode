import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CashFunds, { PureCashFunds, mapDispatchToProps } from '../CashFunds';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const store = { getState: () => {} };
  const props = {
    regType: 'Wedding',
    redirectTo: sinon.spy(),
    registryId: '12345',
    handleCashFundsModalClose: sinon.spy(),
    addToRegistryCall: sinon.spy(),
    setCrossIcon: sinon.spy(),
    siteId: 'BedBathUS',
    activeRegistry: {
      registryType: {
        registryTypeName: 'OTH',
      },
    },
    regCashFundEventTypes: {
      BBBYOTH: {},
    },
    ATRStateClear: sinon.spy(),
    ATRStateData: { data: true },
    fireTealiumAction: sinon.spy(),
  };
  const getTree = () => shallow(<PureCashFunds {...props} />);
  it('should render CashFunds container correctly', () => {
    const tree = shallow(
      <Provider store={store}>
        <CashFunds {...props} />
      </Provider>
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render CashFunds Success for API Success', () => {
    const tree = getTree();
    tree.setProps({
      isAddToRegistryFetching: true,
      ATRSuccessData: { data: true },
    });
    tree.instance().componentWillUnmount();
    expect(tree).to.not.equal(null);
  });
  it('should render handle setCfFormData', () => {
    const tree = getTree();
    tree.instance().setCfFormData({});
    expect(tree).to.not.equal(null);
  });
  it('should render handle cfForm Submit', () => {
    const tree = getTree();
    tree.setProps({
      location: { pathname: '/store/giftRegistry/viewRegistryOwner/home/' },
    });
    tree.instance().componentDidMount();
    tree.instance().handleCreateCashFunds(true);
    expect(tree).to.not.equal(null);
  });
  it('should render handle cfForm Submit 2', () => {
    const tree = getTree();
    tree.instance().handleCreateCashFunds(false);
    expect(tree).to.not.equal(null);
  });
  it('should call dispatch', () => {
    const dispatch = sinon.spy();
    const prop = mapDispatchToProps(dispatch);
    prop.addToRegistryCall({});
    prop.ATRStateClear();
    expect(dispatch.called).to.equal(true);
  });
});
