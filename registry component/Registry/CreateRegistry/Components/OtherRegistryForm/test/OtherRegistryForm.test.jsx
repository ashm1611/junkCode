import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import OtherRegistryForm from '../OtherRegistryForm';

/**
 * default state of the application
 */
const defaultState = {
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  email: '',
  emailError: '',
  gender: '',
  coFirstName: '',
  coFirstNameError: '',
  coLastName: '',
  coLastNameError: '',
  coEmail: '',
  coEmailError: '',
  coGender: '',
  eventDate: '',
  eventDateError: '',
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
};
const registryInputs = {
  registryInputMap: {
    eventType: 'Wedding',
    id: 'DC1500002',
    public: true,
    registryInputMap: {
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
        requiredInputCreate: false,
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
        autoCheck: true,
        displayOnForm: false,
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
        displayOnForm: false,
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
        requiredInputCreate: false,
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
    },
  },
};

const status = 'Profile not found';
const checkProfileStatus = sinon.spy();
const resetProfileStatus = sinon.spy();
const referredContent = {
  content: {
    9278: {
      body: 'hello',
    },
    9279: {
      body: 'hello',
    },
    9280: {
      body: 'hello',
    },
  },
};

describe(__filename, () => {
  const updateState = sinon.stub();
  const handleGenderChange = sinon.stub();
  const handleCoGenderChange = sinon.stub();
  const passwordErrorPresent = sinon.stub();
  const updatePasswordData = sinon.stub();
  const wrapper = shallow(
    <OtherRegistryForm
      labels={{}}
      stateObj={defaultState}
      registryInputs={registryInputs}
      updateState={updateState}
      handleGenderChange={handleGenderChange}
      handleCoGenderChange={handleCoGenderChange}
      passwordErrorPresent={passwordErrorPresent}
      updatePasswordData={updatePasswordData}
      checkProfileStatus={checkProfileStatus}
      profileStatus={status}
      resetProfileStatus={resetProfileStatus}
      referredContent={referredContent.content}
    />
  );
  const data = registryInputs;
  wrapper.setProps({
    registryInputs: data,
    profileStatus: { atgResponse: 'Profile not found' },
  });

  it('ComponentWillRecieveProps with networkAffiliation', () => {
    registryInputs.registryInputMap.networkAffiliation = { autoCheck: true };
    wrapper.setProps({ registryInputs });
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('ComponentWillRecieveProps with null data', () => {
    wrapper.setProps({ registryInputs: null });
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('OtherRegistryForm should be rendered correctly with all the props', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('OtherRegistryForm should be return null if  registryInputs is not defined', () => {
    const tree = shallow(
      <OtherRegistryForm
        labels={{}}
        stateObj={defaultState}
        updateState={updateState}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        passwordErrorPresent={passwordErrorPresent}
        updatePasswordData={updatePasswordData}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render favoriteStore', () => {
    registryInputs.registryInputMap.favoriteStore = { displayOnForm: true };
    const tree = shallow(
      <OtherRegistryForm
        labels={{}}
        registryInputs={registryInputs}
        stateObj={defaultState}
        updateState={updateState}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        passwordErrorPresent={passwordErrorPresent}
        updatePasswordData={updatePasswordData}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render favoriteStore', () => {
    registryInputs.registryInputMap.favoriteStore = { displayOnForm: true };
    const tree = shallow(
      <OtherRegistryForm
        labels={{}}
        registryInputs={registryInputs}
        stateObj={defaultState}
        updateState={updateState}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        passwordErrorPresent={passwordErrorPresent}
        updatePasswordData={updatePasswordData}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render optional data', () => {
    const flagOptional = true;
    const tree = shallow(
      <OtherRegistryForm
        labels={{}}
        registryInputs={registryInputs}
        stateObj={defaultState}
        updateState={updateState}
        handleGenderChange={handleGenderChange}
        handleCoGenderChange={handleCoGenderChange}
        passwordErrorPresent={passwordErrorPresent}
        updatePasswordData={updatePasswordData}
        flagOptional={flagOptional}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
