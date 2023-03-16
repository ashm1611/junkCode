import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as commonUtil from '@bbb-app/utils/common';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';
import EventInfo from '../EventInfo';

configure({ adapter: new Adapter() });

const labels = {
  brideOption: 'Bride',
  groomOption: 'Groom',
  createRegistry: {
    referredContent: [
      {
        id: '9882',
        key: 'coRegistrantProfileExist',
      },
      {
        id: '9883',
        key: 'coRegistrantExtendedProfile',
      },
    ],
  },
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
  college: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'college',
    id: 'DC1500014',
    requiredInputCreate: true,
    requiredInputUpdate: true,
  },
};
const stateObj = {
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
  coLastName: '',
  coLastNameError: '',
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
  isLoggedIn: false,
  registryType: 'Baby',
};
const eventType = 'Wedding';

describe(__filename, () => {
  it('EventInfo should be rendered correctly with all the props', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        isNewCreateRegForm
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('EventInfo should be rendered correctly with all the props for mobile', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        isMobile="true"
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('EventInfo should be rendered correctly with all the props for Canada Env', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
    commonUtil.isBedBathCanada.restore();
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

    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('EventInfo should be rendered correctly with event type baby registry in US env', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );

    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('EventInfo should be rendered correctly with event type baby registry in US env when enableBabyMultiples key enabled', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        registryConfig={{ enableBabyMultiples: true }}
        globalSwitchConfig={{ enableCSLabels: true }}
      />
    );
    wrapper.instance().renderbabyMultiplesSelection();
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('EventInfo should be rendered correctly ', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        registryConfig={{ enableBabyMultiples: true }}
        globalSwitchConfig={{ enableCSLabels: false }}
      />
    );
    wrapper.instance().renderbabyMultiplesSelection();
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('EventInfo should be rendered correctly with event type baby registry in CA', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );

    expect(toJson(wrapper)).to.matchSnapshot();
    commonUtil.isBedBathCanada.restore();
  });

  it('EventInfo should be rendered correctly with event type baby registry', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        isBabyRegistry
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('EventInfo should be rendered correctly with event type wedding registry', () => {
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Wedding'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('#babyGenderBoy input should be clicked', () => {
    const updateState = sinon.spy();
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#babyGenderBoy')
      .first()
      .simulate('click', { target: { value: 'target' } });
    expect(updateState.called).to.equal(true);
  });

  it('#babyGenderGirl input should be clicked', () => {
    const updateState = sinon.spy();
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#babyGenderGirl')
      .first()
      .simulate('click', { target: { value: 'target' } });
    expect(updateState.called).to.equal(true);
  });

  it('#babyGenderSurprise input should be clicked', () => {
    const updateState = sinon.spy();
    const wrapper = shallow(
      <EventInfo
        registryInputFields={registryInputFields}
        eventType={'Baby'}
        labels={labels}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        stateObj={stateObj}
        updateState={updateState}
      />
    );
    wrapper
      .find('#babyGenderSurprise')
      .first()
      .simulate('click', { target: { value: 'target' } });
    expect(updateState.called).to.equal(true);
  });
});
