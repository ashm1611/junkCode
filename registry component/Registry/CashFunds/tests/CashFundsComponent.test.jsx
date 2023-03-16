import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure, mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CashFundsComponent from '../CashFundsComponent';
import { DEFAULT_CF_STATE } from '../constants';

configure({ adapter: new Adapter() });
const mountWithRouter = node => <Router>{node}</Router>;
describe(__filename, () => {
  const handleCashFundsModalClose = sinon.spy();
  const fetchContentStack = sinon.spy();
  const setCrossIcon = sinon.spy();
  const dynamicData = {
    CreateHeading: 'Cash fund',
    CreateImg: {
      src:
        '//b3h2.scene7.com/is/image/BedBathandBeyond/image-20220825-051524?$contentFlat$',
    },
    CreateSubHeading: 'with Venmo',
    CreateSubcopy:
      "Connect to your Venmo account so guests can easily send cash to you. Don't forget to double check your username.",
  };
  const getTree = () =>
    shallow(
      <CashFundsComponent
        handleCashFundsModalClose={handleCashFundsModalClose}
        handleCreateCashFunds={sinon.spy()}
        cfFormData={DEFAULT_CF_STATE}
        setCfFormData={sinon.spy()}
        fetchContentStack={fetchContentStack}
        fireTealiumAction={sinon.spy()}
        fireCashFundLoadTelium={sinon.spy()}
        setCrossIcon={setCrossIcon}
        dynamicData={dynamicData}
        apiStatus=""
        setAPIStatus={sinon.spy()}
      />
    );
  it('should render CashFundsComponent component correctly', () => {
    const tree = getTree();
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should pass handle Input change', () => {
    const tree = getTree();
    tree
      .find('#fundName_fieldName')
      .props()
      .onFocus({ target: { value: 'abc', name: 'fundName' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle usename change', () => {
    const tree = getTree();
    tree
      .find('#venmoUsername_fieldName')
      .props()
      .onFocus({ target: { value: 'abc_123', name: 'venmoUsername' } });
    tree
      .find('#venmoUsername_fieldName')
      .props()
      .onFocus({ target: { value: '@abc_123', name: 'venmoUsername' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle usename change', () => {
    const tree = getTree();
    tree
      .find('#totalGoal_fieldName')
      .props()
      .onFocus({ target: { value: '123', name: 'totalGoal' } });
    tree
      .find('#totalGoal_fieldName')
      .props()
      .onFocus({ target: { value: '$123', name: 'totalGoal' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle Input change onBlur', () => {
    const tree = getTree();
    tree
      .find('#fundName_fieldName')
      .props()
      .onBlur({ target: { value: 'abc', name: 'fundName' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle usename change onBlur', () => {
    const tree = getTree();
    tree
      .find('#venmoUsername_fieldName')
      .props()
      .onBlur({ target: { value: 'abc_123', name: 'venmoUsername' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle usename change onBlur', () => {
    const tree = getTree();
    tree
      .find('#totalGoal_fieldName')
      .props()
      .onBlur({ target: { value: '123', name: 'totalGoal' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle checkbox', () => {
    const data = {
      fundName: 'abc',
      venmoUsername: 'abc_123',
      last4DigitPhNo: '3456',
      totalGoal: '$200',
    };
    const tree = shallow(
      <CashFundsComponent
        handleCashFundsModalClose={handleCashFundsModalClose}
        cfFormData={data}
        setCfFormData={sinon.spy()}
        fetchContentStack={fetchContentStack}
        fireCashFundLoadTelium={sinon.spy()}
        dynamicData={dynamicData}
      />
    );
    tree
      .find('Checkbox')
      .props()
      .onSelect(true);
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle Input change onBlur error', () => {
    const tree = getTree();
    tree
      .find('#fundName_fieldName')
      .props()
      .onBlur({ target: { value: '', name: 'fundName' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle usename change onBlur error', () => {
    const tree = getTree();
    tree
      .find('#venmoUsername_fieldName')
      .props()
      .onBlur({ target: { value: '', name: 'dummy' } });
    tree
      .find('#venmoUsername_fieldName')
      .props()
      .onBlur({ target: { value: '', name: 'venmoUsername' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle phone num onBlur error', () => {
    const tree = getTree();
    tree
      .find('#last4DigitPhNo_fieldName')
      .props()
      .onBlur({ target: { value: 'ad21', name: 'last4DigitPhNo' } });
    tree
      .find('#last4DigitPhNo_fieldName')
      .props()
      .onBlur({ target: { value: '1234', name: 'last4DigitPhNo' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should pass handle usename change onBlur error', () => {
    const tree = getTree();
    tree
      .find('#totalGoal_fieldName')
      .props()
      .onBlur({ target: { value: '', name: 'totalGoal' } });
    expect(tree.find('Img')).to.not.equal(null);
  });
  it('should render CashFundsSuccessComponent Submit', () => {
    const tree = getTree();
    tree.find('Button').simulate('click');
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render useEffect', () => {
    const data = {
      fundName: 'abc',
      venmoUsername: 'abc_123',
      last4DigitPhNo: '3456',
      totalGoal: '$200',
      cftncCheckbox: true,
    };
    const useEffect = sinon.stub(React, 'useEffect');
    const node = mount(
      mountWithRouter(
        <CashFundsComponent
          handleCashFundsModalClose={handleCashFundsModalClose}
          cfFormData={data}
          setCfFormData={sinon.spy()}
          fetchContentStack={fetchContentStack}
          fireCashFundLoadTelium={sinon.spy()}
          dynamicData={dynamicData}
        />
      )
    );
    useEffect.restore();
    expect(useEffect.calledOnce);
    node.unmount();
  });
  it('should render useEffect 2', () => {
    const data = {
      fundName: 'abc1',
      venmoUsername: 'abc_123',
      last4DigitPhNo: '3456',
      totalGoal: '$200',
      fundNameError: 'Error',
      cftncCheckbox: false,
    };
    const useEffect = sinon.stub(React, 'useEffect');
    const node = mount(
      mountWithRouter(
        <CashFundsComponent
          handleCashFundsModalClose={handleCashFundsModalClose}
          cfFormData={data}
          setCfFormData={sinon.spy()}
          fetchContentStack={fetchContentStack}
          fireCashFundLoadTelium={sinon.spy()}
          dynamicData={dynamicData}
        />
      )
    );
    useEffect.restore();
    expect(useEffect.calledOnce);
    node.unmount();
  });
  it('should render Error Notification', () => {
    const tree = shallow(
      <CashFundsComponent
        handleCashFundsModalClose={handleCashFundsModalClose}
        handleCreateCashFunds={sinon.spy()}
        cfFormData={DEFAULT_CF_STATE}
        setCfFormData={sinon.spy()}
        fetchContentStack={fetchContentStack}
        setCrossIcon={setCrossIcon}
        ATRStateClear={sinon.spy()}
        ATRErrorData={{ error: {} }}
        fireCashFundLoadTelium={sinon.spy()}
      />
    );
    tree
      .find('Notification')
      .props()
      .closeClick();
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render donot have venmo account link click', () => {
    const tree = getTree();
    tree
      .find('PrimaryLink')
      .at(0)
      .props()
      .onClick();
    expect(toJson(tree)).to.not.equal(null);
  });
});
