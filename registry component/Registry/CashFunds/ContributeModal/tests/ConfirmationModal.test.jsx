import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ConfirmationModal from '../ConfirmationModal';
import { DEFAULT_GG_STATE } from '../../constants';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const handleCashFundsModal = sinon.spy();
  const dynamicData = {
    ggConfirmHeading: 'please confirm your contribution',
    ggConfirmationImg: {
      src: '//b3h2.scene7.com/is/image/BedBathandBeyond/gift?$contentFlat$',
    },
    ggConfirmationSubcopy:
      'This helps the registrant keep track of gifts and send their thanks!',
  };
  const getTree = () =>
    shallow(
      <ConfirmationModal
        handleCashFundsModal={handleCashFundsModal}
        ggFormData={DEFAULT_GG_STATE}
        setGGFormData={sinon.spy()}
        cfSubmitAPIStatus={{}}
        dynamicData={dynamicData}
      />
    );
  it('should render correctly', () => {
    const tree = getTree();
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should pass handle Input change for goal amount', () => {
    const tree = getTree();
    tree
      .find('#totalGoal')
      .props()
      .onFocus({ target: { value: '123', name: 'totalGoal' } });
    tree
      .find('#totalGoal')
      .props()
      .onFocus({ target: { value: '$123', name: 'totalGoal' } });
    expect(tree.find('ThankYouScreenComponent')).to.not.equal(null);
  });
  it('should pass handle Input change for FirstName', () => {
    const tree = getTree();
    tree
      .find('#firstName')
      .props()
      .onFocus({ target: { value: 'Abcd', name: 'firstName' } });
    expect(tree.find('ThankYouScreenComponent')).to.not.equal(null);
  });
  it('should pass handle InputChange onBlur', () => {
    const tree = getTree();
    tree
      .find('#firstName')
      .props()
      .onBlur({ target: { value: 'abc', name: 'firstName' } });
    tree
      .find('#email')
      .props()
      .onBlur({ target: { value: 'abc@ag.com', name: 'email' } });
    tree
      .find('#totalGoal')
      .props()
      .onBlur({ target: { value: '123', name: 'totalGoal' } });
    tree
      .find('#totalGoal')
      .props()
      .onBlur({ target: { value: '123', name: 'dummy' } });
    expect(tree.find('ThankYouScreenComponent')).to.not.equal(null);
  });
  it('should pass handle Input change onBlur error', () => {
    const data = {
      firstName: 'Abc1',
      lastName: 'def',
      email: '',
      totalGoal: '',
      firstNameError: 'Error',
      isValidationError: true,
    };
    const tree = shallow(
      <ConfirmationModal
        handleCashFundsModal={handleCashFundsModal}
        ggFormData={data}
        setGGFormData={sinon.spy()}
        cfSubmitAPIStatus={{ submitSuccessFlag: false }}
        dynamicData={dynamicData}
      />
    );
    tree
      .find('#firstName')
      .props()
      .onBlur({ target: { value: '', name: 'firstName' } });
    tree
      .find('#email')
      .props()
      .onBlur({ target: { value: '', name: 'email' } });
    tree
      .find('#totalGoal')
      .props()
      .onBlur({ target: { value: '', name: 'totalGoal' } });
    expect(tree.find('ThankYouScreenComponent')).to.not.equal(null);
  });
  it('should pass handle Input change onBlur error 2', () => {
    const data = {
      firstName: 'Abc1',
      lastName: 'def',
      email: '',
      totalGoal: '',
      firstNameError: 'Error',
      isValidationError: true,
    };
    const tree = shallow(
      <ConfirmationModal
        handleCashFundsModal={handleCashFundsModal}
        ggFormData={data}
        setGGFormData={sinon.spy()}
        cfSubmitAPIStatus={{}}
        dynamicData={dynamicData}
      />
    );
    tree
      .find('#firstName')
      .props()
      .onBlur({ target: { value: 'test1', name: 'firstName' } });
    tree
      .find('#email')
      .props()
      .onBlur({ target: { value: 'rtt6', name: 'email' } });
    tree
      .find('#totalGoal')
      .props()
      .onBlur({ target: { value: '1', name: 'totalGoal' } });
    expect(tree.find('ThankYouScreenComponent')).to.not.equal(null);
  });
  it('should render Error Notification', () => {
    const data = {
      firstName: 'Abc1',
      lastName: 'def',
      email: '',
      totalGoal: '',
      firstNameError: 'Error',
      isValidationError: true,
    };
    const tree = shallow(
      <ConfirmationModal
        handleCashFundsModal={handleCashFundsModal}
        ggFormData={data}
        setGGFormData={sinon.spy()}
        clearContributeCashFund={sinon.spy()}
        cfSubmitAPIStatus={{ submitErrorFlag: true }}
        dynamicData={dynamicData}
      />
    );
    tree
      .find('Notification')
      .props()
      .closeClick();
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render API Success', () => {
    const data = {
      firstName: 'Abc1',
      lastName: 'def',
      email: 'abc@def.com',
      totalGoal: '$1000',
      firstNameError: '',
      isValidationError: false,
    };
    const tree = shallow(
      <ConfirmationModal
        handleCashFundsModal={handleCashFundsModal}
        ggFormData={data}
        setGGFormData={sinon.spy()}
        clearContributeCashFund={sinon.spy()}
        cfSubmitAPIStatus={{ submitSuccessFlag: true }}
        handleTealiumEvent={sinon.spy()}
        dynamicData={dynamicData}
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render Form Submit', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ submitBtnState: true });
    const checkFormSubmit = sinon.stub();
    const data = {
      firstName: 'Abc1',
      lastName: 'def',
      email: 'abc@def.com',
      totalGoal: '$1000',
      firstNameError: '',
      isValidationError: false,
    };
    const tree = shallow(
      <ConfirmationModal
        handleCashFundsModal={handleCashFundsModal}
        ggFormData={data}
        setGGFormData={sinon.spy()}
        clearContributeCashFund={sinon.spy()}
        contributeCashFund={sinon.spy()}
        cfSubmitAPIStatus={{ submitSuccessFlag: false }}
        checkFormSubmit={sinon.stub()}
        dynamicData={dynamicData}
      />
    );
    tree
      .find('#contribute-formWrapper')
      .props()
      .onSubmit('e');
    expect(tree.find(checkFormSubmit).called);
    useStateStub.restore();
  });
});
