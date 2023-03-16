import React from 'react';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import * as isUserRecognized from '@bbb-app/utils/isUserRecognized';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AccountSignInContainer from '@bbb-app/account-signin/containers/AccountSignIn.async';
import RenderCreateRegistryForm from '../RenderCreateRegistryForm';
import { REGISTRY_FORM_DATA_LOCATOR } from '../../../Datalocators';

configure({ adapter: new Adapter() });
const stateObj = {
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: '',
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
  flagOptional: false,
};
describe(__filename, () => {
  const labels = {};
  const registryInputs = {
    eventType: 'Wedding',
  };
  const wrapper = shallow(
    <RenderCreateRegistryForm
      error={null}
      stateObj={stateObj}
      registryInputs={registryInputs}
      labels={labels}
      dataLocator={REGISTRY_FORM_DATA_LOCATOR}
      isBabyRegistry
    />
  );

  const wrapper2 = shallow(
    <RenderCreateRegistryForm
      error={null}
      stateObj={stateObj}
      registryInputs={registryInputs}
      labels={labels}
      dataLocator={REGISTRY_FORM_DATA_LOCATOR}
      isBabyRegistry
    />
  );

  it('form render with event wedding', () => {
    expect(toJson(wrapper2)).to.matchSnapshot();
  });
  it('form render with event wedding Signup flow', () => {
    const setDisplayFormIndex = sinon.spy();
    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isBabyRegistry
        displayFormIndex={1}
        setDisplayFormIndex={setDisplayFormIndex}
        enableNewSignUp
      />
    );
    wrapper3.find(AccountSignInContainer).prop('changeRegistryFormTypeId')(1);
    expect(toJson(wrapper3)).to.matchSnapshot();
  });
  it('form render with event baby', () => {
    wrapper.setProps({ registryInputs: { eventType: 'Baby' } });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('form render with error message', () => {
    wrapper.setProps({
      error: [{ message: 'error:this is an error' }],
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('form render with error messag when errormessage is nulle', () => {
    wrapper.setProps({
      error: [{ message: '' }],
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render new signUpForm in wedding Registry', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        enableNewSignUp
        isLoggedIn={false}
      />
    );
    expect(wrapper3.find('AccountSignInContainer')).to.not.equal(null);
  });
  it('should render normal wedding Registry, if key disable', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isLoggedIn
        enableNewSignUp={false}
      />
    );
    expect(wrapper3.find('OtherRegistryForm')).to.not.equal(null);
  });
  it('should render new signUpForm in wedding Registry isUserrecognised true', () => {
    const recognized = sinon.stub(isUserRecognized, 'default').returns(true);

    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        enableNewSignUp
        isWeddingRegistry
        isLoggedIn
      />
    );
    expect(wrapper3.find('AccountSignInContainer')).to.not.equal(null);
    recognized.restore();
  });
  it('should render AccountSignContainer, if loginRule as addFromRegistry', () => {
    const location = {
      params: {
        loginRule: 'addToRegistry',
      },
    };
    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isLoggedIn
        enableNewSignUp
        location={location}
      />
    );
    expect(wrapper3.find(AccountSignInContainer)).to.not.equal(null);
  });
  it('should render new SignUpFlow, if isCABabyRegistry as true', () => {
    const location = {
      params: {
        loginRule: 'addToRegistry',
      },
    };
    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={{ eventType: 'Baby' }}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isLoggedIn={false}
        isCABabyRegistry
        location={location}
      />
    );
    expect(wrapper3.find(AccountSignInContainer)).to.not.equal(null);
  });

  it('should call checkFormSubmit', () => {
    const checkFormSubmit = sinon.stub();
    const wrapper3 = shallow(
      <RenderCreateRegistryForm
        error={null}
        stateObj={stateObj}
        registryInputs={{ eventType: 'Other' }}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        checkFormSubmit={checkFormSubmit}
        isWeddingRegistry
        enableNewSignUp
        isLoggedIn
      />
    );
    wrapper3
      .find('#createRegistry-submitBtn')
      .props()
      .onSubmit('e');
    wrapper3
      .find('#createRegistry-formWrapper')
      .props()
      .onSubmit('e');
    expect(wrapper3.find(checkFormSubmit).called);
  });
});
