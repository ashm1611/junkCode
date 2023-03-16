/* eslint-disable max-lines */
import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as shouldReCaptchaRender from '@bbb-app/utils/reCaptcha';
import * as commonUtil from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import PersonalInfo from '../PersonalInfo';
import EventInfo from '../EventInfo';
import ContactInfo from '../ContactInfo';
import FavouriteStoreInfo from '../FavouriteStoreInfo';
import NetworkInfo from '../NetworkInfo';
import MoveInInfo from '../MoveInInfo';
import ShippingInfo from '../ShippingInfo';
import CoRegistrantEmail from '../CoRegistrantEmail';
import RegistryBanner from '../../RegistryBanner/RegistryBanner';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';

configure({ adapter: new Adapter() });

const isMobileDevice = commonUtil.isMobileDevice;

const labels = {
  brideOption: 'Bride',
  groomOption: 'Groom',
};

const registryInputFields = {
  CoRegistrantEmail: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'CoRegistrantEmail',
    id: 'DC1400016',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  CoRegistrantFirstName: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'CoRegistrantFirstName ',
    id: 'DC1200001',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  CoRegistrantLastName: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'CoRegistrantLastName',
    id: 'DC1400015',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  MobileNumber: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'MobileNumber',
    id: 'DC1500001',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  PhoneNumber: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'PhoneNumber',
    id: 'DC1300001',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: false,
  },
  confirmPassword: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'confirmPassword',
    id: 'DC1500013',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: false,
  },
  eventDate: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'eventDate',
    id: 'Wedding_eventDate',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  favoriteStore: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'favoriteStore',
    id: 'DC1500012',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  futureShippingDate: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'futureShippingDate',
    id: 'DC1500011',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  networkAffiliation: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'networkAffiliation',
    id: 'DC1300006',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  numberOfGuests: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'numberOfGuests',
    id: 'DC1500005',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  showContactAddress: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'showContactAddress',
    id: 'DC1500007',
    requiredInputCreate: false,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  showFutureShippingAddr: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'showFutureShippingAddr',
    id: 'DC1500009',
    requiredInputCreate: true,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  showShippingAddress: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'showShippingAddress',
    id: 'DC1500008',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  showerDate: {
    autoCheck: false,
    displayOnForm: false,
    fieldName: 'showerDate',
    id: 'DC1500006',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  useContactAddrAsShippingAddr: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'useContactAddrAsShippingAddr',
    id: 'DC1500010',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
};
const stateObj = {
  showVerMsg: true,
  isProfileExist: true,
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: 'abc',
  babyMaidenName: '',
  babyMaidenNameError: '',
  babyNurseryTheme: '',
  firstNameError: '',
  lastName: 'abc',
  lastNameError: '',
  email: 'abc@gmail.com',
  emailError: '',
  gender: '',
  babyGender: '',
  babyGenderIndex: null,
  genderIndex: null,
  coFirstName: '',
  coFirstNameError: '',
  coLastName: 'abc',
  coLastNameError: 'abc',
  coEmail: '',
  coEmailError: '',
  coGender: '',
  coGenderIndex: null,
  eventDate: '',
  eventDateError: '',
  babyExpectedArivalDate: '',
  babyExpectedArivalDateError: '',
  guests: '',
  guestsError: '',
  primaryPh: '12345',
  primaryPhError: '',
  mobilePh: '12345',
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
  addressOne: 'xyz',
  addressOneError: '',
  addressTwo: 'xyz',
  addressTwoError: '',
  city: 'delhi',
  cityError: '',
  state: 'xyz',
  stateError: '',
  showerDate: '',
  showerDateError: '',
  showMoveInInfo: true,
  showShippingInfo: true,
  shippingPhone: '9999999999',
  shippingPhoneError: '',
  shippingStreet: '',
  shippingStreetError: '',
  shippingApartment: '',
  shippingApartmentError: '',
  moveInStreet: '',
  moveInStreetError: '',
  moveInApartment: '',
  moveInApartmentError: '',
  isLoggedIn: true,
  isRecognized: true,
};

const eventType = 'Wedding';
const registryConfig = {
  RegistryThirdPartySearchFlag: 'true',
  email_OptIn_Checked_Flag: 'true',
  enableEmailOptIn: 'true',
  Hide_RegistryThirdPartySearch_Flag: 'true',
};

const coRegProfileStatus = { atgResponse: 'true' };
const referredContent = {
  content: {
    9882: {
      body: 'Hello',
    },
    9279: {
      body: 'hi',
    },
    9280: {
      body: 'hi',
    },
  },
};
const storeInfo = {
  hours: '2',
  storeId: '1194',
  storeType: 10,
  commonName: 'TriBeca',
  address: '270 Greenwich St btw Warren store Murray St',
  city: 'New York',
  state: 'NY',
  postalCode: '10007',
  phone: '(212) 233-8450',
  storeTimings:
    'Monday-Tuesday:8:00am-9:00pm,Wednesday:8:00am-10:00pm, Thursday:Closed, Friday:6:00am-10:00pm, Saturday:8:00am-10:00pm, Sunday:8:00am-9:00pm',
  otherTimings1: null,
  otherTimings2: null,
  specialMsg: null,
  longitude: '-74.0113388',
  latitude: '40.7154146',
  latlongSrc: '4',
  hiringInd: '0',
  facadeStoreType: '10',
  contacFlag: null,
  specialityCodes: { HD: 'Home Delivery' },
  acceptingAppointments: null,
  appointmentTypes: null,
  siteBopus: [
    { siteId: 'BedBathCanada', bopusFlag: 1 },
    { siteId: 'BedBathUS', bopusFlag: 1 },
    { siteId: 'BuyBuyBaby', bopusFlag: 1 },
    { siteId: 'TBS_BedBathCanada', bopusFlag: 1 },
    { siteId: 'TBS_BedBathUS', bopusFlag: 1 },
    { siteId: 'TBS_BuyBuyBaby', bopusFlag: 1 },
  ],
  distance: null,
  distanceUnit: null,
};
/* eslint no-unused-expressions: 0 */

describe(__filename, () => {
  const handleGenderChange = sinon.stub();
  const handleCoGenderChange = sinon.stub();
  const checkProfileStatus = sinon.stub();
  const updateState = sinon.spy();
  const resetCoRegistrantProfileStatus = sinon.spy();
  const updatePasswordData = sinon.stub();
  const fetchCoRegistrantProfileStatus = sinon.spy();
  const personalisedLables = {};
  const passwordErrorPresent = sinon.stub;
  it('PersonInfo should be rendered correctly with all the props', () => {
    const shouldReCaptchaRenderstub = sinon
      .stub(shouldReCaptchaRender, 'shouldReCaptchaRender')
      .returns(true);
    const recaptchaActivationCount = 3;
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        passwordErrorPresent={passwordErrorPresent}
        updatePasswordData={updatePasswordData}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
        coRegOwner
        editRegistrySubHeading
        isModalOpen={false}
        reCaptchaActivationCount={recaptchaActivationCount}
        shouldReCaptchaRender={shouldReCaptchaRender}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
    shouldReCaptchaRenderstub.restore();
  });
  it('PersonInfo should be rendered correctly with event type Baby', () => {
    const event = 'Baby';
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
        coRegOwner
        isBabyRegistry
      />
    );
    wrapper.setProps({
      stateObj: {
        email: undefined,
      },
    });
    expect(wrapper).to.not.equal(null);
  });
  it('#brideOption input should be clicked', () => {
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#brideOption')
      .first()
      .simulate('click', { target: { value: 'target', name: 'genderOption' } });
    expect(updateState.called).to.equal(true);
  });

  it('#groomOption input should be clicked', () => {
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#groomOption')
      .first()
      .simulate('click', { target: { value: 'target' } });
    expect(updateState.called).to.equal(true);
  });

  it('should apply className of fieldsFullWidth, if isEditOtherRegistry prop is true', () => {
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
        isEditOtherRegistry
        editWedRegistry
      />
    );
    expect(wrapper.find('Heading').props().className).contains(
      'fieldsFullWidth'
    );
  });

  it('#coBrideOption input should be clicked', () => {
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#coBrideOption')
      .first()
      .simulate('click', { target: { value: 'target' } });
    expect(updateState.called).to.equal(true);
  });

  it('#coGroomOption input should be clicked', () => {
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#coGroomOption')
      .first()
      .simulate('click', { target: { value: 'target' } });
    expect(updateState.called).to.equal(true);
  });

  it('PersonInfo should be rendered correctly with event type University', () => {
    const event = 'University';
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('should call onRecaptchaValidation correctly when isValid equals to true', () => {
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
      />
    );
    wrapper.instance().onRecaptchaValidation({ isValid: true });
    expect(wrapper.instance().onRecaptchaValidation.called);
  });
  it('should call onRecaptchaValidation correctly when isValid equals to false', () => {
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
      />
    );
    wrapper.instance().onRecaptchaValidation({ isValid: false });
    expect(wrapper.instance().onRecaptchaValidation.called);
  });
  it('should call onResetRecaptcha correctly when isValid equals to false', () => {
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
      />
    );
    const e = {
      target: {
        value: '',
        name: 'genderOption',
      },
    };
    wrapper.instance().checkRegistrantProfileStatus(e);
    wrapper.instance().onResetRecaptcha();
    expect(wrapper.instance().onResetRecaptcha.called);
  });
  it('should render captcha correctly', () => {
    const props = {
      reCaptchaActivationCount: '8',
      globalSwitchConfig: {
        enableRecaptcha: true,
      },
      enableCaptcha: true,
    };
    const listenProfileStatusChange = sinon.spy();
    const wrapper = shallow(
      <PersonalInfo
        checkProfileStatus={checkProfileStatus}
        updateState={updateState}
        personalisedLables={personalisedLables}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={referredContent}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
        props={props}
        listenProfileStatusChange={listenProfileStatusChange}
      />
    );
    wrapper.setProps({
      stateObj: {
        isRecognized: false,
        isLoggedIn: false,
        isProfileExist: true,
      },
    });
    const e = {
      target: {
        value: '',
        name: 'genderOption',
      },
    };
    wrapper.instance().checkRegistrantProfileStatus(e);
    wrapper.instance().renderRecaptcha();
    expect(wrapper.instance().renderRecaptcha.called);
  });

  it('EventInfo should be rendered correctly with all the props', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('EventInfo should be rendered correctly with showerDate field true', () => {
    registryInputFields.showerDate.displayOnForm = true;
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );

    expect(wrapper).to.not.equal(null);
  });
  it('EventInfo should be rendered correctly with event type baby', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );

    expect(wrapper).to.not.equal(null);
  });
  it('ContactInfo should be rendered correctly with all the props', () => {
    const wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputFields}
        eventType={'College/University'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );
    wrapper.setProps({
      stateObj: {
        showMoveInInfo: true,
        showShippingInfo: true,
      },
    });
    expect(wrapper).to.not.equal(null);
  });
  it('#showShippingInfo input should be clicked', () => {
    const showShippingInfo = sinon.spy();
    registryInputFields.showShippingAddress.displayOnForm = true;
    stateObj.showShippingInfo = false;
    const wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        showShippingInfo={showShippingInfo}
      />
    );
    wrapper
      .find({ 'data-locator': 'registry-adddeifferentaddresslink' })
      .first()
      .simulate('click');
    expect(showShippingInfo.called).to.equal(true);
  });

  it('#showMoveInfo input should be clicked', () => {
    const showMoveInfo = sinon.spy();
    registryInputFields.showFutureShippingAddr.displayOnForm = true;
    stateObj.showMoveInInfo = false;
    const wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        showMoveInfo={showMoveInfo}
      />
    );
    wrapper
      .find({ 'data-locator': 'registry-movingsoonlink' })
      .first()
      .simulate('click');
    expect(showMoveInfo.called).to.equal(true);
  });
  it('#hideShippingInfo input should be clicked', () => {
    const hideShippingInfo = sinon.spy();
    registryInputFields.showShippingAddress.displayOnForm = true;
    stateObj.showShippingInfo = true;
    const wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        hideShippingInfo={hideShippingInfo}
      />
    );
    wrapper.setProps({
      stateObj: {
        showShippingInfo: true,
      },
    });
    wrapper
      .find('.hideShippingButton')
      .first()
      .simulate('click');
    expect(hideShippingInfo.called).to.equal(true);
  });
  it('#hideMoveInfo input should be clicked', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('TBS_BedBathUS');
    const hideMoveInfo = sinon.spy();
    registryInputFields.showFutureShippingAddr.displayOnForm = true;
    stateObj.showMoveInInfo = true;
    const wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        hideMoveInfo={hideMoveInfo}
      />
    );
    wrapper
      .find('.hideMovingButton')
      .first()
      .simulate('click');
    expect(hideMoveInfo.called).to.equal(true);
    commonUtil.getSiteId.restore();
  });

  it('ContactInfo should be rendered correctly without all the props', () => {
    const wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );
    wrapper.setProps({
      stateObj: {
        showMoveInInfo: false,
        showShippingInfo: false,
      },
    });
    expect(wrapper).to.not.equal(null);
  });
  it('ShippingInfo should be rendered correctly with all the props', () => {
    const wrapper = shallow(
      <ShippingInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('MoveInInfo should be rendered correctly with all the props', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const wrapper = shallow(
      <MoveInInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    expect(wrapper).to.not.equal(null);
    commonUtil.isBedBathCanada.restore();
  });
  it('MoveInInfo should be rendered correctly with all the props and isBedBathCanada return else', () => {
    const wrapper = shallow(
      <MoveInInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('NetworkInfo should be rendered correctly with all the props', () => {
    const onSelectSubscribe = sinon.stub();
    const onSelectThirdPartyOption = sinon.stub();
    const thirdPartySelected = false;
    const subscribeSelected = false;
    const wrapper = shallow(
      <NetworkInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={{ abc: 'abc' }}
        onSelectSubscribe={onSelectSubscribe}
        onSelectThirdPartyOption={onSelectThirdPartyOption}
        thirdPartySelected={thirdPartySelected}
        subscribeSelected={subscribeSelected}
        stateObj={stateObj}
        registryConfig={registryConfig}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('RegistryBanner should be rendered correctly with all the props', () => {
    const toggleRegistryModalState = sinon.stub();
    const wrapper = shallow(
      <RegistryBanner
        eventType={eventType}
        labels={labels}
        toggleRegistryModalState={toggleRegistryModalState}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('PersonInfo should be rendered correctly with event type other than wedding', () => {
    const event = 'Housewarming';
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={event}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('PersonInfo should be rendered correctly with event type Baby', () => {
    const event = 'Baby';
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={event}
        updateState={updateState}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('PersonInfo should be rendered correctly with event type wedding and flagOptional', () => {
    const wrapper = shallow(
      <PersonalInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        updateState={updateState}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        stateObj={stateObj}
        flagOptional
      />
    );
    expect(
      wrapper.find('[data-locator="registery-editregistery-email"]')
    ).to.not.equal(null);
  });
  describe('CoRegistrantEmail', () => {
    const referredContentObj = {
      referredContent: {
        content: {
          9278: { body: 'demo content' },
          9279: { body: 'demo content' },
          9280: { body: 'demo content' },
        },
      },
    };
    const coRegProfileStatusObj = { atgResponse: 'true' };
    const wrapper = shallow(
      <CoRegistrantEmail
        labels={labels}
        registryInputFields={registryInputFields}
        updateState={updateState}
        stateObj={stateObj}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        referredContent={null}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
      />
    );
    it('should open the co-registrant modal when coRegProfileStatus and referredContent are there', () => {
      const mockNextProps = {
        referredContent: referredContentObj,
        coRegProfileStatus: coRegProfileStatusObj,
      };
      wrapper.setState({ coRegProfileStatusFlag: false });
      wrapper.instance().componentWillReceiveProps(mockNextProps);
      expect(wrapper.state('coRegProfileStatusFlag')).to.equal(true);
    });
    it('should open the co-registrant modal when atgResponse in coRegProfileStatus is false', () => {
      const mockNextProps = {
        referredContent: referredContentObj,
        coRegProfileStatus: { atgResponse: 'false' },
      };
      wrapper.setState({ coRegProfileStatusFlag: false });
      wrapper.instance().componentWillReceiveProps(mockNextProps);
      expect(wrapper.state('coRegProfileStatusFlag')).to.equal(true);
    });
    it('should call close coRegistrantModal', () => {
      const mockedEvent = { preventDefault: () => {} };
      wrapper.instance().closeCoregistrantModal(mockedEvent);
      expect(wrapper.state('isCoregistrantModalOpen')).to.equal(false);
    });
    it('should not open coRegistrantModal if coRegProfileStatus or referred content is null', () => {
      const mockNextProps = {
        referredContent: null,
        coRegProfileStatus: coRegProfileStatusObj,
      };
      wrapper.instance().componentWillReceiveProps(mockNextProps);
      expect(wrapper.state('isCoregistrantModalOpen')).to.equal(false);
    });
    it('should fetch profile status of co-registrant email when checkCoRegistrantProfileStatus  is called', () => {
      const e = { target: { value: 'email@email.com' } };
      const returnValue = { coEmail: 'email@email.com' };
      const value = 'email@email.com';
      wrapper.instance().checkCoRegistrantProfileStatus(e, returnValue);
      expect(fetchCoRegistrantProfileStatus.withArgs(value)).to.have.been
        .called;
      const returnValueWithError = {
        coEmail: 'email@email.com',
        coEmailError: 'tets',
      };
      wrapper
        .instance()
        .checkCoRegistrantProfileStatus(e, returnValueWithError);
      expect(fetchCoRegistrantProfileStatus.withArgs(value)).to.have.been
        .called;
    });
    it('should reset co-registrant email field when email is from non sister site', () => {
      const e = {
        target: { value: 'email@email.com' },
        preventDefault: () => {},
      };
      const instance = wrapper.instance();
      const resetCoRegistrantEmailId = sinon.spy(
        instance,
        'resetCoRegistrantEmailId'
      );
      wrapper.setProps({ coRegProfileStatus: { atgResponse: 'nonSister' } });
      wrapper.instance().handleOkButtonClick(e);
      expect(resetCoRegistrantEmailId).to.have.been.called;
      resetCoRegistrantEmailId.restore();
    });
    it('should reset co-registrant email field when email is from sister site', () => {
      const e = {
        target: { value: 'email@email.com' },
        preventDefault: () => {},
      };
      const instance = wrapper.instance();
      const resetCoRegistrantEmailId = sinon.spy(
        instance,
        'resetCoRegistrantEmailId'
      );
      wrapper.setProps({ coRegProfileStatus: { atgResponse: 'true' } });
      wrapper.instance().handleOkButtonClick(e);
      expect(wrapper.state('coRegProfileStatusFlag')).to.be.equal(null);
      resetCoRegistrantEmailId.restore();
    });
    it('should call enableEventDate with atDateFlag as true ', () => {
      wrapper.setProps({ atDateFlag: true });
      expect(wrapper.instance().enableEventDate()).to.be.returned;

      wrapper.setProps({ atDateFlag: false, isMobile: true });
      wrapper.instance().enableEventDate();
      expect(wrapper.instance().enableEventDate()).to.be.returned;
    });
    it('should call enableEventDate with atDateFlag as false ', () => {
      wrapper.setProps({ atDateFlag: true });
      expect(wrapper.instance().enableEventDate()).to.be.returned;

      const eventDateElement = document.createElement('input');
      const showerDateElement = document.createElement('input');
      const mountedElement = document.createElement('div');
      eventDateElement.setAttribute('id', 'eventDate');
      showerDateElement.setAttribute('id', 'showerDate');
      mountedElement.appendChild(eventDateElement);
      mountedElement.appendChild(showerDateElement);
      document.body.appendChild(mountedElement);
      wrapper.setProps({ atDateFlag: false, isMobile: true });
      wrapper.instance().enableEventDate();
      expect(eventDateElement.removeAttribute('disabled')).to.be.equal(
        undefined
      );
      expect(showerDateElement.removeAttribute('disabled')).to.be.equal(
        undefined
      );
    });
    it('should call elementFocus', () => {
      const elmnt = {
        focus: sinon.spy(),
      };
      wrapper.instance().elementFocus(elmnt);
      expect(elmnt.focus).to.be.called;
    });
  });

  describe('Favorite Store Functionality', () => {
    it('FavouriteStoreInfo should be rendered correctly with all the props', () => {
      const wrapper = shallow(
        <FavouriteStoreInfo
          registryInputFields={registryInputFields}
          eventType={eventType}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          labels={labels}
          stateObj={stateObj}
          storeId={'6'}
          storeInfo={storeInfo}
          isMobile
        />
      );
      expect(wrapper).to.not.equal(null);
    });
    it('FavouriteStoreInfo should be rendered correctly with all the props else', () => {
      sinon.stub(isMobileDevice, 'iOS').returns(true);
      const wrapper = shallow(
        <FavouriteStoreInfo
          registryInputFields={registryInputFields}
          eventType={eventType}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          labels={labels}
          stateObj={stateObj}
          storeId={'6'}
          storeInfo={storeInfo}
          isMobile={false}
        />
      );
      wrapper.setProps({
        storeInfo: {
          hours: undefined,
        },
      });
      expect(wrapper).to.not.equal(null);
      isMobileDevice.iOS.restore();
    });
    it('FavouriteStoreInfo should be rendered form without storeId', () => {
      const wrapper = shallow(
        <FavouriteStoreInfo
          registryInputFields={registryInputFields}
          eventType={eventType}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          labels={labels}
          stateObj={stateObj}
        />
      );
      expect(wrapper).to.not.equal(null);
    });
    it('on click call handleClick', () => {
      sinon.stub(isMobileDevice, 'Android').returns(true);
      const handleClick = sinon.stub();
      const onChangeStore = sinon.spy();
      const tree = shallow(
        <FavouriteStoreInfo
          handleClick={handleClick}
          registryInputFields={registryInputFields}
          eventType={eventType}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          labels={labels}
          stateObj={stateObj}
          storeId={'6'}
          storeInfo={storeInfo}
          onChangeStore={onChangeStore}
        />
      );
      tree
        .find(Button)
        .first()
        .simulate('click', { preventDefault: () => {} });
      expect(handleClick.called);
      isMobileDevice.Android.restore();
    });
  });
});
/* eslint-enable max-lines */
