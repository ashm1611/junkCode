/* eslint-disable max-lines */
import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as commonUtil from '@bbb-app/utils/common';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import * as validatorUtil from '@bbb-app/forms/validations/validator';

import CreateRegistryComponent from '../CreateRegistryComponent';
import * as CreateRegistryUtil from '../CreateRegistryUtils';
configure({ adapter: new Adapter() });

const labels = {};
const data = {
  eventType: 'Wedding',
  id: 'DC1500002',
  public: true,
  registryInputList: [{ fieldName: 'eventDate' }, { fieldName: 'eventType' }],
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
      requiredInputCreate: false,
      requiredInputUpdate: true,
      requiredToMakeRegPublic: true,
    },
    CoRegistrantLastName: {
      autoCheck: false,
      displayOnForm: true,
      fieldName: 'CoRegistrantLastName',
      id: 'DC1400015',
      requiredInputCreate: false,
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
      requiredInputCreate: false,
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
      requiredInputCreate: false,
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
  },
};

const newState = {
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.com',
  gender: 'bride',
  coFirstName: 'Test1',
  coLastName: 'Test1',
  coEmail: 'test1@test.com',
  coGender: 'groom',
  eventDate: '12/12/2019',
  showerDate: '12/12/2019',
  guests: 120,
  primaryPh: '(915) 988-0516',
  mobilePh: '(915) 988-0516',
  street: '123',
  zip: '11003',
  password: 'abs@1234',
  passwordError: true,
  confirmPasswordError: true,
  showMoveInInfo: true,
  showShippingInfo: true,
  isProfileStatusFlag: true,
};

const isFetching = false;
const addFormField = sinon.spy();
const onExtendProfileSubmitClick = sinon.spy();
const changeRegistryType = sinon.stub();
const fetchCoRegistrantProfileStatus = sinon.stub();
const resetCoRegistrantProfileStatus = sinon.stub();
const fetchStore = sinon.stub();
const coRegProfileStatus = { atgResponse: 'true' };
const checkProfileStatus = sinon.spy();
const resetProfileStatus = sinon.spy();
const createRegistry = sinon.stub();
const setPassWordComError = sinon.spy();
const updateSubmitStateData = sinon.spy();
const resetVerType = sinon.stub();
const location = { search: '/store' };
const history = { push: sinon.spy() };
const fetchContentStack = sinon.spy();
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
const registryConfig = {
  RegistryThirdPartySearchFlag: 'true',
  email_OptIn_Checked_Flag: 'true',
  enableEmailOptIn: 'true',
  Hide_RegistryThirdPartySearch_Flag: 'true',
};

/* eslint no-unused-expressions: 0 */

describe(__filename, () => {
  let siteIdStub;
  before(() => {
    siteIdStub = sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
  });
  after(() => {
    siteIdStub.restore();
  });
  const getWrapper = () =>
    shallow(
      <CreateRegistryComponent
        registryInputs={data}
        isFetching={isFetching}
        labels={labels}
        profileStatus={{ atgResponse: 'profile_available_for_extenstion' }}
        profileStatusUserType={'registrant'}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        coRegProfileStatus={coRegProfileStatus}
        resetProfileStatus={resetProfileStatus}
        checkProfileStatus={checkProfileStatus}
        changeRegistryType={changeRegistryType}
        location={location}
        referredContent={referredContent}
        history={history}
        registryConfig={registryConfig}
        error={null}
        fetchStore={fetchStore}
        isLoggedIn
        createRegistry={createRegistry}
        setPassWordComError={setPassWordComError}
        updateSubmitStateData={updateSubmitStateData}
        resetVerType={resetVerType}
        onExtendProfileSubmitClick={onExtendProfileSubmitClick}
        addFormField={addFormField}
        fetchContentStack={fetchContentStack}
        isNewCreateRegForm={false}
        getRegistryInputs={sinon.stub()}
        getCurrentRegistryType={sinon.stub().returns('BRD')}
      />
    );
  describe('Should Render', () => {
    it('will mount', () => {
      const wrapper = getWrapper();
      expect(wrapper.state('confirmPasswordError')).to.equal(false);
    });

    it('should render skeleton', () => {
      const wrapper = getWrapper();
      wrapper.setProps({ isFetching: true });
      expect(toJson(wrapper)).to.matchSnapshot();
    });

    it('call onSelectSubscribe function', () => {
      const wrapper = getWrapper();
      wrapper.instance().onSelectSubscribe(true);
      expect(wrapper.state('subscribeSelected')).to.equal(true);
    });
    it('call getContentStackData function', () => {
      const wrapper = getWrapper();
      wrapper.instance().getContentStackData();
      // eslint-disable-next-line no-unused-expressions
      expect(fetchContentStack).to.have.been.called;
    });
    it('call thirdPartySelected function', () => {
      const wrapper = getWrapper();
      wrapper.instance().onSelectThirdPartyOption(true);
      expect(wrapper.state('thirdPartySelected')).to.equal(true);
    });

    it('call checkFormSubmit  correctly', () => {
      const validateBabyMultiplesStub = sinon
        .stub(CreateRegistryUtil, 'validateBabyMultiples')
        .returns(false);
      const validateAllStub = sinon
        .stub(validatorUtil, 'validateAll')
        .returns(false);
      const wrapper = getWrapper();
      data.eventType = 'Baby';
      wrapper.setProps({
        isNewCreateRegForm: true,
        registryInputs: {
          registryInputList: [
            { fieldName: 'eventDate' },
            { fieldName: 'eventType' },
          ],
          eventType: 'University',
        },
        formWrapperDataRegisterOrLogin: {
          password: {
            value: 'Test1234',
          },
        },
      });
      wrapper.setState(newState);
      const event = { preventDefault: () => {}, target: 'button' };
      wrapper.instance().checkFormSubmit(data, event);
      validateBabyMultiplesStub.restore();
      validateAllStub.restore();
      expect(wrapper.state('firstName')).to.equal('Test');
    });

    it('call checkFormSubmit correctly when event type is not Baby or Wedding', () => {
      const event = { preventDefault: () => {}, target: 'button' };
      const wrapper = getWrapper();
      data.eventType = 'University';
      data.registryInputMap.MobileNumber.requiredInputCreate = true;
      wrapper.setProps({
        isNewCreateRegForm: true,
        registryInputs: {
          registryInputList: [
            { fieldName: 'eventDate' },
            { fieldName: 'eventType' },
          ],
          eventType: 'University',
        },
      });
      wrapper.setState(newState);
      wrapper.instance().checkFormSubmit(data, event);
      expect(wrapper.state('firstName')).to.equal('Test');
    });

    it('form once fetching is done with BABY registry type', () => {
      const wrapper = getWrapper();
      data.eventType = 'Baby';
      wrapper.setState({ isRegistryTypeOpen: false });
      wrapper.setProps({
        formWrapperData: { password: { value: 'test' } },
      });
      wrapper
        .find('RegistryDeviceVerification')
        .props()
        .onModalOpen();
      expect(toJson(wrapper)).to.matchSnapshot();
    });

    it('shound render RegistryBanner , if siteId value as "BuyBuyBaby"', () => {
      const wrapper = getWrapper();
      data.eventType = 'Baby';
      wrapper.setState({ isRegistryTypeOpen: false });
      expect(wrapper.find('RegistryBanner')).to.have.lengthOf(1);
    });

    it('should open the modal when selecting different style', () => {
      const wrapper = getWrapper();
      wrapper.setState({ isRegistryTypeOpen: false });
      wrapper.instance().toggleRegistryModalState(true);
      expect(wrapper.state('isRegistryTypeOpen')).to.equal(true);
    });

    it('should call the updateState function and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().updateState({ firstName: 'Test', firstNameError: '' });
      expect(wrapper.state('firstName')).to.equal('Test');
    });
    it('should call the updatePasswordData function and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().updatePasswordData('Test', 'Test');
      expect(wrapper.state('password')).to.equal('Test');
    });
    it('should call the updatePasswordData function with no params passes and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().updatePasswordData();
      expect(wrapper.state('password')).to.equal('');
    });
    it('should call the passwordErrorPresent function in case of error and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().passwordErrorPresent(true, 'password', 'test');
      expect(wrapper.state('password')).to.equal('test');
    });

    it('should call the passwordErrorPresent function in case of no error and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().passwordErrorPresent(true, '', 'test');
      expect(wrapper.state('confirmPassword')).to.equal('test');
    });

    it('should call the showShippingInfo function and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().showShippingInfo({ preventDefault: () => {} });
      expect(wrapper.state('showShippingInfo')).to.equal(true);
    });

    it('should call the hideShippingInfo function and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().hideShippingInfo({ preventDefault: () => {} });
      expect(wrapper.state('showShippingInfo')).to.equal(false);
    });

    it('should call the showMoveInfo function and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().showMoveInfo({ preventDefault: () => {} });
      expect(wrapper.state('showMoveInInfo')).to.equal(true);
    });

    it('should call the hideMoveInfo function and set state accordingly', () => {
      const wrapper = getWrapper();
      wrapper.instance().hideMoveInfo({ preventDefault: () => {} });
      expect(wrapper.state('showMoveInInfo')).to.equal(false);
    });
    it('should call the submitData function', () => {
      const wrapper = getWrapper();
      wrapper.setProps({
        formWrapperDataRegisterOrLogin: {
          password: {
            value: 'Test1234',
          },
        },
        registryInputs: {
          eventType: 'Baby',
        },
        enableRegistryQuiz: true,
        globalSwitchConfig: { enableCSLabels: true },
      });
      wrapper.instance().submitData();
      /* eslint no-unused-expressions: 0 */
      expect(createRegistry).to.have.been.called;
    });
    it('should call the submitData function without password', () => {
      const wrapper = getWrapper();
      wrapper.instance().submitData();
      expect(createRegistry).to.have.been.called;
    });

    it('should call the submitData function when error in password', () => {
      const wrapper = getWrapper();
      wrapper.setProps({
        formWrapperDataRegisterOrLogin: {
          password: {
            value: 'Test1234',
            passwordError: 'error',
          },
        },
        labels: undefined,
      });
      wrapper.instance().submitData();
      expect(createRegistry.called).to.be.equal(true);
    });

    it('should call componentDidMount correctly', () => {
      sinon.spy(CreateRegistryComponent.prototype, 'componentDidMount');
      const wrapper = getWrapper();
      wrapper.setProps({ registryConfig: { enableOptionalPanel: true } });
      expect(CreateRegistryComponent.prototype.componentDidMount.calledOnce).to
        .be.true;
      wrapper.instance().componentDidMount();
    });

    it('check if network Affiliation', () => {
      const wrapper = getWrapper();
      wrapper.setProps({
        registryConfig: {
          RegistryThirdPartySearchFlag: 'true',
          email_OptIn_Checked_Flag: 'true',
        },
      });
      expect(wrapper.state('thirdPartySelected')).to.equal(true);
    });
    it('check if registry config is not available', () => {
      const wrapper = getWrapper();
      wrapper.setProps({ registryConfig: {} });
      expect(wrapper.state('thirdPartySelected')).to.equal(true);
    });

    it('dateFormatByRegion: should return eventDate', () => {
      const isBedBathCanadaStub = sinon
        .stub(commonUtil, 'isBedBathCanada')
        .returns(false);
      const wrapper = getWrapper();
      const result = wrapper.instance().dateFormatByRegion();
      isBedBathCanadaStub.restore();
      expect(result).to.be.equal('eventDate');
    });
    it('should return dateFormatByRegion and zipRuleByRegion correctly for Canada site ', () => {
      const isBedBathCanadaStub = sinon
        .stub(commonUtil, 'isBedBathCanada')
        .returns(true);
      const wrapper = getWrapper();
      const result = wrapper.instance().dateFormatByRegion();
      expect(result).to.be.equal('eventDateCanada');
      const result2 = wrapper.instance().zipRuleByRegion();
      isBedBathCanadaStub.restore();
      expect(result2).to.be.equal('postalCodeCA');
    });

    it('zipRuleByRegion: should return zip', () => {
      const isBedBathCanadaStub = sinon
        .stub(commonUtil, 'isBedBathCanada')
        .returns(false);
      const wrapper = getWrapper();
      const result = wrapper.instance().zipRuleByRegion();
      isBedBathCanadaStub.restore();
      expect(result).to.be.equal('zip');
    });

    it('stateRuleByRegion: should return qcState', () => {
      const isBedBathCanadaStub = sinon
        .stub(commonUtil, 'isBedBathCanada')
        .returns(true);
      const wrapper = getWrapper();
      wrapper.setProps({
        globalSwitchConfig: { canadaShipRestrictionEnabled: true },
      });
      const result = wrapper.instance().stateRuleByRegion();
      isBedBathCanadaStub.restore();
      expect(result).to.be.equal('qcState');
    });

    it('toggleProfileExtendModalState: should set state isProfileExtendModalOpen', () => {
      const wrapper = getWrapper();
      wrapper.instance().toggleProfileExtendModalState(true);
      expect(wrapper.instance().state.isProfileExtendModalOpen).to.be.equal(
        true
      );
    });
  });
  it('should change registry type when registry type is changed and close the modal', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ getCurrentRegistryType: commonUtil.noop });
    wrapper.instance().onModalSelectionChange('BRD');
    expect(wrapper.state('isRegistryTypeOpen')).to.equal(false);
  });

  it('form with event type Wedding', () => {
    const wrapper = getWrapper();
    data.eventType = 'Wedding';
    wrapper.setProps({ registryInputs: data });
    wrapper
      .find('RegistryDeviceVerification')
      .props()
      .onModalOpen();
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('listenProfileStatusChange:should call resetProfileStatus', () => {
    const wrapper = getWrapper();
    wrapper.instance().listenProfileStatusChange();
    expect(resetProfileStatus.called).to.be.equal(true);
  });

  it('mapUpdatedPropsToState should return correct state object', () => {
    const statePropMap = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      mobileNumber: 'mobilePh',
      phoneNumber: 'primaryPh',
      gender: 'gender',
      'shippingAddress.address1': 'street',
      'shippingAddress.address2': 'apartment',
      'shippingAddress.postalCode': 'zip',
    };
    const obj1 = {
      firstName: 'Test',
      lastName: 'TestB',
      email: 'test@test',
      mobileNumber: '219789928',
      phoneNumber: '2323232323',
      gender: 'male',
      shippingAddress: {
        address1: 'some address',
        address2: 'some address 2',
        postalCode: '2979237',
      },
    };
    const obj2 = {
      firstName: 'Test',
      lastName: 'TestB',
      email: 'test@test',
      mobileNumber: '219789928',
      phoneNumber: '2323232323',
    };
    const expectedResult1 = {
      firstName: 'Test',
      lastName: 'TestB',
      email: 'test@test',
      mobilePh: '219789928',
      primaryPh: '2323232323',
      gender: 'male',
      street: 'some address',
      apartment: 'some address 2',
      zip: '2979237',
    };
    const expectedResult2 = {
      gender: 'male',
      street: 'some address',
      apartment: 'some address 2',
      zip: '2979237',
    };

    const wrapper = getWrapper();
    expect(
      wrapper.instance().mapUpdatedPropsToState({}, obj1)(statePropMap)
    ).to.deep.equal(expectedResult1);
    expect(
      wrapper.instance().mapUpdatedPropsToState(obj2, obj1)(statePropMap)
    ).to.deep.equal(expectedResult2);
  });

  it('should open the Profile Extend modal', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_available_for_extenstion' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
      error: [{ code: 'ECB05178' }],
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(true);
  });

  it('should call componentDidUpdate for state change', () => {
    const wrapper = getWrapper();
    wrapper.setState({ isRedirectToOldForm: true });
    expect(wrapper.find('getRegistryInputs')).to.not.equal(null);
  });

  it('should set the isProfileExist state to true', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_already_exist' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isProfileExist')).to.equal(true);
  });
  it('should check the unverified user flow', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'Profile_not_verified' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(false);
  });

  it('should close ProfileExtendModal', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_already_exist' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(false);
  });

  it('should close ProfileExtendModal after it is open', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_available_for_extenstion' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(true);
    wrapper.instance().closeProfileExtendModal();
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(false);
  });
  it('should close ProfileExtendModal after it is open', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_available_for_extenstion' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(true);
    wrapper.instance().closeProfileExtendModal();
    expect(wrapper.state('isProfileExtendModalOpen')).to.equal(false);
  });
  it('should set isOtherCountryProfile to true for profile_already_exist_on_ca', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_already_exist_on_ca' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isOtherCountryProfile')).to.equal(true);
  });
  it('should set isOtherCountryProfile to true for profile_already_exist_on_us', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'profile_already_exist_on_us' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('isOtherCountryProfile')).to.equal(true);
  });
  it('should set profileHardLocked to true for Profile_hard_locked', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: 'Profile_hard_locked' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('profileHardLocked')).to.equal(true);
  });
  it('should set emailInfo to blank', () => {
    const mockNextProps = {
      profileStatus: { atgResponse: '' },
      profileStatusUserType: 'registrant',
      referredContent,
      isLoggedIn: false,
    };
    const wrapper = getWrapper();
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('emailInfo')).to.equal('');
  });
  it('should not call submitData is isOtherCountryProfile state is true', () => {
    const wrapper = getWrapper();
    const spy = (wrapper.instance().submitData = sinon.spy());
    wrapper.setState({ isOtherCountryProfile: true });
    wrapper.instance().checkFormSubmit(
      {
        eventCode: 'BRD',
        eventType: 'Wedding',
        id: 'DC1500002',
        public: true,
        registryInputList: [],
        registryInputMap: {},
      },
      {}
    );
    /* eslint no-unused-expressions: 0 */
    expect(spy).to.not.have.been.called;
  });
  it('should set thirdPartySelected', () => {
    const Props = {
      registryConfig: {
        RegistryThirdPartySearchFlag: false,
        email_OptIn_Checked_Flag: false,
      },
    };
    const mockNextProps = {
      registryConfig: {
        RegistryThirdPartySearchFlag: true,
        email_OptIn_Checked_Flag: true,
      },
      isLoggedIn: true,
    };
    const wrapper = getWrapper();
    wrapper.setState({
      checkBoxSet: true,
      email: 'abc@xyz.com',
      firstName: 'abc',
      isV2SignUpFlow: true,
      isV2FormSubmit: true,
    });
    wrapper.setProps({ Props });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('thirdPartySelected')).to.equal(false);
    expect(wrapper.state('isV2FormSubmit')).to.equal(false);
  });
  it('should set isRegistryRBYRSelected to true', () => {
    const wrapper = getWrapper();
    wrapper.instance().onSelectRBYROption(true);
    expect(wrapper.state('isRegistryRBYRSelected')).to.equal(true);
  });
  it('should call getPassWordError', () => {
    const wrapper = getWrapper();
    wrapper.setState({
      confirmPasswordError: false,
      passwordError: false,
      isRecognized: false,
    });
    wrapper.setProps({ isLoggedIn: false });
    expect(wrapper.instance().getPassWordError()).to.equal(false);
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.instance().getPassWordError()).to.equal(false);
  });
  it('should call setHardLockState', () => {
    const wrapper = getWrapper();
    wrapper.instance().setHardLockState();
    expect(wrapper.state('profileHardLocked')).to.equal(false);
    wrapper.instance().setHardLockState(true);
    expect(wrapper.state('profileHardLocked')).to.equal(true);
  });
  it('should set profileHardLocked to true', () => {
    const props = {
      error: [{ message: '' }],
    };
    const mockNextProps = {
      error: [{ message: 'abc', code: 'ECB05178' }],
    };
    const wrapper = getWrapper();
    wrapper.setProps({ props });
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('profileHardLocked')).to.equal(true);
  });
  it('should call handleInvalidCaptcha', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ isMobile: false });
    wrapper.setState({ isRecaptchaEnabled: true, isRecaptchaValidated: false });
    wrapper.instance().handleInvalidCaptcha('createRegistry');
    expect(wrapper.state('recaptchaError')).to.equal(
      'Please verify that you are not a robot'
    );
  });

  it('should call handleInvalidCaptcha on mob', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ isMobile: true });
    wrapper.setState({ isRecaptchaEnabled: true, isRecaptchaValidated: false });
    wrapper.instance().handleInvalidCaptcha('createRegistry');
    expect(wrapper.state('recaptchaError')).to.equal(
      'Please verify that you are not a robot'
    );
  });

  it('should call updateSubmitStateData', () => {
    const props = {
      registryInputs: {
        registryInputMap: {
          CoRegistrantFirstName: 'abc',
          numberOfGuests: '100',
          college: 'anbmbn',
          showContactAddress: { requiredInputCreate: true },
        },
        registryInputList: [
          { fieldName: 'eventDate' },
          { fieldName: 'eventType' },
        ],
        eventType: 'click',
        eventCode: '201',
      },
      registryConfig: {
        enableBabyMultiples: false,
      },
      isMobile: false,
    };
    const event = {
      target: 'createRegistry',
      preventDefault: () => {},
    };
    const wrapper = getWrapper();
    wrapper.setState({
      isOtherCountryProfile: true,
      isRecaptchaEnabled: true,
      isRecaptchaValidated: false,
      babyMaidenName: 'baby',
      college: 'college',
    });
    wrapper.instance().checkFormSubmit(props.registryInputs, event);
    expect(updateSubmitStateData.called).to.be.equal(true);
  });

  it('should call onExtendProfileSubmitClick', () => {
    const email = 'abc@yopmail.com';
    const password = 'Password1';
    const optForEmails = true;
    const triggerFromExtendedAccount = true;
    const deviceAutoLogin = false;
    const wrapper = getWrapper();
    wrapper
      .instance()
      .handleProfileExtendClick(
        email,
        password,
        optForEmails,
        triggerFromExtendedAccount,
        deviceAutoLogin
      );
    expect(onExtendProfileSubmitClick.called).to.be.equal(true);
  });

  it('should call addFormField', () => {
    const identifier = 'createRegistry';
    const name = 'Baby';
    const rule = 'this is test';
    const value = 'test';
    const required = true;
    const isChangedOnce = true;
    const errorMsg = '';
    const wrapper = getWrapper();
    wrapper
      .instance()
      .updateFormField(
        identifier,
        name,
        rule,
        value,
        required,
        isChangedOnce,
        errorMsg
      );
    expect(addFormField.called).to.be.equal(true);
  });

  it('updateFormField:when addFormField is not present', () => {
    const identifier = 'createRegistry';
    const name = 'Baby';
    const rule = 'this is test';
    const value = 'test';
    const required = true;
    const isChangedOnce = true;
    const errorMsg = '';
    const wrapper = getWrapper();
    wrapper.setProps({ addFormField: undefined });
    wrapper
      .instance()
      .updateFormField(
        identifier,
        name,
        rule,
        value,
        required,
        isChangedOnce,
        errorMsg
      );
    expect(addFormField.called).to.be.equal(true);
  });

  it('should call clearConfirmPasswordField', () => {
    const props = {
      profileData: {
        email: '',
      },
    };
    const nextProps = {
      profileData: {
        email: 'abc@yopmail.com',
      },
    };
    const wrapper = getWrapper();
    wrapper.setProps(props);
    wrapper.instance().clearConfirmPasswordField(nextProps);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call handleKeepSignedIn', () => {
    const wrapper = getWrapper();
    wrapper.instance().handleKeepSignedIn(true);
    expect(wrapper.state('deviceAutoLogin')).to.equal(true);
  });

  it('should render for isEmailVerRequired', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ isEmailVerRequired: true });
    wrapper.setState({ email: 'abc@yopmail.com' });
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render for non-loggedIn user', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const wrapper = shallow(
      <CreateRegistryComponent
        registryInputs={data}
        isFetching={isFetching}
        labels={labels}
        profileStatus={{ atgResponse: 'profile_available_for_extenstion' }}
        profileStatusUserType={'registrant'}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        coRegProfileStatus={coRegProfileStatus}
        resetProfileStatus={resetProfileStatus}
        checkProfileStatus={checkProfileStatus}
        changeRegistryType={changeRegistryType}
        location={location}
        referredContent={referredContent}
        history={history}
        registryConfig={registryConfig}
        error={null}
        fetchStore={fetchStore}
        isLoggedIn={false}
        createRegistry={createRegistry}
        setPassWordComError={setPassWordComError}
        updateSubmitStateData={updateSubmitStateData}
        resetVerType={resetVerType}
        onExtendProfileSubmitClick={onExtendProfileSubmitClick}
        addFormField={addFormField}
        isNewCreateRegForm={'true'}
        getCurrentRegistryType={sinon.stub().returns('BRD')}
      />
    );
    wrapper.setState({ isProfileStatusFlag: true });
    wrapper.setProps({
      registryInputs: { registryInputMap: {} },
      profileStatusUserType: 'co-registrant',
    });
    commonUtil.getSiteId.restore();
    expect(wrapper.find('RenderCreateRegistryFormV2')).to.have.lengthOf(1);
  });
});
