import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import * as commonUtil from '@bbb-app/utils/common';
import * as isUserRecognized from '@bbb-app/utils/isUserRecognized';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FormInput from '@bbb-app/forms/components/FormInput';
import AccountSignInContainer from '@bbb-app/account-signin/containers/AccountSignIn.async';
import RenderCreateRegistryFormV2 from '../RenderCreateRegistryFormV2';
import { REGISTRY_FORM_DATA_LOCATOR } from '../../../Datalocators';
import CollegeInputField from '../../../../../../../containers/Pages/Registry/CollegeInputField/CollegeInputField';

configure({ adapter: new Adapter() });
const stateObj = {
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: '',
  eventCode: 'BRD',
  isV2SignUpFlow: false,
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
  eventDate: '4/22/2022',
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
  college: '',
  collegeError: '',
};
const regNewCreateFlowData = {
  BRD: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_wedding?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'Wedding background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$',
    },
    Header: 'cheers to you!',
    subCopy: 'Your wedding registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  BA1: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_baby?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'Baby background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_baby_New_1_2022_10_25?$mApp$',
    },
    Header: 'congrats!',
    subCopy: 'Your baby registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  COL: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_college?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'College background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_college_New_1_2022_10_25?$mApp$',
    },
    Header: 'woo hoo!',
    subCopy: 'Your college registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  HSW: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_housewarming?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'Wedding background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_housewarming_New_1_2022_10_25?$mApp$',
    },
    Header: 'congrats on your move!',
    subCopy: 'Your housewarming registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  ANN: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_wedding?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'Anniversary background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$',
    },
    Header: 'cheers to you!',
    subCopy: 'Your anniversary registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  COM: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_wedding?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'commitment ceremony background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$',
    },
    Header: 'cheers to you!',
    subCopy: 'Your commitment ceremony registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  OTH: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_wedding?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'Other background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$',
    },
    Header: 'cheers to you!',
    subCopy: 'Your other registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
  OT1: {
    Image: {
      src:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/background_baby?$contentFlat$&wid=1440&hei=1066',
      altTxt: 'other background image',
      mobSrc:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$',
    },
    Header: 'cheers to you!',
    subCopy: 'Your other registry starts now.',
    cta: {
      url: '#',
      title: 'create a registry',
      'aria-label': 'create a registry',
    },
  },
};
const profileData = {
  firstName: 'Test',
};
describe(__filename, () => {
  const labels = {};
  const registryInputs = {
    eventType: 'Wedding',
  };
  const registryInputs2 = {
    eventType: 'Baby',
  };
  const wrapper = shallow(
    <RenderCreateRegistryFormV2
      error={null}
      stateObj={stateObj}
      registryInputs={registryInputs}
      labels={labels}
      dataLocator={REGISTRY_FORM_DATA_LOCATOR}
      isBabyRegistry
      enableNewSignUp
      isFetching={false}
      profileData={profileData}
      isFetchingCreateRegCall={false}
      signUpFromRegistry={false}
    />
  );

  it('Render Skeleton when isFetching', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={null}
        isFetching
        isFetchingCreateRegCall={false}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        isBabyRegistry
        displayFormIndex={1}
        enableNewSignUp
      />
    );
    expect(toJson(wrapper3)).to.matchSnapshot();
  });
  it('Render Skeleton when isFetchingRegCall', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={{}}
        isFetchingCreateRegCall
        regNewCreateFlowData={regNewCreateFlowData}
        currentEventCode="BRD"
        isFromPDP
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        isBabyRegistry
        enableNewSignUp
      />
    );
    expect(toJson(wrapper3)).to.matchSnapshot();
  });
  it('form render with event Signup flow', () => {
    const setDisplayFormIndex = sinon.spy();
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={{ ...stateObj, isV2SignUpFlow: true }}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isBabyRegistry
        isFetching={false}
        signUpFromRegistry
        profileData={profileData}
        isFetchingCreateRegCall={false}
        displayFormIndex={1}
        setDisplayFormIndex={setDisplayFormIndex}
        enableNewSignUp
      />
    );
    expect(toJson(wrapper3)).to.matchSnapshot();
  });
  it('form render with error message', () => {
    wrapper.setProps({
      error: [{ message: 'error:this is an error' }],
      clearErrorState: sinon.spy(),
    });
    wrapper.find('Notification').prop('closeClick')();
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('form render with error messag when errormessage is null', () => {
    wrapper.setProps({
      error: [{ message: '' }],
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render new signUpForm in Registry', () => {
    const recognized = sinon.stub(isUserRecognized, 'default').returns(true);
    const wrapper2 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={{ ...stateObj, isV2SignUpFlow: true }}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        enableNewSignUp
        profileData={profileData}
        isFetchingCreateRegCall={false}
        isFetching={false}
        isFromPDP
        signUpFromRegistry
      />
    );
    recognized.restore();
    const AccountContainer = wrapper2.find(AccountSignInContainer);
    AccountContainer.props().changeRegistryFormTypeId(1);
    expect(AccountContainer).to.not.equal(null);
  });
  it('should render AccountSignContainer, if loginRule as addFromRegistry', () => {
    const location = {
      params: {
        loginRule: 'addToRegistry',
      },
    };
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={{ ...stateObj, isV2SignUpFlow: false }}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isFetching={false}
        isFetchingCreateRegCall={false}
        profileData={profileData}
        signUpFromRegistry
        enableNewSignUp
        displayFormIndex={1}
        location={location}
      />
    );
    expect(wrapper3.find('RegistrationFormContainer')).to.not.equal(null);
    expect(toJson(wrapper3)).to.matchSnapshot();
  });
  it('should render FormWrapper, new create registry flow for web view', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        isFetchingCreateRegCall={false}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        regNewCreateFlowData={regNewCreateFlowData}
        currentEventCode={'BRD'}
        isFetching={false}
        signUpFromRegistry={false}
        enableNewSignUp
        isMobile={false}
      />
    );
    expect(wrapper3.find('Button')).to.not.equal(null);
    expect(toJson(wrapper3)).to.matchSnapshot();
  });

  it('should render FormWrapper, new create registry flow for Mobile View', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        isFetchingCreateRegCall={false}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        regNewCreateFlowData={regNewCreateFlowData}
        currentEventCode={'BRD'}
        isFetching={false}
        signUpFromRegistry={false}
        enableNewSignUp
        isMobile
      />
    );
    expect(wrapper3.find('Button')).to.not.equal(null);
    expect(toJson(wrapper3)).to.matchSnapshot();
  });
  it('BedBathCanada should render FormWrapper, new create registry flow', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        isFetchingCreateRegCall={false}
        profileData={profileData}
        updateState={sinon.spy()}
        getRegistryInputs={sinon.spy()}
        isFetching={false}
        signUpFromRegistry={false}
        enableNewSignUp
      />
    );
    const fromInput = wrapper3.find(FormInput);
    fromInput.props().selectOption('Wedding');
    commonUtil.isBedBathCanada.restore();
    expect(wrapper3.find('Button')).to.not.equal(null);
  });

  it('should call checkFormSubmit', () => {
    const checkFormSubmit = sinon.stub();
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        isFetching={false}
        signUpFromRegistry={false}
        enableNewSignUp
        isFetchingCreateRegCall={false}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        checkFormSubmit={checkFormSubmit}
        updateState={sinon.spy()}
        getRegistryInputs={sinon.spy()}
      />
    );
    wrapper3
      .find('#newRegistry-submitBtn')
      .props()
      .onSubmit('e');
    wrapper3
      .find('#newRegistry-formWrapper')
      .props()
      .onSubmit('e');
    expect(wrapper3.find(checkFormSubmit).called);
  });
  it('BuyBuyBaby should render FormWrapper, new create registry flow', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs2}
        isFetching={false}
        signUpFromRegistry={false}
        isFetchingCreateRegCall={false}
        enableNewSignUp
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        updateState={sinon.spy()}
        getRegistryInputs={sinon.spy()}
      />
    );
    const fromInput = wrapper3.find(FormInput);
    fromInput.props().selectOption('Other');
    expect(wrapper3.find('Button')).to.not.equal(null);
  });
  it('BedBathUS should render FormWrapper, new create registry flow', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(false);
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={registryInputs}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        isFetchingCreateRegCall={false}
        updateState={sinon.spy()}
        getRegistryInputs={sinon.spy()}
        isFetching={false}
        signUpFromRegistry={false}
        enableNewSignUp
      />
    );
    const fromInput = wrapper3.find(FormInput);
    fromInput.props().selectOption('Other');
    wrapper3
      .find('button')
      .at(0)
      .simulate('click');
    commonUtil.isBedBathCanada.restore();
    expect(wrapper3.find('Button')).to.not.equal(null);
  });
  it('BedBathUS should render CollegeInputField, new create registry flow', () => {
    const wrapper3 = shallow(
      <RenderCreateRegistryFormV2
        error={null}
        stateObj={stateObj}
        registryInputs={{
          eventType: 'College/University',
          eventCode: 'COL',
          registryInputMap: { college: 'abcd' },
        }}
        isFetchingCreateRegCall={false}
        labels={labels}
        dataLocator={REGISTRY_FORM_DATA_LOCATOR}
        profileData={profileData}
        updateState={sinon.spy()}
        getRegistryInputs={sinon.spy()}
        isFetching={false}
        signUpFromRegistry={false}
        enableNewSignUp
        currentEventCode={'COL'}
        regNewCreateFlowData={regNewCreateFlowData}
      />
    );
    const fromInput = wrapper3.find(FormInput);
    fromInput.props().selectOption('College/University');
    expect(wrapper3.find(CollegeInputField)).to.not.equal(null);
  });
});
