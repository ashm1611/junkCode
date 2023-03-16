import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import * as commonUtil from '@bbb-app/utils/common';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CollegeInputFieldComponent } from '../CollegeInputFieldComponent';
import { REGISTRY_FORM_DATA_LOCATOR } from '../../CreateRegistry/Datalocators';

configure({ adapter: new Adapter() });
const stateObj = {
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: '',
  eventCode1: 'COL',
  babyMaidenName: '',
  babyMaidenNameError: '',
  babyNurseryTheme: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  email: '',
  emailError: '',
  gender: '',
  babyGender: '',
  babyGenderIndex: null,
  genderIndex: null,
  coFirstName: '',
  coFirstNameError: '',
  coLastName: '',
  coLastNameError: '',
  coEmail: '',
  coEmailError: '',
  coGender: '',
  coGenderIndex: null,
  eventDate: '',
  showerDate: '',
  eventDateError: '',
  babyExpectedArivalDate: '',
  babyExpectedArivalDateError: '',
  guests: '',
  guestsError: '',
  primaryPh: '',
  primaryPhError: '',
  mobilePh: '',
  mobilePhError: '',
  street: '',
  streetError: '',
  apartment: '',
  apartmentError: '',
  zip: '',
  zipError: '',
  password: '',
  passwordError: true,
  confirmPassword: '',
  confirmPasswordError: true,
  addressOne: '',
  addressOneError: '',
  addressTwo: '',
  addressTwoError: '',
  city: '',
  cityError: '',
  state: '',
  stateError: '',
  showerDateError: '',
  showMoveInInfo: false,
  showShippingInfo: false,
  shippingPhone: '',
  shippingPhoneError: '',
  shippingStreet: '',
  shippingStreetError: '',
  shippingApartment: '',
  shippingApartmentError: '',
  moveInStreet: '',
  moveInStreetError: '',
  moveInApartment: '',
  moveInApartmentError: '',
  college: '',
  collegeError: '',
  flagOptional: false,
};

describe(__filename, () => {
  const collegeList = [
    {
      college_name: 'Maharishi University of Management (Fairfield, IA)',
    },
    {
      college_name: 'XYZ (Fairfield, IA)',
    },
  ];
  const registryInputFields = {
    college: {
      autoCheck: false,
      displayOnForm: true,
      fieldName: 'college',
      id: 'DC12000001',
      inputType: 'FreeForm',
      registryOptionVO: [],
      requiredForListCreate: true,
      requiredInputCreate: true,
      requiredInputUpdate: true,
      requiredToMakeRegPublic: true,
    },
    eventDate: {
      autoCheck: false,
      displayOnForm: true,
      fieldName: 'eventDate',
      id: 'DC11800004',
      inputType: 'FreeForm',
      registryOptionVO: [],
      requiredForListCreate: true,
      requiredInputCreate: true,
      requiredInputUpdate: true,
      requiredToMakeRegPublic: true,
    },
  };
  const handleUpdateState = sinon.spy();
  const handleDropDownClick = sinon.spy();
  const updateState = sinon.spy();
  const fetchCollegeList = sinon.spy();
  const props = {
    stateObj,
    collegeList,
    dataLocator: REGISTRY_FORM_DATA_LOCATOR,
    registryInputFields,
    handleUpdateState,
    handleDropDownClick,
    updateState,
    fetchCollegeList,
    setTimoutInstance: 300,
  };
  const wrapper = shallow(<CollegeInputFieldComponent {...props} />);

  it('Should render CollegeInputFieldComponent correctly', () => {
    wrapper.setState({ showCollegeList: true });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should set CollegeList false when click outside', () => {
    wrapper.setState({ showCollegeList: true });
    const event = { preventDefault: () => {} };
    wrapper.instance().handleClickOutside(event);
    expect(wrapper.instance().state.showCollegeList).to.equal(false);
  });
  it('should call handleUpdateState', () => {
    const instance = wrapper.instance();
    instance.handleUpdateState({
      college: 'University System of Maryland',
      collegeError: '',
    });
    expect(wrapper.find('myCallback')).to.not.equal(null);
  });
  it('should call clgListApi', () => {
    const debounce = sinon.spy();
    const instance = wrapper.instance();
    instance.clgListApi();
    expect(wrapper.find(debounce)).to.not.equal(null);
  });
  it('should close dropDown when clicked outside', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    wrapper.setState({ showCollegeList: true });
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(handleDropDownClick).to.not.equal(null);
    commonUtil.isBedBathCanada.restore();
  });
});
