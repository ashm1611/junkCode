import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Notification from '@bbb-app/core-ui/notification/Notification';
import * as stateUtil from '@bbb-app/context/states-context/getStateList';
import DatePicker from '@bbb-app/date-picker/components/DatePicker';
import * as commonUtil from '@bbb-app/utils/common';
import FormInput from '@bbb-app/forms/containers/FormInput/FormInput';

import WeddingBookForm from '../WeddingBookForm';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  const formWrapperData = {
    firstName: { value: 'abc', firstNameError: '' },
    lastName: { value: 'bcc', lastNameError: '' },
    streetAddress: { value: 'abc', streetAddressError: '' },
    apartment: { value: 'abc', apartmentError: '' },
    city: { value: 'abc', cityError: '' },
    zipcode: { value: '11111', zipcodeError: '' },
    phoneNumber: { value: '1111111111', phoneNumberError: '' },
    emailAddr: { value: 'abc@d.com', emailAddrError: '' },
  };
  const labels = {
    firstName: 'firstName',
    lastName: 'lastName',
  };
  const submitWeddingBook = sinon.spy();
  const resetFormDataFields = sinon.spy();
  const error = {};
  const result = false;
  const stateList = ['a'];
  let props = {
    formWrapperData,
    labels,
    stateList,
    submitWeddingBook,
    resetFormDataFields,
    error,
    result,
  };
  const getTree = prop => shallow(<WeddingBookForm {...prop} />);
  before(() => {
    tree = getTree(props);
  });

  after(() => {
    tree = null;
  });

  it('should render the "WeddingBookForm" component', () => {
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should setState in componentWillReceiveProps', () => {
    const nextProps = {
      result: true,
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const renderThankyou = tree.instance().state.renderThankyou;
    expect(renderThankyou).to.equal(true);
  });

  it('should setState emailOfferChecked', () => {
    tree.instance().emailOffer();
    expect(tree.instance().state.emailOfferChecked).to.equal(true);
  });

  it('should setState selectedState', () => {
    tree.instance().handleStateChange('AR');
    expect(tree.instance().state.selectedState).to.equal('AR');
  });

  it('should setState eventDate', () => {
    tree.instance().handleChange('08/01/1992');
    expect(tree.instance().state.eventDate).to.equal('08/01/1992');
  });

  it('should setState eventDate with value as  blank', () => {
    tree.instance().handleChange('');
    expect(tree.instance().state.eventDate).to.equal('');
    expect(tree.instance().state.dateErrorState).to.equal(true);
  });

  it('should setState mountedState', () => {
    tree.instance().onClose();
    expect(tree.instance().state.renderThankyou).to.equal(false);
  });

  it('form render with error message', () => {
    tree.setProps({
      error: {
        response: {
          data: { errorMessages: [{ message: 'error:something went wrong' }] },
        },
      },
    });
    expect(tree.find(Notification)).to.have.lengthOf(1);
    expect(tree.find(Notification).prop('content')).to.equal(
      'something went wrong'
    );
  });
  it('should render DatePicker label as empty string for mobile touch device, date format as per CA for CA site', () => {
    props = {
      ...props,
      isMobile: true,
    };
    sinon.stub(commonUtil, 'isTouchDevice').returns(true);
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    tree = getTree(props);
    commonUtil.isTouchDevice.restore();
    commonUtil.isBedBathCanada.restore();
    expect(tree.find(DatePicker).prop('label')).to.equal('');
    expect(tree.find(DatePicker).prop('format')).to.equal('dd/mm/yyyy');
  });
  it('should render FormInput with empty string optionSet if statelist is empty', () => {
    sinon.stub(stateUtil, 'getStateList').returns(null);
    tree = getTree(props);
    expect(tree.find(FormInput).prop('optionSet')).to.equal('');
  });
  it('form render with error message with empty message', () => {
    tree.setProps({
      error: { response: { data: { errorMessages: [{ message: '' }] } } },
    });
    expect(tree.find(Notification).prop('content')).to.equal('');
  });

  it('should call submitWeddingookForm function with event date as blank', () => {
    tree.instance().submitWeddingookForm({});
    const eventDate = tree.instance().state.eventDate;
    expect(eventDate).to.equal('');
  });

  it('should call submitWeddingookForm function', () => {
    tree.setState({ eventDate: '08/08/1992' });
    tree.instance().submitWeddingookForm({});
    const eventDate = tree.instance().state.eventDate;
    expect(eventDate).to.equal('08/08/1992');
  });
});
