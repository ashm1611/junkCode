import React from 'react';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OptionalInfo from '../OptionalInfo';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';
configure({ adapter: new Adapter() });

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
const eventType = 'Wedding';
const labels = {
  brideOption: 'Bride',
  groomOption: 'Groom',
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
  coFirstName: 'test',
  coFirstNameError: '',
  coLastName: 'test',
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
};
describe(__filename, () => {
  const updateState = sinon.stub();
  it('OptionalInfo should be rendered correctly with all the props', () => {
    const isMobile = true;
    const wrapper = shallow(
      <OptionalInfo
        registryInputFields={registryInputFields}
        eventType={eventType}
        labels={labels}
        stateObj={stateObj}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        updateState={updateState}
        isMobile={isMobile}
      />
    );
    expect(wrapper).to.not.be.blank();
  });
  describe('event type other than wedding', () => {
    const event = 'Baby';
    const CoRegistrantFirstName = {
      autoCheck: false,
      displayOnForm: true,
      fieldName: 'CoRegistrantFirstName ',
      id: 'DC1200001',
      requiredInputUpdate: true,
      requiredToMakeRegPublic: true,
    };
    const CoRegistrantLastName = {
      autoCheck: false,
      displayOnForm: true,
      fieldName: 'CoRegistrantLastName',
      id: 'DC1400015',
      requiredInputUpdate: true,
      requiredToMakeRegPublic: true,
    };
    const showerDate = {
      autoCheck: false,
      displayOnForm: true,
      fieldName: 'showerDate',
      id: 'DC1500006',
      requiredInputCreate: false,
      requiredInputUpdate: false,
      requiredToMakeRegPublic: false,
    };
    const nurseryTheme = {
      displayOnForm: true,
    };
    registryInputFields.CoRegistrantFirstName = CoRegistrantFirstName;
    registryInputFields.CoRegistrantLastName = CoRegistrantLastName;
    registryInputFields.showerDate = showerDate;
    registryInputFields.nurseryTheme = nurseryTheme;
    it('OptionalInfo should be rendered correctly with site concept other than CA', () => {
      const wrapper = shallow(
        <OptionalInfo
          registryInputFields={registryInputFields}
          eventType={event}
          labels={labels}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          stateObj={stateObj}
        />
      );
      expect(wrapper).to.not.be.blank();
    });
    it('OptionalInfo should be rendered correctly with site concept CA', () => {
      /* eslint-disable no-underscore-dangle*/
      window.__SITE_ID__ = 'BedBathCanada';
      const wrapper = shallow(
        <OptionalInfo
          registryInputFields={registryInputFields}
          eventType={event}
          labels={labels}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          stateObj={stateObj}
        />
      );
      expect(wrapper).to.not.be.blank();
    });
  });
});
